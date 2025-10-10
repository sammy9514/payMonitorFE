import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../page/Dashboard";
import { Layout } from "../static/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
