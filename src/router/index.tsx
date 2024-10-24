import {
  createBrowserRouter,
  Navigate
} from "react-router-dom";
import Proceed from "../pages/Proceed/Proceed";
import Generate from "../pages/Generate/Generate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/generate" replace />
  },
  {
    path: "/proceed",
    element: <Proceed />
  },
  {
    path: "/generate",
    element: <Generate />
  },
]);


export default router;