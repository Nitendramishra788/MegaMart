import { Route, Routes } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";


import HomePage from "../features/home/pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import CartPage from "../features/cart/pages/CartPage";
import NotFoundPage from "../features/home/pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Guest Routes */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;