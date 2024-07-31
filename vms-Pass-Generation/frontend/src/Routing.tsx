import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react';
import Login from './pages/Login';
import Visitors from './pages/Visitors';
import ImageCapture from './components/ImageCapture';
import NewVisitor from './pages/NewVisitor';
import VisitingInfo from './pages/VisitingInfo';
import VisitorEntry from './pages/VisitorEntry';
import Pass from './pages/Pass';
import Appointments from './pages/Appointments';
import VisitorImage from './pages/VisitorImage';
import TodayEntries from './pages/TodayEntries';
import LastWeek from './pages/LastWeek';
import LastMonth from './pages/LastMonth';
import LastSixMonths from './pages/LastSixMonths';
import AddUser from './pages/AddUser';
import LoginReport from './pages/LoginReports';
import AppointmentReport from './pages/AppointmentReport';
import VisitorReport from './pages/VisitorReport';
import VisitDateReport from './pages/VisitDateReport';
import Users from './pages/Users';
import ProtectedRoute from './ProctectedRoutes';
import ChangePassword from './pages/changePassword';
import UpdateVisitor from './pages/UpdateVisitor';
import UpdateVisitorForm from './pages/UpdateVisitorForm';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




const Routing=()=>{
    return(
        <div>
            <BrowserRouter>
            <ToastContainer autoClose={3000} position={"top-center"} hideProgressBar={true}/>
            <Routes>
                <Route
                path="/visitors"               
                 element={
                 <ProtectedRoute>
                 <Visitors/>
                 </ProtectedRoute>
                 } 
                 />
               
                <Route
                path="/"
                element={<Login/>}
                />
                 <Route
                path="/ImageCapture"
                element={
                <ProtectedRoute>
                 <ImageCapture imageData ={""}onCapture={undefined} fieldId={undefined}/>
                </ProtectedRoute>
                }
                />
                 <Route
                path="/NewVisitor"
                element={
                    <ProtectedRoute>
                <NewVisitor/>
                
                </ProtectedRoute>}
                />
                <Route
                path="/ChangePassword"
                element={<ChangePassword/>}
                />
                 <Route
                path="/VisitingInfo/:Id"
                element={
                <ProtectedRoute>
                <VisitingInfo/>
                </ProtectedRoute>
                }
                />
                 <Route
                path="/VisitorEntry"
                element={
                <ProtectedRoute>
                <VisitorEntry/>
                </ProtectedRoute>
                }
                />

                <Route
                path='/Pass/:indexId'
                element={
                <ProtectedRoute>
                <Pass/>
                </ProtectedRoute>
                }
                />
                 <Route
                path='/UpdateVisitor'
                element={
                <ProtectedRoute>
                <UpdateVisitor/>
                </ProtectedRoute>
                }
                />
                <Route
                path='/UpdateVisitorForm/:Id'
                element={
                <ProtectedRoute>
                <UpdateVisitorForm/>
                </ProtectedRoute>
                }
                />
                
                <Route
                path='/Appointments'
                element={
                <ProtectedRoute>
                <Appointments/>
                </ProtectedRoute>
                }
                />

               <Route
                path='/VisitorImage'
                element={
                <ProtectedRoute>
                <VisitorImage/>
                </ProtectedRoute>
                }
                />

               <Route
                path='/TodayEntries'
                element={
                <ProtectedRoute>
                <TodayEntries/>
                </ProtectedRoute>
                }
                />

                <Route
                path='/LastWeek'
                element={
                <ProtectedRoute>
                <LastWeek/>
                </ProtectedRoute>
                }
                />
                <Route
                path='/LastMonth'
                element={
                <ProtectedRoute>
                <LastMonth/>
                </ProtectedRoute>
                }
                />
                <Route
                path='/LastSixMonths'
                element={
                <ProtectedRoute>
                <LastSixMonths/>
                </ProtectedRoute>
                }
                />

                <Route
                path='/AddUser'
                element={
                    <ProtectedRoute>
                <AddUser/>
                </ProtectedRoute>
                }
                />
                <Route
                path='/loginReports'
                element={
                <ProtectedRoute>
                <LoginReport/>
                </ProtectedRoute>
                }
                />
                <Route
                path='/AppointmentReport'
                element={
                <ProtectedRoute>
                <AppointmentReport/>
                </ProtectedRoute>
                }
                />
                 <Route
                path='/VisitorReport'
                element={
                <ProtectedRoute>
                <VisitorReport/>
                </ProtectedRoute>
                }
                />
                <Route
                path='/VisitDateReport'
                element={
                <ProtectedRoute>
                <VisitDateReport/>
                </ProtectedRoute>
                }
                />

                <Route
                path='/Users'
                element={
                <ProtectedRoute>
                <Users/>
                </ProtectedRoute>
                }
                />
               




                
            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Routing;