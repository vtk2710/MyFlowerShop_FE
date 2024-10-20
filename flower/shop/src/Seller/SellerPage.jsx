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
  const [availableCount, setAvailableCount] = useState(() => {
    return JSON.parse(localStorage.getItem('availableCount')) || 0;
  });

  const [unavailableCount, setUnavailableCount] = useState(() => {
    return JSON.parse(localStorage.getItem('unavailableCount')) || 0;
  });

  // Hàm lưu dữ liệu vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('availableCount', JSON.stringify(availableCount));
  }, [availableCount]);

  useEffect(() => {
    localStorage.setItem('unavailableCount', JSON.stringify(unavailableCount));
  }, [unavailableCount]);

  // Thêm hoa vào danh sách
  const addFlower = (newFlower) => {
    const updatedFlowers = [...flowers, newFlower];
    setFlowers(updatedFlowers);
    localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
  };

  // Xóa hoa khỏi danh sách
  const deleteFlower = (id) => {
    const updatedFlowers = flowers.filter((flower) => flower.id !== id);
    setFlowers(updatedFlowers);
    localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
  };

  // Chỉnh sửa hoa trong danh sách
  const updateFlower = (updatedFlower) => {
    const updatedFlowers = flowers.map((flower) =>
      flower.id === updatedFlower.id ? updatedFlower : flower
    );
    setFlowers(updatedFlowers);
    localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
  };

  // Hàm tăng/giảm số lượng Available và Unavailable
  const incrementAvailable = () => setAvailableCount(availableCount + 1);
  const decrementUnavailable = () => setUnavailableCount(Math.max(unavailableCount - 1, 0));

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
                      <button onClick={incrementAvailable}>+</button>
                      <span>{availableCount}</span>
                      <button onClick={decrementUnavailable}>-</button>
                    </div>
                  </div>

                  {/* Unavailable Control */}
                  <div className="unavailable-control">
                    <label>Unavailable:</label>
                    <div className="number-box">
                      <button onClick={incrementAvailable}>+</button>
                      <span>{unavailableCount}</span>
                      <button onClick={decrementUnavailable}>-</button>
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


