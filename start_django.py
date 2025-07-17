#!/usr/bin/env python
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'parking_project.settings')
    print("Starting Django server on http://localhost:8000...")
    print("API will be available at: http://localhost:8000/api/")
    print("Press Ctrl+C to stop the server")
    
    try:
        execute_from_command_line(['manage.py', 'runserver', '8000'])
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)