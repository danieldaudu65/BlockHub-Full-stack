// src/router.tsx
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Task from "../pages/Task";
import Login from "../pages/Login";
import Verify from "../pages/Verify";
import Dashboard from "../components/Dashboard";
import TaskOverview from "../pages/TaskOverview";
import Submitted_task from "../pages/Submitted_task";
import Ambassador from "../pages/Ambassador";


const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        index: true, 
        element: <Dashboard />
      },
      {
        path: "task",
        element: <Task />,
        children: [
           {
            index: true,
            element: <Navigate to="overview" replace /> 
          },
          {
            path: "overview",
            element: <TaskOverview />
          },
          {
            path: "submitted",
            element: <Submitted_task />
          },
        ]
      },
      {
        path: 'ambassadors',
        element: <Ambassador />
      }
    ],
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/verify-otp',
    element: <Verify />
  }

]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
