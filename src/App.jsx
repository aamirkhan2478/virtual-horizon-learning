import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResendEmail from "./pages/ResendEmail";
import ResetPassword from "./pages/ResetPassword";
import {
  DashboardProtected,
  LoginProtected,
} from "./components/ProtectedRoute";
import AuthLayout from "./pages/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DashboardLayout from "./pages/DashboardLayout";
import Resources from "./pages/Resources";
import AddResource from "./pages/AddResource";
import ResourceDetails from "./pages/ResourceDetails";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<LoginProtected />}>
          <Route element={<AuthLayout />}>
            <Route index element={<Login title="Login" />} />
            <Route path="/register" element={<Register title="Register" />} />
            <Route
              path="/verify/:token"
              element={<VerifyEmail title="Verify Email" />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword title="Forgot Password" />}
            />
            <Route
              path="/resend-email"
              element={<ResendEmail title="Resend Email" />}
            />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword title="Reset Password" />}
            />
          </Route>
        </Route>
        <Route element={<DashboardProtected />}>
          <Route
            path="/dashboard"
            element={<DashboardLayout title="Dashboard" />}
          >
            <Route index element={<Dashboard title="Dashboard" />} />
            <Route
              path="/dashboard/user-profile"
              element={<Profile title="User Profile" />}
            />
            <Route
              path="/dashboard/resources"
              element={<Resources title="Resources" />}
            />
            <Route
              path="/dashboard/add-resource"
              element={<AddResource title="Add Resource" />}
            />
            <Route
              path="/dashboard/resource-details/:id"
              element={<ResourceDetails title="Resource Details" />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
