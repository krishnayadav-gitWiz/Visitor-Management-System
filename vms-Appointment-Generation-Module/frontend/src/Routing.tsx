import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoutes";
import LoginCompo from "../src/pages/loginComponent";
import VisitorsPage from "./pages/visitorsPage";
import ChangePassword from "./pages/changePassword";
import AppointmentForm from "./pages/AppointmentForm";


const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={3000} position={"top-center"} hideProgressBar={true} />
        <Routes>
          <Route path="/" element={<LoginCompo/>} />
          {/* <Route path="/signUp" element={<SignUp />} /> */}

          <Route
            path="/appointmentform"
            element={
              <ProtectedRoute>
                <AppointmentForm />
              </ProtectedRoute>
            }
          />
          
          

         <Route
            path="/changePassword"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

        
         <Route
            path="/visitorsPage"
            element={
              <ProtectedRoute>
                <VisitorsPage/>
              </ProtectedRoute>
            }
            /> 
        
          
          
          

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;