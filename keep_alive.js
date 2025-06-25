const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot activo');
});

app.listen(3000, () => {
  console.log('🟢 Keep-alive web activo en el puerto 3000');
});
