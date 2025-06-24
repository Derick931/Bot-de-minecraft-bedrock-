const express = require('express');
const app = express();
const port = 3000;

let botActivo = false;
let info = 'Bot inactivo.';

app.use(express.static('public'));

app.get('/estado', (req, res) => {
  res.json({ activo: botActivo, info });
});

app.post('/activar', (req, res) => {
  if (!botActivo) {
    botActivo = true;
    info = 'Bot activado y funcionando correctamente.';
    // Aquí podrías requerir y lanzar tu bot real, por ejemplo:
    // require('./bot-caminar.js');
  }
  res.json({ activo: botActivo, info });
});

app.listen(port, () => {
  console.log(`Dashboard iniciado en http://localhost:${port}`);
});
