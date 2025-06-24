const express = require('express');
const { startBot } = require('./bot');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/start-bot', (req, res) => {
  const { botName, ip, port } = req.body;
  startBot(botName, ip, port);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
