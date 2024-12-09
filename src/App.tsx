import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import AssetList from "./pages/AssetList";
import StockDetails from "./pages/StockDetails";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import Logout from "./pages/Logout";
import PlaceOrder from "./pages/PlaceOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./components/SignUp";
import { StockProvider } from "./context/StockContext";
import Holdings from "./pages/Holdings";
import SellHolding from "./pages/SellHolding";

function App() {
  return (
    <AuthProvider>
      <StockProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Signup" element={<SignUp />}></Route>
            <Route
              path="/AssetList"
              element={
                <PrivateRoute>
                  <AssetList />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/StockDetails/:symbol"
              element={<StockDetails />}
            ></Route>
            <Route
              path="/Portfolio"
              element={
                <PrivateRoute>
                  <Portfolio />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/Holdings"
              element={
                <PrivateRoute>
                  <Holdings />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/Placeorder/:symbol"
              element={
                <PrivateRoute>
                  <PlaceOrder />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/SellHolding/:stockName/:currentPrice/:stockId"
              element={
                <PrivateRoute>
                  <SellHolding />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/Logout" element={<Logout />}></Route>
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
      </StockProvider>
    </AuthProvider>
  );
}

export default App;
