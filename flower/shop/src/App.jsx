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
    {
      path: "/admin",
      element: <Admin />,
      // Các route con của "/admin"
      children: [
        {
          path: "dashboard1", // Đường dẫn cho Dashboard 1
          element: <Dashboard1 />,
        },
        {
          path: "dashboard2", // Đường dẫn cho Dashboard 1
          element: <Dashboard2 />,
        },
        {
          path: "manageuser", // Đường dẫn cho Dashboard 2
          element: <UserManage />, // Thay bằng component Dashboard2 của bạn
        },
        {
          path: "ReportAdmin", // Đường dẫn cho Dashboard 3
          element: <ReportAdmin />, // Thay bằng component Dashboard3 của bạn
        },
      ],
    },
    {
      path: "/ViewPage/:id",
      element: <ProductPage />,
    },
    {
      path: "*",
      element: <div>404 Not Found</div>, // Trang 404 nếu đường dẫn không hợp lệ
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
