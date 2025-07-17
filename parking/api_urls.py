from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import (
    ParkingSpotViewSet, 
    ReservationViewSet, 
    calculate_price,
    api_login,
    api_logout,
    current_user
)

router = DefaultRouter()
router.register(r'parking-spots', ParkingSpotViewSet)
router.register(r'reservations', ReservationViewSet, basename='reservation')

urlpatterns = [
    path('', include(router.urls)),
    path('calculate-price/', calculate_price, name='api_calculate_price'),
    path('auth/login/', api_login, name='api_login'),
    path('auth/logout/', api_logout, name='api_logout'),
    path('auth/user/', current_user, name='api_current_user'),
]