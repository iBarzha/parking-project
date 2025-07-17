# 🚗 Smart Parking Management System

A modern parking reservation system with Django backend and React frontend, featuring real-time availability tracking, automated pricing, and seamless user experience.

## 🎯 About

This is a full-stack parking management application that allows users to:
- View available parking spots in real-time
- Book parking reservations with dynamic pricing
- Track reservation history
- Manage spots through admin panel

## 🛠️ Technology Stack

- **Backend**: Django 5.1.1 + Django REST Framework
- **Frontend**: React 18 + Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: Django Session-based Auth

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd parking-project
   ```

2. **Backend Setup**
   ```bash
   # Install Python dependencies
   pip install django djangorestframework django-cors-headers psycopg2-binary python-dotenv

   # Setup database
   python manage.py migrate

   # Create admin user
   python create_superuser.py

   # Add sample data
   python add_sample_data.py
   ```

3. **Frontend Setup**
   ```bash
   # Install React dependencies
   cd frontend
   npm install
   ```

### Start the Application

1. **Start Django Backend** (Terminal 1):
   ```bash
   python manage.py runserver 8000
   ```

2. **Start React Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

## 📱 Features

- **Real-time Availability**: Live parking spot status updates
- **Dynamic Pricing**: Automatic cost calculation based on duration
- **Responsive Design**: Works on desktop and mobile
- **User Authentication**: Secure login/logout system
- **Admin Dashboard**: Manage spots and reservations
- **API Integration**: RESTful API for frontend-backend communication

