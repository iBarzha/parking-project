import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parkingService, reservationService } from '../services/api';

const BookingPage = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    start_hour: '',
    end_hour: ''
  });

  useEffect(() => {
    loadSpot();
  }, [spotId]);

  useEffect(() => {
    if (formData.date && formData.start_hour && formData.end_hour) {
      calculatePrice();
    } else {
      setTotalPrice(null);
    }
  }, [formData]);

  const loadSpot = async () => {
    try {
      setLoading(true);
      const spotData = await parkingService.getSpotById(spotId);
      setSpot(spotData);
      
      if (!spotData.is_available) {
        setError('This parking spot is no longer available');
      }
    } catch (err) {
      setError('Failed to load parking spot');
      console.error('Error loading spot:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = async () => {
    try {
      setPriceLoading(true);
      const priceData = await reservationService.calculatePrice({
        parking_spot_id: parseInt(spotId),
        date: formData.date,
        start_hour: parseInt(formData.start_hour),
        end_hour: parseInt(formData.end_hour)
      });
      setTotalPrice(priceData.total_price);
    } catch (err) {
      setTotalPrice(null);
      console.error('Error calculating price:', err);
    } finally {
      setPriceLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await reservationService.createReservation({
        parking_spot_id: parseInt(spotId),
        date: formData.date,
        start_hour: parseInt(formData.start_hour),
        end_hour: parseInt(formData.end_hour)
      });
      
      navigate('/booking-success');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create reservation');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !spot) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Reservation for Parking Spot #{spot?.number}
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 mb-1">
              Reservation Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="start_hour" className="block text-gray-700 mb-1">
              Start Time (Hour):
            </label>
            <input
              type="number"
              id="start_hour"
              name="start_hour"
              value={formData.start_hour}
              onChange={handleChange}
              min="0"
              max="23"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="end_hour" className="block text-gray-700 mb-1">
              End Time (Hour):
            </label>
            <input
              type="number"
              id="end_hour"
              name="end_hour"
              value={formData.end_hour}
              onChange={handleChange}
              min="1"
              max="24"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold text-blue-600">
              Total Price: {
                priceLoading ? (
                  <span className="text-gray-500">Calculating...</span>
                ) : totalPrice !== null ? (
                  `$${totalPrice.toFixed(2)} USD`
                ) : (
                  <span className="text-gray-500">— USD</span>
                )
              }
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting || !totalPrice || !spot?.is_available}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;