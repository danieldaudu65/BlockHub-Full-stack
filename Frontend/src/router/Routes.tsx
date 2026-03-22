// src/router.tsx
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Task from "../pages/Task";
import Dashboard from "../pages/components/Dashboard";
import TaskOverview from "../pages/TaskOverview";
import Submitted_task from "../pages/Submitted_task";
import Home1 from "../pages/UserProjectsHome";


const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home1 />,
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
    ],
  },

]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
