# Link Analytics Dashboard - Micro-SaaS Solution

A full-stack URL shortener with analytics dashboard, built with React, Node.js, and MongoDB.

### Project Demo Video: https://drive.google.com/file/d/1aKzUuOxCVMi6FGH7oaruVKdKfKDwv5a4/view?usp=sharing

### Frontend Github: https://github.com/chandan1508/link-analytics-frontend.git

### Backend Github: https://github.com/chandan1508/link-analytics-backend.git

## Features

- **User Authentication**: JWT-based login system
- **URL Shortening**: Create short links with optional custom aliases
- **Analytics Dashboard**: Track clicks, devices, Browsers, Operating Systems.
- **Responsive Design**: Works on all device sizes
- **QR Code Generation**: Generate QR codes for short URLs
- **Pagination & Search**: Navigate through links easily

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State management)
- Rechart.js (Data visualization)
- TailwindCSS (Styling)
- React Router (Navigation)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)

## Project Structure

```
backend/
├── config/
│   ├── db.js
│   └── jwt.js
├── controllers/
│   ├── authController.js
│   ├── clickController.js
│   └── urlController.js
├── middleware/
│   ├── auth.js
│   └── error.js
├── models/
│   ├── Click.js
│   ├── User.js
│   └── Url.js
├── routes/
│   ├── authRoutes.js
│   ├── clickRoutes.js
│   └── urlRoutes.js
└── index.js
```

```
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── auth.js
│   │   ├── urls.js
│   │   └── analytics.js
│   ├── app/
│   │   └── store.js
│   ├── components/
│   │   ├── Auth/
│   │   │   └── LoginForm.jsx
│   │   ├── Dashboard/
│   │   │   ├── AnalyticsCharts.jsx
│   │   │   ├── CreateLinkForm.jsx
│   │   │   ├── LinkDetailsModal.jsx
│   │   │   ├── LinksTable.jsx
│   │   │   └── StatsCards.jsx
│   │   ├── Layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   └── UI/
│   │       ├── Button.jsx
│   │       ├── Loader.jsx
│   │       ├── Pagination.jsx
│   │       └── SearchBar.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   └── authThunks.js
│   │   ├── urls/
│   │   │   ├── urlsSlice.js
│   │   │   └── urlsThunks.js
│   │   └── analytics/
│   │       ├── analyticsSlice.js
│   │       └── analyticsThunks.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LinkAnalyticsPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── package.json

```


## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chandan1508/link-analytics-frontend.git
   git clone https://github.com/chandan1508/link-analytics-backend.git
   ```
2. **Set up Backend**
   ```bash
   cd backend
   npm install
   Update .env with your configuration
   ```
3. **Set up Frontend**
   ```bash
   cd ../frontend
   npm install
   Update .env with your API base URL
   ```
4. **Run the application**
   ```bash
   cd backend
   npm run dev

   cd frontend
   npm run dev
   ```

### Environment Variables

**Backend**
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/link-analytics
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   ```  
**frontend**
   ```bash
   VITE_API_BASE_URL=http://localhost:5000
   ```  

### Test Credentials
Use the following credentials to test the application:

Email: intern@dacoid.com

Password: Test123

## Available Scripts
### Backend
```bash
npm run dev: Start development server

npm start: Start production server

npm test: Run tests
```

### Frontend
```bash
npm run dev: Start development server

npm run build: Create production build

npm run preview: Preview production build

npm run lint: Run ESLint
```

# ✨ Features
## 1. User Authentication
🔐 Secure JWT-based login system
📝 Hardcoded test user: intern@dacoid.com / Test123
🛡️ Protected routes for authenticated users only

## 2. URL Shortening
🔗 Convert long URLs to short, shareable links (e.g., https://yourdomain.com/x9kQ2A)
🎨 Optional custom aliases (e.g., https://yourdomain.com/myshop)
⏳ Set expiration dates for temporary links
📋 Copy shortened links with one click

## 3. Smart Redirection
🔄 Instant redirect to original URLs
📊 Async click tracking (logs data without slowing redirection)
⚡ Loading spinner during redirect operations

## 4. Analytics Dashboard
### 📈 Real-time Stats:

Total clicks per link

Click trends over time (line/bar charts)

Device breakdown (Desktop/Mobile/Tablet)

Browser and OS usage

## 5. 🗓️ Link Management:

View all created short URLs in sortable table

See creation/expiration dates

Filter active/expired links


## 6. 🔳 QR Code Generation:

Auto-generate QR codes for every short URL

Download QR as PNG for print/marketing

## 7. 🔍 Search & Pagination:

Full-text search across all URLs

Paginated results for large datasets
