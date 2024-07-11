import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResendEmail from "./pages/ResendEmail";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route index element={<Login title="Login" />}></Route>
        <Route path="/register" element={<Register title="Register" />}></Route>
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
      </Routes>
    </>
  );
};

export default App;
