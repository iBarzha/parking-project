import React, { useState, useEffect } from 'react';
import { parkingService } from '../services/api';
import ParkingSpotCard from '../components/ParkingSpotCard';

const Home = () => {
  const [parkingData, setParkingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadParkingSpots();
  }, []);

  const loadParkingSpots = async () => {
    try {
      setLoading(true);
      const data = await parkingService.getAllSpots();
      setParkingData(data);
    } catch (err) {
      setError('Failed to load parking spots');
      console.error('Error loading parking spots:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const { parking_spots = [], statistics = {} } = parkingData || {};

  return (
    <main className="container mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Available Parking Spots</h2>
        <p className="text-gray-600 mb-6">Choose from our available parking spots. Real-time pricing and instant booking!</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Available Spots</p>
              <p className="text-2xl font-semibold text-gray-700">{statistics.available_count || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Occupied Spots</p>
              <p className="text-2xl font-semibold text-gray-700">{statistics.occupied_count || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h4a2 2 0 002-2v-2M7 13h10v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Spots</p>
              <p className="text-2xl font-semibold text-gray-700">{statistics.total_count || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {parking_spots.length > 0 ? (
          parking_spots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚫</div>
            <p className="text-gray-600 text-lg">No parking spots available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;