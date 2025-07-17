#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'parking_project.settings')
django.setup()

from django.contrib.auth.models import User

def create_superuser():
    username = 'admin'
    email = 'admin@parking.com'
    password = 'admin123'
    
    # Check if superuser already exists
    if User.objects.filter(username=username).exists():
        print(f"Superuser '{username}' already exists.")
        return
    
    # Create superuser
    user = User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )
    
    print(f"Superuser created successfully!")
    print(f"Username: {username}")
    print(f"Password: {password}")
    print(f"Email: {email}")

if __name__ == '__main__':
    create_superuser()