import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/login';
import Homepage from './pages/Homepage';

const Routing=()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route 
            path='/'
            element={
                <Login/>
            }
            />
             <Route 
            path='/Homepage'
            element={
                <Homepage/>
            }
            />
        </Routes>
        </BrowserRouter>
    )
}
export default Routing;