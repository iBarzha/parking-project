from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime
from decimal import Decimal
from .models import ParkingSpot, Reservation
from .serializers import (
    ParkingSpotSerializer, 
    ReservationSerializer, 
    ReservationCreateSerializer,
    PriceCalculationSerializer,
    UserSerializer
)

class ParkingSpotViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkingSpot.objects.all()
    serializer_class = ParkingSpotSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        # Update expired reservations
        expired_reservations = Reservation.objects.filter(end_time__lt=timezone.now())
        for reservation in expired_reservations:
            reservation.parking_spot.is_available = True
            reservation.parking_spot.save()
            reservation.delete()
        
        # Get all parking spots
        parking_spots = self.get_queryset()
        serializer = self.get_serializer(parking_spots, many=True)
        
        # Calculate statistics
        available_count = parking_spots.filter(is_available=True).count()
        occupied_count = parking_spots.filter(is_available=False).count()
        total_count = parking_spots.count()
        
        return Response({
            'parking_spots': serializer.data,
            'statistics': {
                'available_count': available_count,
                'occupied_count': occupied_count,
                'total_count': total_count
            }
        })

class ReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user).order_by('-start_time')
    
    def create(self, request):
        serializer = ReservationCreateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            
            # Get parking spot
            try:
                parking_spot = ParkingSpot.objects.get(id=data['parking_spot_id'])
            except ParkingSpot.DoesNotExist:
                return Response({'error': 'Parking spot not found'}, status=status.HTTP_404_NOT_FOUND)
            
            # Check if spot is available
            if not parking_spot.is_available:
                return Response({'error': 'Parking spot is not available'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create datetime objects
            start_time = datetime.combine(data['date'], datetime.min.time().replace(hour=data['start_hour']))
            end_time = datetime.combine(data['date'], datetime.min.time().replace(hour=data['end_hour']))
            
            # Create reservation
            reservation = Reservation.objects.create(
                user=request.user,
                parking_spot=parking_spot,
                start_time=start_time,
                end_time=end_time
            )
            
            # Mark spot as unavailable
            parking_spot.is_available = False
            parking_spot.save()
            
            return Response(ReservationSerializer(reservation).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def calculate_price(request):
    serializer = PriceCalculationSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        
        try:
            parking_spot = ParkingSpot.objects.get(id=data['parking_spot_id'])
        except ParkingSpot.DoesNotExist:
            return Response({'error': 'Parking spot not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Calculate duration and price
        duration_hours = data['end_hour'] - data['start_hour']
        total_price = float(duration_hours * parking_spot.price_per_hour)
        
        return Response({'total_price': total_price})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username and password:
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({
                'user': UserSerializer(user).data,
                'message': 'Login successful'
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_logout(request):
    logout(request)
    return Response({'message': 'Logout successful'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    return Response(UserSerializer(request.user).data)