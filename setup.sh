#!/bin/bash

# Crear carpeta public si no existe
mkdir -p public

# Crear index.html básico si no existe
if [ ! -f public/index.html ]; then
cat <<EOF > public/index.html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Bot AFK Minecraft Bedrock</title>
</head>
<body>
  <h1>Bot listo para conectarse</h1>
</body>
</html>
EOF
  echo "[✔] index.html creado"
else
  echo "[✓] index.html ya existe, no se sobrescribió"
fi

# Crear package.json básico si no existe
if [ ! -f package.json ]; then
cat <<EOF > package.json
{
  "name": "minecraft-bedrock-bot-web",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "bedrock-protocol": "^1.6.0"
  }
}
EOF
  echo "[✔] package.json creado"
else
  echo "[✓] package.json ya existe, no se sobrescribió"
fi

echo "✅ Proyecto organizado. Puedes correr: npm install && npm start"
