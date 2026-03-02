import { createBrowserRouter } from "react-router-dom";
import ResourcesPage from "./pages/ResourcesPage";
import CreateResourcePage from "./pages/CreateResourcePage";
import EditResourcePage from "./pages/EditResourcePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ResourcesPage />,
  },
  {
    path: "/create",
    element: <CreateResourcePage />,
  },
  { path: "/edit/:id", element: <EditResourcePage /> },
]);
