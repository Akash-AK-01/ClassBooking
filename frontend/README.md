# ClassBook Frontend

A React-based frontend application for the ClassBook class booking system, built for L2 interview assessment.

## 🏗️ Project Architecture

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx       # Navigation header with role-based access
│   │   ├── ClassCard.tsx    # Class display card component
│   │   ├── BookingForm.tsx  # Session booking form
│   │   └── LoginForm.tsx    # Authentication forms
│   ├── pages/               # Main page components
│   │   ├── AdminDashboard.tsx    # Admin: create classes, view bookings
│   │   ├── StudentPortal.tsx     # Student: browse classes, book seats
│   │   └── LoginPage.tsx         # Login page for both roles
│   ├── types/               # TypeScript definitions
│   │   └── index.ts         # All interfaces (User, Class, Session, Booking, AuditLog)
│   ├── hooks/               # Custom React functions
│   │   ├── useAuth.ts       # Authentication logic with role management
│   │   └── useBookings.ts   # Booking management and CRUD operations
│   ├── utils/               # Helper functions
│   │   └── mockData.ts      # Mock API data for development
│   ├── App.tsx              # Main app with routing and role-based access
│   └── main.tsx             # App entry point with providers
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
├── index.html               # HTML template
└── README.md                # Project documentation
```

## 🚀 Features

### **User Authentication**
- Login/Register system with role-based access
- JWT-style token management (localStorage)
- Role-based route protection (Admin/Student)

### **Admin Dashboard**
- Create and manage classes
- Create and manage sessions
- View all bookings and sessions
- Monitor capacity and attendance

### **Student Portal**
- Browse available classes
- View class sessions with availability
- Book and cancel sessions
- View personal booking history

### **Core Functionality**
- Prevent double-booking
- Enforce capacity limits
- Real-time seat availability
- Responsive Bootstrap UI

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Query + Custom Hooks
- **UI Framework**: Bootstrap 5
- **Styling**: CSS with responsive design

## 📦 Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🔐 Demo Accounts

### **Admin User**
- Email: `admin@classbook.com`
- Password: `password`
- Role: Admin

### **Student User**
- Email: `student@classbook.com`
- Password: `password`
- Role: Student

## 🎯 User Flows

### **Admin Flow**
1. Login with admin credentials
2. Create new classes (title, description, instructor, category, price)
3. Create sessions for classes (date, time, capacity, location)
4. Monitor bookings and session capacity
5. View all student bookings

### **Student Flow**
1. Login with student credentials
2. Browse available classes
3. View sessions for specific classes
4. Book available sessions
5. Cancel existing bookings
6. View personal booking history

## 🚦 Business Rules

- **No Double Booking**: Students cannot book the same session twice
- **Capacity Enforcement**: Sessions cannot exceed their capacity
- **Role-Based Access**: Admins manage, Students book
- **Real-time Updates**: Seat availability updates immediately

## 📱 Responsive Design

- Mobile-first approach
- Bootstrap grid system
- Responsive tables and forms
- Touch-friendly interface

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Project Structure**
- **Components**: Reusable UI elements
- **Pages**: Main application views
- **Hooks**: Custom React logic and state management
- **Types**: TypeScript interfaces and type definitions
- **Utils**: Helper functions and mock data

## 🚀 Next Steps

This frontend is ready for:
1. **Backend Integration**: Replace mock data with real API calls
2. **Database**: Connect to PostgreSQL with proper schemas
3. **Authentication**: Implement JWT with refresh tokens
4. **Testing**: Add unit and integration tests
5. **Deployment**: Deploy to Vercel/Netlify/Railway

## 📋 L2 Requirements Met

✅ **Frontend**: React + TypeScript + Vite  
✅ **Routing**: React Router with role-based access  
✅ **Data Fetching**: React Query setup  
✅ **UI Framework**: Bootstrap integration  
✅ **Role Management**: Admin/Student separation  
✅ **Booking System**: Prevent double-booking & capacity overflow  
✅ **Responsive Design**: Mobile-first approach  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built for ProArch L2 Interview Assessment**  
**Project**: ClassBook - Class Booking System  
**Status**: Frontend Complete, Ready for Backend Integration
