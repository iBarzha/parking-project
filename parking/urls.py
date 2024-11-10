from django.urls import path
from . import views

urlpatterns = [
    path('calculate_price/<int:spot_id>/', views.calculate_price, name='calculate_price'),
    path('history/', views.reservation_history, name='reservation_history'),
    path('', views.home, name='home'),
    path('book/<int:spot_id>/', views.book_parking_spot, name='book_parking_spot'),
    path('reservation_success/', views.reservation_success, name='reservation_success'),
]
