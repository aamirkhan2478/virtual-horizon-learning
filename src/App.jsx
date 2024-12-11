import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/Layouts/Dashboard/components/ui/toaster";
import Login from "./Layouts/Dashboard/pages/Login";
import Register from "./Layouts/Dashboard/pages/Register";
import VerifyEmail from "./Layouts/Dashboard/pages/VerifyEmail";
import ForgotPassword from "./Layouts/Dashboard/pages/ForgotPassword";
import ResendEmail from "./Layouts/Dashboard/pages/ResendEmail";
import ResetPassword from "./Layouts/Dashboard/pages/ResetPassword";
import {
  DashboardProtected,
  LoginProtected,
} from "./Layouts/Dashboard/components/ProtectedRoute";
import AuthLayout from "./Layouts/Dashboard/pages/AuthLayout";
import Dashboard from "./Layouts/Dashboard/pages/Dashboard";
import Profile from "./Layouts/Dashboard/pages/Profile";
import DashboardLayout from "./Layouts/Dashboard/pages/DashboardLayout";
import Resources from "./Layouts/Dashboard/pages/Resources";
import AddResource from "./Layouts/Dashboard/pages/AddResource";
import ResourceDetails from "./Layouts/Dashboard/pages/ResourceDetails";
import VideoPage from "./Layouts/Dashboard/pages/VideoPage";
import SuccessPayment from "./Layouts/Dashboard/pages/SuccessPayment";
import CancelPayment from "./Layouts/Dashboard/pages/CancelPayment";
import Room from "./Layouts/Dashboard/pages/Room";
import MainLayout from "./Layouts/Main";
import { Home } from "./Layouts/Main/pages/Home";
import { Contact } from "./Layouts/Main/pages/Contact";
import { About } from "./Layouts/Main/pages/About";
import { Courses } from "./Layouts/Main/pages/Courses";
import { Instructor } from "./Layouts/Main/pages/Instructor";
import { Blog } from "./Layouts/Main/pages/Blog";
import { BlogSinglePage } from "./Layouts/Main/components/BlogSinglePage";
import ScheduleMeeting from "./Layouts/Dashboard/pages/ScheduleMeeting";
import GenerateQuiz from "./Layouts/Dashboard/pages/GenerateQuiz";
import Quizzes from "./Layouts/Dashboard/pages/Quizzes";
import SubmitAssignment from "./Layouts/Dashboard/pages/SubmitAssignment";
import AddAssignment from "./Layouts/Dashboard/pages/AddAssignment";
import { FAQs } from "./Layouts/Main/pages/FAQs";
import Assignments from "./Layouts/Dashboard/pages/Assignments";
import ErrorPage from "./Layouts/Main/ErrorPage";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/single-blog" element={<BlogSinglePage />} />
        </Route>
        <Route element={<LoginProtected />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login title="Login" />} />
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
            <Route
              path="/dashboard/video-page/:id"
              element={<VideoPage title="Video Page" />}
            />
            <Route
              path="/dashboard/success"
              element={<SuccessPayment title={"Success Payment"} />}
            />
            <Route
              path="/dashboard/cancel"
              element={<CancelPayment title="Cancel Payment" />}
            />
            <Route
              path="/dashboard/schedule/:notification_id"
              element={<ScheduleMeeting title="Schedule Meeting" />}
            />
            <Route
              path="/dashboard/:id/generate-quiz"
              element={<GenerateQuiz title="Generate Quiz" />}
            />
            <Route
              path="/dashboard/:id/quizzes"
              element={<Quizzes title="Quizzes" />}
            />
            <Route
              path="/dashboard/:resourceId/assignments"
              element={<Assignments title="Assignments" />}
            />
            <Route
              path="/dashboard/:resourceId/submit-assignment/:assignmentId"
              element={<SubmitAssignment title="Submit Assignment" />}
            />
            <Route
              path="/dashboard/:id/add-assignment"
              element={<AddAssignment title="Add Assignment" />}
            />
          </Route>
          <Route path="/room/:id" element={<Room title="Video Room" />} />
        </Route>

        {/* Catch-all Route for Unmatched Paths */}
        <Route
          path="*"
          element={<ErrorPage title="Page Not Found" />} // ErrorPage component
        />
      </Routes>
    </>
  );
};

export default App;
