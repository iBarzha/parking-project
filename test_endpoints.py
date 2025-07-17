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
from django.urls import reverse
from django.test import Client

def test_parking_spots():
    print("Testing parking spots...")
    
    # Check if parking spots exist
    spots = ParkingSpot.objects.all()
    print(f"Found {spots.count()} parking spots in database")
    
    # Test API endpoint
    client = Client()
    
    try:
        response = client.get('/api/parking-spots/')
        print(f"API Response Status: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ API endpoint is working!")
            import json
            data = json.loads(response.content)
            print(f"API Response: {data}")
        else:
            print(f"❌ API endpoint failed: {response.content}")
            
    except Exception as e:
        print(f"❌ Error testing API: {e}")

if __name__ == '__main__':
    test_parking_spots()