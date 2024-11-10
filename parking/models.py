from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
import datetime

class ParkingSpot(models.Model):
    number = models.CharField(max_length=10, unique=True)
    is_available = models.BooleanField(default=True)
    price_per_hour = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Place #{self.number} - {'Free' if self.is_available else 'Engaged'}"


class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parking_spot = models.ForeignKey(ParkingSpot, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def calculate_total_price(self):
        duration = self.end_time - self.start_time
        hours = duration.total_seconds() / 3600
        return hours * self.parking_spot.price_per_hour

    def save(self, *args, **kwargs):
        self.total_price = self.calculate_total_price()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Reservation by {self.user} for {self.parking_spot}"