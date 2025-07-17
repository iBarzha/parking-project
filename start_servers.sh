#!/bin/bash

echo "Starting Django backend server..."
cd "D:\parking-project"
python manage.py runserver &
DJANGO_PID=$!

echo "Waiting for Django server to start..."
sleep 3

echo "Starting React frontend server..."
cd "D:\parking-project\frontend"
npm start &
REACT_PID=$!

echo "Both servers are starting..."
echo "Django backend: http://localhost:8000"
echo "React frontend: http://localhost:3000"
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $DJANGO_PID $REACT_PID