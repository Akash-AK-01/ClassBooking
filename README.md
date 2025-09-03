# ClassBooking – Frontend

This is the **frontend application** for the ClassBooking project (L2 assignment).  
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

📂 Project Structure

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
