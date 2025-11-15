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

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Settings from "./pages/Settings";
import AdminSendMessage from "./pages/admin/Messages";

const App = () => {

  const isAuthed = !!JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* root redirect */}
        <Route
          path="/"
          element={ isAuthed ? <Navigate to="/app/layout" replace/> : <Navigate to="/signin" replace/> }
        />

        {/* public */}
        <Route path="/signin" element={ <PublicRoute> <SignIn/> </PublicRoute> } />
        <Route path="/signup" element={ <PublicRoute> <SignUp/> </PublicRoute> } />

        {/* protected app shell with persistent sidebar */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Shell />
            </ProtectedRoute>
          }
        >
        <Route index element={<Layout />} />
          
          {/* children share the same sidebar */}
          <Route path="layout" element={ <Layout /> } />
          <Route path="messages" element={ <Messages /> } />
          <Route path="/app/messages/:id" element={ <Messages /> } />
          <Route path="/app/people" element={ <People /> } />
          <Route path="/app/profile" element={ <Profile /> } />
          <Route path="/app/create-post" element={<CreatePost />} />
          <Route path="/app/notifications" element={<Notifications />} />
          <Route path="/app/settings" element={<Settings />} />          

          <Route path="/app/announcement" element={<AdminSendMessage />} />

        </Route>


        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;



// import { Navigate, Route, Routes } from "react-router-dom";
// import SignIn from "./pages/SignIn";
// import Layout from "./pages/Layout";
// import SignUp from "./pages/Signup";
// import { Toaster } from "react-hot-toast";
// import PublicRoute from "./routes/PublicRoute";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Messages from "./pages/Messages";

// const App = () => {
//   return (
//     <>
//       <Toaster position="top-right" />
//       <Routes>
//         <Route
//          path="/"
//          element={
//           JSON.parse(localStorage.getItem("user"))
//           ? <Navigate to="/layout" replace/>
//           : <Navigate to="/signin" replace/>
//          }
//         />

//         <Route path="/signin" element={<PublicRoute> <SignIn /> </PublicRoute>} />

//         <Route path="/signin" element={<PublicRoute> <SignUp /> </PublicRoute>} />

//         <Route path="/layout" element={<ProtectedRoute> <Layout /> </ProtectedRoute>} />

//         <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />

//         {/* Optional: catch-all redirect */}
//         {/* <Route path="*" element={<Navigate to="/signin" replace />} /> */}
//       </Routes>
//     </>
//   )
// }

// export default App;