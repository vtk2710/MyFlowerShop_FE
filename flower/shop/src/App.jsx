import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./HomePage/home";
import Admin from "./AdminPage/admin";
import UserPage from "./UserPages/UserPage";
import CreateProfilePage from "./CreateProfilePage/create_profile";
import Dashboard1 from "./AdminPage/Dashboard1/Dashboard1";
import UserManage from "./AdminPage/UserManage/UserManage";
import ReportAdmin from "./ReportAdmin/ReportAdmin";
import Dashboard2 from "./AdminPage/CustomerFeedbackRadarChart/CustomerFeedbackRadarChart";
import ProductPage from "./ViewProduct/viewpage";
import CheckoutPage from "./CheckOut/CheckoutPage";
import Flowers from "./Shop/Flowers/flower";
import FlowerPage from "./Shop/FlowerDetails/viewflower";
import RosesPage from "./Flowers/FlowerPage";
import UserDetail from "./AdminPage/UserDetail/UserDetail";
import SearchResultsPage from "./components/SearchResultsPage/SearchResultsPage";
import SellerManage from "./AdminPage/SellerManage/SellerManage";
import CategoryManage from "./AdminPage/CategoryManage/CategoryManage";
import OrderSuccessPage from "./OrderSuccess/OrderSuccessPage";
import SellerRegisterPage from "./SellerRegister/sellerRegister";

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
    {
      path: "/flower/:id",
      element: <Flowers />,
    },
    {
      path: "/viewflower/:id",
      element: <FlowerPage />,
    },
    {
      path: "flowers/:categoryName",
      element: <RosesPage />,
    },
    {
      path: "order-success",
      element: <OrderSuccessPage/>
    },
    {
      path: "/seller-register",
      element: <SellerRegisterPage/>
    },
    {
      path: "*",
      element: <div>404 Not Found</div>, // Trang 404 nếu đường dẫn không hợp lệ
    }, 
  ]);

  return <RouterProvider router={router} />;
}

export default App;
