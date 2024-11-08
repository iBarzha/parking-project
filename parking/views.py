from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import ParkingSpot, Reservation


def home(request):
    parking_spots = ParkingSpot.objects.all()
    return render(request, 'parking/home.html', {'parking_spots': parking_spots})


@login_required
def book_parking_spot(request, spot_id):
    parking_spot = get_object_or_404(ParkingSpot, id=spot_id)

    if request.method == 'POST':
        start_time = request.POST.get('start_time')
        end_time = request.POST.get('end_time')

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
