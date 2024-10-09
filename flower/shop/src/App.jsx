import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./HomePage/home";
import Admin from "./AdminPage/admin";
import UserPage from "./UserPage/user";
import SellerPage from "./SellerPage/seller";
import CreateProfilePage from "./CreateProfilePage/create_profile";
//import ShopPage from "./UserPage/user1";
import Dashboard1 from "./admin/Dashboard1/Dashboard1";
import UserManage from "./admin/UserManage/UserManage";
import ReportAdmin from "./admin/ReportAdmin/ReportAdmin";
import Dashboard2 from "./admin/CustomerFeedbackRadarChart/CustomerFeedbackRadarChart";
import ProductPage from "./ViewProduct/viewpage";
import Flowers from "./Shop/Flowers/flower";
import FlowerPage from "./Shop/FlowerDetails/viewflower";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      path: "/viewflower/:id",
      element: <FlowerPage />,
    },
    {
      path: "/flowers/:id",
      element: <Flowers />,
    },
    {
      path: "*",
      element: <div>404 Not Found</div>, // Trang 404 nếu đường dẫn không hợp lệ
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
