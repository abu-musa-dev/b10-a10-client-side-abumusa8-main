// src/index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home";
import Campaigns from "./components/AddNewCampaign/AddNewCampaign";
import Details from "./components/Details/Details";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Login/Register";
import Dashboard from "./Dashboard/Dashboard";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import MyDonations from "./components/MyDonations/MyDonations";
import AllCampaigns from "./components/AllCampaigns/AllCampaigns";
import Mycamping from "./components/MyCamping/Mycamping";
import RunningCampaigns from "./components/RunningCampaigns/RunningCampaigns";
import CampaignDetails from "./components/CampaignDetails/CampaignDetails";
// import AddNewCampaign from './components/AddNewCampaign/AddNewCampaign';
import UpdateCampaign from "./components/UpdateCampaign/UpdateCampaign";
import AddNewCampaign from "./components/AddNewCampaign/AddNewCampaign";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home Page
  },
  {
    path: "/home",
    element: <Home />, // Home Page
  },
  {
    path: "/allcamping",
    element: <AllCampaigns></AllCampaigns>, // Home Page
  },
  {
    path: "/mycamping",
    element: (
      <PrivateRoute>
        <Mycamping />
      </PrivateRoute>
    ), // My Campaigns Page
  },
  

  {
    path: "/my-donations",
    element: (<MyDonations></MyDonations> )// Home Page
  },
  {
    path: "/",
    element: <RunningCampaigns></RunningCampaigns>, // Home Page
  },
 
  {
    path: "/campaign/:id",
    element: (
      <PrivateRoute>
        <CampaignDetails/>
      </PrivateRoute>
    ), // Update Campaign Page
  },

  {
    path: "/updateCampaign/:id",
    element: (
      <PrivateRoute>
        <UpdateCampaign />
      </PrivateRoute>
    ), // Update Campaign Page
  },
  

  {
    path: "AddNewCampaign",
    element: <AddNewCampaign></AddNewCampaign>, // Campaigns Page
  },
  // {
  //   path: "/campings",
  //   element: <AddNewCampaign></AddNewCampaign>
  // },

  {
    path: "/campaigns/:id",
    element: (
      <PrivateRoute>
        <Details />
      </PrivateRoute>
    ), // Campaign Details Page
  },
  {
    path: "/login",
    element: <Login />, // Login Page
  },
  {
    path: "/register",
    element: <Register />, // Register Page
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>, // Register Page
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ), // Dashboard Page
  },
  {
    path: "/update-profile",
    element: (
      <PrivateRoute>
        <UpdateProfile />
      </PrivateRoute>
    ), // Update Profile Page
  },
  {
    path: "*", // Invalid Routes
    element: <NotFound />, // 404 Page
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
