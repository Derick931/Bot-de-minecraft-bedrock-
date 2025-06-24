@echo off
echo === Organizando proyecto Minecraft Bedrock Bot ===

REM Crear carpeta public si no existe
if not exist public (
  mkdir public
  echo [✔] Carpeta "public" creada.
) else (
  echo [✓] Carpeta "public" ya existe.
)

REM Crear index.html básico si no existe
if not exist public\index.html (
  echo ^<html^>^<head^>^<title^>Bot^</title^>^</head^>^<body^>^<h1^>Bot listo para conectarse^</h1^>^</body^>^</html^> > public\index.html
  echo [✔] Archivo index.html creado.
) else (
  echo [✓] Archivo index.html ya existe.
)

REM Crear package.json básico si no existe
if not exist package.json (
  echo {> package.json
  echo   "name": "minecraft-bedrock-bot-web",>> package.json
  echo   "version": "1.0.0",>> package.json
  echo   "main": "server.js",>> package.json
  echo   "scripts": {>> package.json
  echo     "start": "node server.js">> package.json
  echo   },>> package.json
  echo   "dependencies": {>> package.json
  echo     "express": "^4.18.2",>> package.json
  echo     "bedrock-protocol": "^1.6.0">> package.json
  echo   }>> package.json
  echo }>> package.json
  echo [✔] package.json creado.
) else (
  echo [✓] package.json ya existe.
)

echo.
echo ✅ Proyecto listo. Ejecuta: npm install && npm start
pause
