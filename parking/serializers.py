from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ParkingSpot, Reservation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = ['id', 'number', 'is_available', 'price_per_hour']

class ReservationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    parking_spot = ParkingSpotSerializer(read_only=True)
    parking_spot_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'parking_spot', 'parking_spot_id', 'start_time', 'end_time', 'total_price']
        read_only_fields = ['total_price']

class ReservationCreateSerializer(serializers.ModelSerializer):
    parking_spot_id = serializers.IntegerField()
    date = serializers.DateField()
    start_hour = serializers.IntegerField(min_value=0, max_value=23)
    end_hour = serializers.IntegerField(min_value=1, max_value=24)
    
    class Meta:
        model = Reservation
        fields = ['parking_spot_id', 'date', 'start_hour', 'end_hour']
        
    def validate(self, data):
        if data['end_hour'] <= data['start_hour']:
            raise serializers.ValidationError("End hour must be later than start hour")
        return data

class PriceCalculationSerializer(serializers.Serializer):
    parking_spot_id = serializers.IntegerField()
    date = serializers.DateField()
    start_hour = serializers.IntegerField(min_value=0, max_value=23)
    end_hour = serializers.IntegerField(min_value=1, max_value=24)
    
    def validate(self, data):
        if data['end_hour'] <= data['start_hour']:
            raise serializers.ValidationError("End hour must be later than start hour")
        return data