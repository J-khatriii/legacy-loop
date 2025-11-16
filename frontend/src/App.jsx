import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Shell from "./pages/Shell";
import People from "./pages/People";
import Layout from "./pages/Layout";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import AdminSendMessage from "./pages/admin/Messages";
import AdminProfile from "./pages/admin/AdminProfile";
import AlumniProfile from "./pages/AlumniProfile";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminStatistics from "./pages/admin/AdminStatistics";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthed = !!user;

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* root redirect */}
        <Route
          path="/"
          element={
            isAuthed ? (
              <Navigate to="/app/layout" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* public */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* protected app shell */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Shell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Layout />} />
          <Route path="layout" element={<Layout />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:id" element={<Messages />} />
          <Route path="people" element={<People />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />

          <Route path="announcement" element={<AdminSendMessage />} />

          <Route path="reporting" element={<AdminStatistics />} />

          {/* Conditional Profile */}
          <Route
            path="profile"
            element={
              user?.role === "alumni" ? (
                <AlumniProfile />
              ) : user?.role === "admin" ? (
                <AdminProfile />
              ) : (
                <Profile />
              ) // default for student or any other role
            }
          />
        </Route>

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
