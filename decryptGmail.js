const crypto = require('crypto');
const readline = require('readline');

const encryptedGmail = '9OJ2zSEcD0Vg+QfWNy1q1CtXgq7DChHKxUjF6cs9HhPZjI6Ng7vH4PqA1hT9PBcm';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Introduce la clave para desencriptar el Gmail: ', (clave) => {
  try {
    const ENCRYPTION_KEY = crypto.createHash('sha256').update(clave).digest();
    const IV_LENGTH = 16;

    function decrypt(text) {
      const parts = Buffer.from(text, 'base64');
      const iv = parts.slice(0, IV_LENGTH);
      const encryptedText = parts.slice(IV_LENGTH);
      const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
      let decrypted = decipher.update(encryptedText, undefined, 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }

    const gmail = decrypt(encryptedGmail);
    console.log('Gmail desencriptado:', gmail);

  } catch (error) {
    console.error('Error al desencriptar. Clave incorrecta o datos corruptos.');
  } finally {
    rl.close();
  }
});
