import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import AssetList from './pages/AssetList';
import StockDetails from './pages/StockDetails';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';
import Logout from './pages/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/SignUp';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Login/>}></Route>
        <Route path='/Signup' element= {<SignUp/>}></Route>
        {/* <Route element={< />}> */}
        <Route path='/AssetList' element= {<PrivateRoute><AssetList/></PrivateRoute>}></Route>
        <Route path='/StockDetails/:symbol' element= {<StockDetails/>}></Route>
        <Route path='/Portfolio' element= {<PrivateRoute><Portfolio/></PrivateRoute>}></Route>
        <Route path='/Logout' element= {<Logout/>}></Route>
        {/* </Route>  */}
        
      </Routes>
    </Router>
    <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  )
}

export default App
