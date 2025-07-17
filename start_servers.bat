@echo off
echo Starting Django backend server...
start cmd /k "cd /d D:\parking-project && python manage.py runserver"

echo Waiting for Django server to start...
timeout /t 3 /nobreak > nul

echo Starting React frontend server...
start cmd /k "cd /d D:\parking-project\frontend && npm start"

echo Both servers are starting...
echo Django backend: http://localhost:8000
echo React frontend: http://localhost:3000
pause