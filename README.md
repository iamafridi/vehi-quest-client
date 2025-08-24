# VehiQuest - Vehicle Rental Platform

## 🚗 Overview

VehiQuest is a comprehensive vehicle rental platform that connects vehicle owners (hosts) with renters (guests). The platform supports multiple user roles and provides a seamless booking experience with integrated payment processing.

## ✨ Features

### For Guests

- Browse vehicles by category (Cars, SUVs, Motorcycles, Buses, Trucks, Vans, Convertibles, Sports Cars)
- Advanced search and filtering
- Real-time availability checking
- Secure payment processing with Stripe
- Booking management dashboard
- Guest statistics and spending tracking

### For Hosts

- List and manage vehicles
- Upload vehicle images
- Set availability periods and pricing
- Manage bookings and reservations
- Host statistics and earnings tracking
- Toggle between guest and host modes

### For Admins

- User management and role assignment
- Platform statistics and analytics
- Comprehensive dashboard with charts
- User verification and status management

## 🛠 Tech Stack

### Frontend

- **React 18** - Main framework
- **React Router Dom** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **React Query (@tanstack/react-query)** - Data fetching and state management
- **React Date Range** - Date picker functionality
- **React Google Charts** - Data visualization
- **React Helmet Async** - SEO optimization
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon components
- **React Spinners** - Loading indicators
- **Headless UI** - Unstyled UI components

### Payment Integration

- **Stripe** - Payment processing
- **@stripe/react-stripe-js** - Stripe React components

### Backend Integration

- **Axios** - HTTP client for API calls
- **Firebase** - Authentication services

### Image Management

- **ImgBB API** - Image hosting service

## 🏗 Project Structure

```
src/
├── api/                    # API service functions
│   ├── auth.js            # Authentication APIs
│   ├── bookings.js        # Booking management APIs
│   ├── vehicles.js        # Vehicle management APIs
│   ├── utils.js           # Utility APIs (image upload, stats)
│   └── index.js           # Axios configuration
├── components/            # Reusable components
│   ├── Button/            # Button components
│   ├── Categories/        # Category filtering
│   ├── Dashboard/         # Dashboard components
│   │   ├── Menu/          # Navigation menus
│   │   ├── Sidebar/       # Sidebar navigation
│   │   ├── Statistics/    # Statistics components
│   │   └── TableRows/     # Table row components
│   ├── Form/              # Form components
│   ├── Modal/             # Modal components
│   ├── Shared/            # Shared components
│   └── Vehicles/          # Vehicle-related components
├── hooks/                 # Custom hooks
│   ├── useAuth.js         # Authentication hook
│   └── useRole.jsx        # Role management hook
├── layouts/               # Layout components
│   ├── DashboardLayout.jsx
│   └── Main.jsx
├── pages/                 # Page components
│   ├── Dashboard/         # Dashboard pages
│   ├── Home.jsx           # Homepage
│   └── Login.jsx          # Login page
└── firebase.config.js     # Firebase configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Stripe account
- ImgBB account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/iamafridi/vehi-quest.git
   cd vehi-quest
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   # Firebase Configuration
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id

   # API Configuration
   VITE_API_URL=http://localhost:5000

   # Payment Gateway
   VITE_Payment_Gateway_PK=your_stripe_publishable_key

   # Image Upload
   VITE_IMGBB_KEY_API=your_imgbb_api_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📱 User Roles

### Guest

- Default role for new users
- Can browse and book vehicles
- Access to personal booking history
- Can request to become a host

### Host

- Can list and manage vehicles
- Access to booking management
- Toggle between guest and host modes
- View host-specific statistics

### Admin

- Full platform management access
- User role management
- Platform analytics and statistics
- System administration capabilities

## 🔐 Authentication

The platform uses Firebase Authentication with the following features:

- Email/Password authentication
- Google OAuth integration
- JWT token-based authorization
- Role-based access control
- Automatic token refresh and logout on expiration

## 💳 Payment Integration

- Stripe payment processing
- Secure card data handling
- Payment intent creation
- Transaction history tracking
- Real-time payment status updates

## 📊 Key Features Detail

### Vehicle Categories

- Cars - Personal transportation
- SUVs - Comfort with off-road capability
- Motorcycles - Two-wheeled vehicles
- Buses - Group transportation
- Trucks - Cargo transportation
- Vans - Multipurpose vehicles
- Convertibles - Open-air driving experience
- Sports Cars - High-performance vehicles

### Booking System

- Real-time availability checking
- Date range selection
- Dynamic pricing calculation
- Secure payment processing
- Booking confirmation and management

### Dashboard Analytics

- Interactive charts using Google Charts
- Role-specific statistics
- Calendar integration
- Revenue tracking
- User engagement metrics

## 🔧 API Integration

The frontend communicates with a backend API for:

- User authentication and management
- Vehicle CRUD operations
- Booking management
- Payment processing
- Statistics and analytics
- Image upload handling

## 🎨 UI/UX Features

- Fully responsive design
- Modern Tailwind CSS styling
- Interactive components with Headless UI
- Smooth loading states with React Spinners
- Toast notifications for user feedback
- Modal-based workflows
- Intuitive navigation and routing

## 📈 Performance Optimizations

- React Query for efficient data fetching and caching
- Code splitting with React Router
- Optimized image loading
- Lazy loading of components
- Efficient state management

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Secure API communication
- Input validation and sanitization
- HTTPS enforcement
- CORS protection

## 🚀 Deployment

The application can be deployed to various platforms:

- **Vercel** (Recommended for React apps)
- **Netlify**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

### Vercel Deployment

```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Afridi**

- Website: [VehiQuest.io](https://iamafridi.netlify.app)
- Email: afridiakbarifty@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Stripe for secure payment processing
- Firebase for authentication services
- All open-source contributors who made this project possible

---

**VehiQuest** - Rent Cars & Ride Safe 🚗
