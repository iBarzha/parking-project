import React from 'react';
import { Link } from 'react-router-dom';

const BookingSuccess = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Reservation Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your parking spot has been successfully reserved. You will receive a confirmation shortly.
        </p>
        
        <div className="space-y-3">
          <Link 
            to="/" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Back to Home
          </Link>
          <Link 
            to="/reservations" 
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
          >
            View My Reservations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;