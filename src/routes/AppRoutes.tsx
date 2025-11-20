import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import ServicesList from '../pages/ServicesList';
import ServiceDetails from '../pages/ServiceDetails';
import MyOrders from '../pages/MyOrders';
import OrderDetails from '../pages/OrderDetails';
import SignIn from '../pages/auth/SignIn';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetEmailSent from '../pages/auth/ResetEmailSent';
import SetNewPassword from '../pages/auth/SetNewPassword';
import Welcome from '../pages/auth/Welcome';
import GettingStarted from '../pages/auth/GettingStarted';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import OrderTracking from '../pages/OrderTracking';
import EditProfile from '../pages/EditProfile';
import Notifications from '../pages/Notifications';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="login" element={<SignIn />} />
          <Route path="signup" element={<GettingStarted />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-email-sent" element={<ResetEmailSent />} />
          <Route path="set-new-password" element={<SetNewPassword />} />
          <Route path="welcome" element={<Welcome />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/services-list" element={<ServicesList />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/tracking" element={<OrderTracking />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

