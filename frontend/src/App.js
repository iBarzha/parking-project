import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import BookingPage from './pages/BookingPage';
import ReservationHistory from './pages/ReservationHistory';
import BookingSuccess from './pages/BookingSuccess';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/book/:spotId" 
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reservations" 
              element={
                <ProtectedRoute>
                  <ReservationHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/booking-success" 
              element={
                <ProtectedRoute>
                  <BookingSuccess />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;