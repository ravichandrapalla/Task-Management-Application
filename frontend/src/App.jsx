import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Auth from './pages/Auth';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  return (
    <>
        <Toaster
            position="top-right"
            toastOptions={{
            style: {
                fontSize: '1.8rem',
            },
            }}
        />
        
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>  
            <Route path="/auth" element={<Auth />} />
        </Routes>
    </>
  );
}
export default App;
