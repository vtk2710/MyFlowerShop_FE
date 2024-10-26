import { useState, useEffect } from 'react';
import FlowerList from './FlowerList/FlowerList';
import OrderList from './OrderList/OrderList';
import PriceManagement from './PriceManagement/PriceManagement';
import CustomerSupport from './CustomerSupport/CustomerSupport';
import FeedbackManagement from './FeedbackManagement/FeedbackManagement';
import FlowerPost from './FlowerPost/FlowerPost';
import Navbar from './Navbar';
import Sidebar from './Slidebar';
import './SellerPage.scss';
import axios from 'axios';

const SellerPage = () => {
  const location = useLocation();
  const { activeSection: initialActiveSection, feedback } = location.state || {};
  const [activeSection, setActiveSection] = useState(initialActiveSection || 'flowers');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  //const [activeSection, setActiveSection] = useState('flowers'); // Khớp với key trong Sidebar
  const [userInfo, setUserInfo] = useState(); 

  // State quản lý danh sách hoa
  const [flowers, setFlowers] = useState(JSON.parse(localStorage.getItem('flowers')) || []);

  // State quản lý số lượng Available và Unavailable
  const [availableCount, setAvailableCount] = useState(0);
  const [unavailableCount, setUnavailableCount] = useState(0);
  // Hàm lấy thông tin user từ API
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token is undefined. User might not be logged in.");
      return;
    }
    try {
      const response = await axios.get(
        "https://localhost:7198/api/UserInfo/info",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
    console.log(userInfo);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // State quản lý số lượng Available và Unavailable, lấy từ localStorage nếu có
  // const [availableCount, setAvailableCount] = useState(() => {
  //   return JSON.parse(localStorage.getItem('availableCount')) || 0;
  // });

  // State cho total product và total quantity
  const [totalProducts, setTotalProducts] = useState(0);  // Thêm state cho Total Products
  const [totalQuantity, setTotalQuantity] = useState(0);  // Thêm state cho Total Quantity

  // Hàm tự động cập nhật số lượng hoa Available, Unavailable, Total Products, và Total Quantity dựa trên danh sách hoa
  useEffect(() => {
    const availableFlowers = flowers.filter(flower => flower.status === 'available').length;
    const unavailableFlowers = flowers.filter(flower => flower.status === 'unavailable').length;
  
    const totalProductsCount = flowers.length; // Tính tổng số sản phẩm
    const totalQuantityCount = flowers.reduce((sum, flower) => sum + Number(flower.quantity || 0), 0); // Tính tổng số lượng hoa và đảm bảo giá trị là số
  
    setAvailableCount(availableFlowers);
    setUnavailableCount(unavailableFlowers);
    setTotalProducts(totalProductsCount);  // Cập nhật total product
    setTotalQuantity(totalQuantityCount);  // Cập nhật total quantity
  
    // Lưu số lượng vào localStorage (tùy chọn)
    localStorage.setItem('availableCount', JSON.stringify(availableFlowers));
    localStorage.setItem('unavailableCount', JSON.stringify(unavailableFlowers));
    localStorage.setItem('totalProducts', JSON.stringify(totalProductsCount));  // Lưu total product vào localStorage
    localStorage.setItem('totalQuantity', JSON.stringify(totalQuantityCount));  // Lưu total quantity vào localStorage
  
  }, [flowers]);
  

  // Thêm hoa vào danh sách
  const addFlower = (newFlower) => {
    const updatedFlowers = [...flowers, newFlower];
    setFlowers(updatedFlowers);
    localStorage.setItem('flowers', JSON.stringify(updatedFlowers)); // Lưu danh sách hoa vào localStorage
  };

  // Xóa hoa khỏi danh sách
  const deleteFlower = (id) => {
    const updatedFlowers = flowers.filter((flower) => flower.id !== id);
    setFlowers(updatedFlowers);
    localStorage.setItem('flowers', JSON.stringify(updatedFlowers)); // Lưu danh sách hoa vào localStorage
  };

  // Chỉnh sửa hoa trong danh sách
  const updateFlower = (updatedFlower) => {
    const updatedFlowers = flowers.map((flower) =>
      flower.id === updatedFlower.id ? updatedFlower : flower
    );
    setFlowers(updatedFlowers);
    localStorage.setItem('flowers', JSON.stringify(updatedFlowers)); // Lưu danh sách hoa vào localStorage
  };

  const avatarSrc = "./image/logo.jpg"; 

  return (
    <div className="seller-page">
      <Navbar avatarSrc={userInfo?.avatar} />
      <div className="dashboard-container">
        <Sidebar setActiveSection={setActiveSection} avatarSrc={userInfo?.avatar} />
        <div className="content">
          {activeSection === 'flowers' && (
            <>
              <div className="action-bar">
                <button onClick={() => setIsModalOpen(true)}>Post Flower</button>
                <input type="text" placeholder="Search Flower..." />
                <div className="status-controls">
                  {/* Available Control */}
                  <div className="available-control">
                    <label>Available:</label>
                    <div className="number-box">
                      <span>{availableCount}</span>
                    </div>
                  </div>

                  {/* Unavailable Control */}
                  <div className="unavailable-control">
                    <label>Unavailable:</label>
                    <div className="number-box">
                      <span>{unavailableCount}</span>
                    </div>
                  </div>

                  {/* Total Products Control */}
                  <div className="total-products-control">
                    <label>Total Products:</label>
                    <div className="number-box">
                      <span>{totalProducts}</span>
                    </div>
                  </div>

                  {/* Total Quantity Control */}
                  <div className="total-quantity-control">
                    <label>Total Quantity:</label>
                    <div className="number-box">
                      <span>{totalQuantity}</span>
                    </div>
                  </div>
                </div>
              </div>
              <FlowerPost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addFlower={addFlower} />
              <FlowerList flowers={flowers} deleteFlower={deleteFlower} updateFlower={updateFlower} />
            </>
          )}
          {activeSection === 'orders' && <OrderList />}
          {activeSection === 'feedback' && <FeedbackManagement feedback={feedback} />} {/* Nhận dữ liệu từ FeedbackPage */}
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
//   return (
//     <div className="seller-page">
//       <Navbar avatarSrc={avatarSrc} />
//       <div className="dashboard-container">
//         <Sidebar setActiveSection={setActiveSection} avatarSrc={avatarSrc} />
//         <div className="content">
//           {activeSection === 'flowers' && (
//             <>
//               <div className="action-bar">
//                 <button onClick={() => setIsModalOpen(true)}>Post Flower</button>
//                 <input
//                   type="text"
//                   placeholder="Search Flower..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="search-input"
//                 />
//               </div>
//               <FlowerPost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addFlower={addFlower} />
//               <FlowerList flowers={filteredFlowers} deleteFlower={deleteFlower} updateFlower={updateFlower} />
//             </>
//           )}
//           {activeSection === 'orders' && <OrderList />}
//           {activeSection === 'prices' && <PriceManagement />}
//           {activeSection === 'customerSupport' && <CustomerSupport />}
//           {activeSection === 'feedback' && <FeedbackManagement />}
//         </div>
//       </div>
//     </div>
//   );
// };


