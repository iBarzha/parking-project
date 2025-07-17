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

def add_sample_data():
    # Create sample parking spots
    parking_spots = [
        {'number': 'A1', 'price_per_hour': 5.00},
        {'number': 'A2', 'price_per_hour': 5.00},
        {'number': 'A3', 'price_per_hour': 5.00},
        {'number': 'B1', 'price_per_hour': 7.50},
        {'number': 'B2', 'price_per_hour': 7.50},
        {'number': 'B3', 'price_per_hour': 7.50},
        {'number': 'C1', 'price_per_hour': 10.00},
        {'number': 'C2', 'price_per_hour': 10.00},
        {'number': 'VIP1', 'price_per_hour': 15.00},
        {'number': 'VIP2', 'price_per_hour': 15.00},
    ]
    
    # Delete existing spots
    ParkingSpot.objects.all().delete()
    
    # Add new spots
    for spot_data in parking_spots:
        spot = ParkingSpot.objects.create(**spot_data)
        print(f"Created parking spot: {spot}")
    
    print(f"Added {len(parking_spots)} parking spots to the database.")

if __name__ == '__main__':
    add_sample_data()