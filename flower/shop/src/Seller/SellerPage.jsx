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
  const [flowers, setFlowers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('flowers'); // Khớp với key trong Sidebar
  const [userInfo, setUserInfo] = useState(); 

  const avatarSrc = "./image/logo.jpg"; // Avatar image URL

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

  const addFlower = (newFlower) => {
    setFlowers([...flowers, newFlower]);
  };

  const deleteFlower = (id) => {
    setFlowers(flowers.filter((flower) => flower.id !== id));
  };

  const updateFlower = (id, updatedFlower) => {
    setFlowers(
      flowers.map((flower) =>
        flower.id === id ? { ...flower, ...updatedFlower } : flower
      )
    );
  };

  const filteredFlowers = flowers.filter((flower) =>
    flower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <input
                  type="text"
                  placeholder="Search Flower..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <FlowerPost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addFlower={addFlower} />
              <FlowerList flowers={filteredFlowers} deleteFlower={deleteFlower} updateFlower={updateFlower} />
            </>
          )}
          {activeSection === 'orders' && <OrderList />}
          {activeSection === 'prices' && <PriceManagement />}
          {activeSection === 'customerSupport' && <CustomerSupport />}
          {activeSection === 'feedback' && <FeedbackManagement />}
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


