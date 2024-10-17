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
import CheckoutPage from "./CheckOut/CheckoutPage";
import UserDetail from "./admin/UserDetail/UserDetail";
import SearchResultsPage from "./components/SearchResultsPage/SearchResultsPage";
import SellerManage from "./admin/SellerManage/SellerManage";
import CategoryManage from "./admin/CategoryManage/CategoryManage";

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
          element: <UserManage />,
        },
        {
          path: "ReportAdmin", // Đường dẫn cho Dashboard 3
          element: <ReportAdmin />, // Component tương ứng với route này
        },
        {
          path: "SellersManage", // Đường dẫn cho Dashboard 3
          element: <SellerManage />, // Component tương ứng với route này
        },
        {
          path: "CategoryManage", // Đường dẫn cho Dashboard 3
          element: <CategoryManage />, // Component tương ứng với route này
        },
      ],
    },
    {
      path: "/search/:searchTerm", // Đường dẫn cho trang kết quả tìm kiếm
      element: <SearchResultsPage />,
    },
    {
      path: "/userdetail/:id", // Đường dẫn mới cho trang thông tin người dùng
      element: <UserDetail />,
    },
    {
      path: "/ViewPage/:id",
      element: <ProductPage />,
    },
    {
      path: "/checkout", // Đường dẫn mới cho trang checkout
      element: <CheckoutPage />, // Component trang checkout
    },
    {
      path: "*",
      element: (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="./picture/4044.png"
            alt="404 Not Found"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ), // Trang 404 nếu đường dẫn không hợp lệ
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
