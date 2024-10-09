import { useState } from 'react';
import './PriceManagement.scss';

const PriceManagement = () => {
  const [priceList, setPriceList] = useState([
    { id: 1, flower: 'Rose', price: '480000', event: 'Valentine\'s Day' },
    { id: 2, flower: 'White Rose', price: '360000', event: 'Wedding' },
    { id: 3, flower: 'Hydrangea', price: '240000', event: 'Mother\'s Day' },
    { id: 4, flower: 'Lisianthus', price: '600000', event: 'Graduation' },
    { id: 5, flower: 'Hibiscus', price: '672000', event: 'Festival' },
    { id: 6, flower: 'Camellia', price: '96000', event: 'Anniversary' },
    { id: 7, flower: 'Sunflower', price: '504000', event: 'Summer Party' },
    { id: 8, flower: 'Peony', price: '840000', event: 'Spring Festival' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const filteredPriceList = priceList.filter((item) =>
    item.flower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updatePrice = (id) => {
    setPriceList((prevPriceList) =>
      prevPriceList.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
    setNewPrice('');
    setSelectedFlower(null);
    alert('Price updated successfully!');
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="price-management">
      <h2>Manage Prices (VND)</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a flower..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="flower-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (VND)</th>
            <th>Event</th> {/* Cột mới để hiển thị sự kiện */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPriceList.map((item) => (
            <tr key={item.id}>
              <td>{item.flower}</td>
              <td>{formatPrice(item.price)} VND</td>
              <td>{item.event}</td> {/* Hiển thị sự kiện */}
              <td>
                <button className="edit-button" onClick={() => setSelectedFlower(item)}>
                  New Price
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFlower && (
        <div className="modal">
          <h3>Update Price for {selectedFlower.flower}</h3>
          <input
            type="text"
            placeholder="New Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button className="update-button" onClick={() => updatePrice(selectedFlower.id)}>Update</button>
          <button className="cancel-button" onClick={() => setSelectedFlower(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PriceManagement;
