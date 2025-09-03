# ClassBooking – Frontend

This is the **frontend application** for the ClassBooking project (L2 assignment). 
The Class Booking Project is a web application that allows users to book classes and manage their schedules.
It is built with **React + TypeScript + Vite** and provides a user interface for both **students** and **admins** to manage class bookings.

---

## 🚀 Features

- **User Flows**
  - Register and login with email + password
  - View upcoming sessions
  - Book and cancel seats
  - See booking status updates (confirmed / canceled)

- **Admin Flows**
  - Login as admin
  - Create and manage classes & sessions
  - View all bookings and cancellations

- **UI**
  - Responsive layout with sidebar navigation (Admin / Student / Trainer / Logout)
  - Modern styled buttons and hover states
  - Student detail pages accessible via bookings list
  - Trainer details include work experience
  - Class list includes sample classes (SQL, Java), no fee column

---

## 🛠️ Tech Stack

- [React](https://react.dev/) (with TypeScript)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest) (for API data fetching)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)

---

## Getting Started
To get started with the project, follow these steps:

1.Clone the repository: git clone https://github.com/your-username/class-booking.git
2.Install dependencies: npm install
3.Start the development server: npm start
4.Open the application in your web browser: http://localhost:3000

---

## API Documentation
The API documentation is available at http://localhost:3000/api/docs.

---

 ## 📂 Project Structure

frontend/
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── Header.tsx # Navigation header
│ │ ├── ClassCard.tsx # Class display card
│ │ ├── BookingForm.tsx # Booking form
│ │ └── LoginForm.tsx # Login/register form
│ ├── pages/ # Main page components
│ │ ├── AdminDashboard.tsx # Admin: create classes, view bookings
│ │ ├── StudentPortal.tsx # Student: browse classes, book seats
│ │ └── LoginPage.tsx # Login page for both roles
│ ├── types/ # TypeScript definitions
│ │ └── index.ts # Interfaces (User, Lecture, Booking)
│ ├── hooks/ # Custom React hooks
│ │ ├── useAuth.ts # Authentication logic
│ │ └── useBookings.ts # Booking management
│ ├── utils/ # Helper functions
│ │ └── mockData.ts # Mock API data for development
│ ├── App.tsx # Main app component with routing
│ └── main.tsx # App entry point
├── package.json
├── vite.config.ts
├── index.html
└── tsconfig.json

---
## Acknowledgments
Akash k - Creator and maintainer of the project

