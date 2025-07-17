import React, { useState, useEffect } from 'react';
import { reservationService } from '../services/api';

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationService.getUserReservations();
      setReservations(data);
    } catch (err) {
      setError('Failed to load reservations');
      console.error('Error loading reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Reservations</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {reservations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <p className="text-gray-600 text-lg">No reservations found</p>
          <p className="text-gray-500 mt-2">Book a parking spot to see your reservations here</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Parking Spot #{reservation.parking_spot.number}
                  </h3>
                  <p className="text-gray-600">
                    ${reservation.parking_spot.price_per_hour}/hour
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ${reservation.total_price}
                  </p>
                  <p className="text-sm text-gray-500">Total Cost</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Time</p>
                  <p className="font-medium text-gray-700">
                    {formatDateTime(reservation.start_time)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Time</p>
                  <p className="font-medium text-gray-700">
                    {formatDateTime(reservation.end_time)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Reservation ID: {reservation.id}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    new Date(reservation.end_time) > new Date() 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {new Date(reservation.end_time) > new Date() ? 'Active' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationHistory;