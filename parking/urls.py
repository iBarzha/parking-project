from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('book/<int:spot_id>/', views.book_parking_spot, name='book_parking_spot'),
    path('reservation_success/', views.reservation_success, name='reservation_success'),
]
