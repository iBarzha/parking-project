#!/usr/bin/env python
import requests
import json

# Test API endpoints
BASE_URL = 'http://localhost:8000/api'

def test_parking_spots():
    """Test parking spots API"""
    try:
        response = requests.get(f'{BASE_URL}/parking-spots/')
        print(f"Parking spots API: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"  - Found {len(data.get('parking_spots', []))} parking spots")
            print(f"  - Statistics: {data.get('statistics', {})}")
        else:
            print(f"  - Error: {response.text}")
    except Exception as e:
        print(f"  - Exception: {e}")

def test_auth_endpoints():
    """Test authentication endpoints"""
    session = requests.Session()
    
    # Get CSRF token
    try:
        response = session.get(f'{BASE_URL}/parking-spots/')
        print(f"CSRF token test: {response.status_code}")
        
        # Try login
        login_data = {
            'username': 'admin',
            'password': 'admin123'
        }
        response = session.post(f'{BASE_URL}/auth/login/', json=login_data)
        print(f"Login API: {response.status_code}")
        if response.status_code == 200:
            print(f"  - Login successful")
        else:
            print(f"  - Login failed: {response.text}")
            
    except Exception as e:
        print(f"  - Exception: {e}")

if __name__ == '__main__':
    print("Testing API endpoints...")
    print("=" * 50)
    
    test_parking_spots()
    print()
    test_auth_endpoints()
    
    print("\nAPI test completed!")
    print("Make sure Django server is running: python manage.py runserver")