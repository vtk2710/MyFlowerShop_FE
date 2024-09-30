import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./HomePage/home";
import AdminPage from "./AdminPage/admin";
import UserPage from "./UserPage/user";
import SellerPage from "./SellerPage/seller";
import CreateProfilePage from "./CreateProfilePage/create_profile";
//import ShopPage from "./UserPage/user1";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin-page",
      element: <AdminPage />,
    },
    {
      path: "/user-page",
      element: <UserPage />,
    },
    {
      path: "/seller-page",
      element: <SellerPage />,
    },
    {
      path: "/create-profile",
      element: <CreateProfilePage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
