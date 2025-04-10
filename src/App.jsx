import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LinkAnalyticsPage from "./pages/LinkAnalyticsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout/Layout";
import PublicRoute from "./components/Auth/PublicRoute";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import MyLinks from "./pages/MyLinks";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="mylinks" element={<MyLinks />} />
            <Route path="analytics/:id" element={<LinkAnalyticsPage />} />
          </Route>
        </Route>

        {/* Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
