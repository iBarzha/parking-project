from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import ParkingSpot, Reservation
from django.http import JsonResponse
from datetime import datetime, timedelta
from decimal import Decimal

def update_parking_spots():
    expired_reservations = Reservation.objects.filter(end_time__lt=timezone.now())
    for reservation in expired_reservations:
        reservation.parking_spot.is_available = True
        reservation.parking_spot.save()
        reservation.delete()

def home(request):
    update_parking_spots()
    parking_spots = ParkingSpot.objects.all()
    
    # Calculate statistics
    available_count = parking_spots.filter(is_available=True).count()
    occupied_count = parking_spots.filter(is_available=False).count()
    total_count = parking_spots.count()
    
    context = {
        'parking_spots': parking_spots,
        'available_count': available_count,
        'occupied_count': occupied_count,
        'total_count': total_count,
    }
    
    return render(request, 'parking/home.html', context)


@login_required
def book_parking_spot(request, spot_id):
    parking_spot = get_object_or_404(ParkingSpot, id=spot_id)

    if not parking_spot.is_available:
        return render(request, 'parking/unavailable.html', {'parking_spot': parking_spot})

    if request.method == 'POST':
        date = request.POST.get('date')
        start_hour = request.POST.get('start_hour')
        end_hour = request.POST.get('end_hour')

        start_time = datetime.fromisoformat(f"{date} {start_hour}:00")
        end_time = datetime.fromisoformat(f"{date} {end_hour}:00")

        if end_time <= start_time:
            return render(request, 'parking/book.html',
                          {'parking_spot': parking_spot, 'error': 'End time must be later than start time'})

        reservation = Reservation(
            user=request.user,
            parking_spot=parking_spot,
            start_time=start_time,
            end_time=end_time
        )
        reservation.save()

        parking_spot.is_available = False
        parking_spot.save()

        return redirect('reservation_success')

    return render(request, 'parking/book.html', {'parking_spot': parking_spot})


def reservation_success(request):
    return render(request, 'parking/reservation_success.html')

def reservation_history(request):
    reservations = Reservation.objects.filter(user=request.user).order_by('-start_time')
    return render(request, 'parking/reservation_history.html', {'reservations': reservations})


@login_required
def calculate_price(request, spot_id):
    if request.method == 'POST':
        parking_spot = get_object_or_404(ParkingSpot, id=spot_id)
        date = request.POST.get('date')
        start_hour = request.POST.get('start_hour')
        end_hour = request.POST.get('end_hour')

        try:
            start_time = datetime.fromisoformat(f"{date} {start_hour}:00")
            end_time = datetime.fromisoformat(f"{date} {end_hour}:00")

            if end_time <= start_time:
                return JsonResponse({'error': 'End time must be later than start time'}, status=400)

            duration = end_time - start_time
            hours = Decimal(duration.total_seconds()) / Decimal(3600)

            total_price = hours * parking_spot.price_per_hour

            return JsonResponse({'total_price': float(total_price)})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request'}, status=400)