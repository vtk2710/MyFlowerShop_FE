import { useState } from 'react';
import FlowerList from '../components/FlowerList/FlowerList';
import OrderList from '../components/OrderList/OrderList';
import PriceManagement from '../components/PriceManagement/PriceManagement';
import CustomerSupport from '../components/CustomerSupport/CustomerSupport';
import FeedbackManagement from '../components/FeedbackManagement/FeedbackManagement';
import FlowerPost from '../components/FlowerPost/FlowerPost';
import Navbar from './Navbar'; // Import navbar
import './SellerPage.scss';

const SellerPage = () => {
  const [flowers, setFlowers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      {/* Thêm Navbar */}
      <Navbar sellerName="John Doe" />

      {/* Add Flower Button và Search Input */}
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

      {/* Modal for posting flowers */}
      <FlowerPost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addFlower={addFlower} />

      {/* Danh sách bài đăng hoa và chỉnh sửa */}
      <FlowerList flowers={filteredFlowers} deleteFlower={deleteFlower} updateFlower={updateFlower} />

      <OrderList />
      <PriceManagement />
      <CustomerSupport />
      <FeedbackManagement />
    </div>
  );
};

export default SellerPage;
