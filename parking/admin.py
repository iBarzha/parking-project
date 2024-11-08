from django.contrib import admin
from .models import ParkingSpot, Reservation

@admin.register(ParkingSpot)
class ParkingSpotAdmin(admin.ModelAdmin):
    list_display = ('number', 'is_available', 'price_per_hour')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('user', 'parking_spot', 'start_time', 'end_time', 'total_price')
    list_filter = ('start_time', 'end_time')
