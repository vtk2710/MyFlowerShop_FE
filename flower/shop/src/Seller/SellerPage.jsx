import { useState } from 'react';
import FlowerList from '../components/FlowerList/FlowerList';
import OrderList from '../components/OrderList/OrderList';
import PriceManagement from '../components/PriceManagement/PriceManagement';
import CustomerSupport from '../components/CustomerSupport/CustomerSupport';
import FeedbackManagement from '../components/FeedbackManagement/FeedbackManagement';
import FlowerPost from '../components/FlowerPost/FlowerPost';
import Navbar from './Navbar';
import Sidebar from './Slidebar';
import './SellerPage.scss';

const SellerPage = () => {
  const [flowers, setFlowers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('flowers'); // Khớp với key trong Sidebar

  const avatarSrc = "./image/logo.jpg"; // Avatar image URL

//   const addFlower = (newFlower) => {
//     setFlowers([...flowers, newFlower]);
//   };

//   const deleteFlower = (id) => {
//     setFlowers(flowers.filter((flower) => flower.id !== id));
//   };

//   const updateFlower = (id, updatedFlower) => {
//     setFlowers(
//       flowers.map((flower) =>
//         flower.id === id ? { ...flower, ...updatedFlower } : flower
//       )
//     );
//   };

//   const filteredFlowers = flowers.filter((flower) =>
//     flower.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  return (
    <div className="seller-page">
      <Navbar avatarSrc={avatarSrc} />
      <div className="dashboard-container">
        <Sidebar setActiveSection={setActiveSection} avatarSrc={avatarSrc} />
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

// export default SellerPage;
