#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'parking_project.settings')
django.setup()

from parking.models import ParkingSpot
from django.test import Client

def test_api():
    print("Testing API...")
    
    # Check database
    spots = ParkingSpot.objects.all()
    print(f"Database has {spots.count()} parking spots")
    
    # Test API
    client = Client()
    response = client.get('/api/parking-spots/')
    
    print(f"API Status: {response.status_code}")
    
    if response.status_code == 200:
        print("SUCCESS: API is working!")
        import json
        data = json.loads(response.content)
        print(f"Found {len(data.get('parking_spots', []))} spots via API")
        print(f"Statistics: {data.get('statistics', {})}")
    else:
        print(f"ERROR: API failed with status {response.status_code}")

if __name__ == '__main__':
    test_api()