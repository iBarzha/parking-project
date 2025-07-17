import React from 'react';
import { Link } from 'react-router-dom';

const ParkingSpotCard = ({ spot }) => {
  const getSpotTypeInfo = (pricePerHour) => {
    if (pricePerHour >= 15) {
      return { type: 'VIP', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
    } else if (pricePerHour >= 10) {
      return { type: 'Premium', bgColor: 'bg-purple-100', textColor: 'text-purple-800' };
    } else if (pricePerHour >= 7) {
      return { type: 'Standard', bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
    } else {
      return { type: 'Economy', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
  };

  const spotTypeInfo = getSpotTypeInfo(spot.price_per_hour);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Status Badge */}
      <div className="relative">
        <div className="absolute top-3 right-3 z-10">
          {spot.is_available ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Available
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Occupied
            </span>
          )}
        </div>
        
        {/* Spot Visual */}
        <div className={`${spot.is_available ? 'bg-green-50' : 'bg-red-50'} p-6 text-center`}>
          <div className={`${spot.is_available ? 'text-green-600' : 'text-red-600'} text-4xl mb-2`}>
            {spot.is_available ? '🚗' : '🚙'}
          </div>
          <h2 className="text-xl font-bold text-gray-800">Spot #{spot.number}</h2>
        </div>
      </div>
      
      {/* Spot Details */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Price per Hour</span>
          <span className="text-2xl font-bold text-blue-600">${spot.price_per_hour}</span>
        </div>
        
        {/* Spot Type Badge */}
        <div className="mb-4">
          <span className={`${spotTypeInfo.bgColor} ${spotTypeInfo.textColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
            {spotTypeInfo.type}
          </span>
        </div>
        
        {/* Book Button */}
        {spot.is_available ? (
          <Link 
            to={`/book/${spot.id}`}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Book Now
          </Link>
        ) : (
          <button 
            disabled 
            className="w-full bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-lg cursor-not-allowed"
          >
            Currently Occupied
          </button>
        )}
      </div>
    </div>
  );
};

export default ParkingSpotCard;