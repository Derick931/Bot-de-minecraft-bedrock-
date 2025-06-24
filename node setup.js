const fs = require('fs');
const { exec } = require('child_process');

function createFolderIfNotExists(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log(`[✔] Carpeta '${folder}' creada`);
  } else {
    console.log(`[✓] Carpeta '${folder}' ya existe`);
  }
}

function createFileIfNotExists(path, content) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, content);
    console.log(`[✔] Archivo '${path}' creado`);
  } else {
    console.log(`[✓] Archivo '${path}' ya existe`);
  }
}

function installDependencies() {
  console.log('Ejecutando npm install...');
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar npm install: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error en instalación: ${stderr}`);
      return;
    }
    console.log(stdout);
    console.log('Dependencias instaladas correctamente.');
  });
}

// Crear carpeta public y archivo index.html
createFolderIfNotExists('public');
createFileIfNotExists('public/index.html', `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Bot AFK Minecraft Bedrock</title>
</head>
<body>
  <h1>Bot listo para conectarse</h1>
</body>
</html>`);

// Ejecutar npm install
installDependencies();
