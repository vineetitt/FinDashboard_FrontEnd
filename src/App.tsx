/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from "react";
import mqtt, { IClientOptions } from "mqtt";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import AssetList from "./pages/AssetList";
import StockDetails from "./pages/StockDetails";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout";
import PlaceOrder from "./pages/PlaceOrder";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./components/SignUp";
import { stockContext } from "./context/StockContext";
import Holdings from "./pages/Holdings";
import SellHolding from "./pages/SellHolding";
import AdminPage from "./components/admin/AdminPage";
import AdminRoute from "./components/AdminRoute";

function App() {
  // const [authStatus, setAuthStatus] = useState(false);
  // setInterval(() => {
  //   setAuthStatus(useAuth().isAuthenticated);
  // }, 5000);
  const { updateAssetQuantity } = useContext(stockContext);

  useEffect(() => {
    // if(!authStatus)
    //   return;
    try {
      const options: IClientOptions = {
        host: "localhost",
        port: 9001,
      };

      const client = mqtt.connect("ws://localhost:9001", options);
      client.on("connect", () => {
        toast.success("Connected to broker");
        client.subscribe("stocks/#", { qos: 0 });
      });
      client.on("close", () => {
        client.end();
        toast.error("Disconnected to broker");
      });

      client.on("message", (topic: string, message: Buffer) => {
        const messageStr = message.toString();
        const jsonData = JSON.parse(messageStr);
        console.log(topic, " ", jsonData);

        if (topic === "stocks/sold") {
          const stockID = jsonData["StockId"];
          const updatedQuantity = jsonData["UpdatedQuantity"];
          updateAssetQuantity(stockID, updatedQuantity);
        }
      });
      client.on("error", (e: Error) => {
        client.end();
        throw new Error(e.message);
      });

      return () => {
        client.end();
      };
    } catch (ex) {
      if (ex instanceof Error) {
        toast.error(ex.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }, []);
  return (
    <>
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
          <Route
            path="/AdminPage"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
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
    </>
  );
}

export default App;
