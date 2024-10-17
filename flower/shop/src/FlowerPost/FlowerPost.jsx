/* eslint-disable react/prop-types */
import { useState } from 'react';
import { DatePicker } from 'antd'; // Import DatePicker từ Ant Design
import './FlowerPost.scss';
import { roseData } from '../../Share/rose'; // Import flower data
import { tableFlowerData } from '../../Share/table';
import { orchidFlowerData } from '../../Share/orchid';
import { holidayFlowerData } from '../../Share/holiday';
import { birthdayFlowerData } from '../../Share/birthday';
import { congratulateFlowerData } from '../../Share/congratulate';
import { weddingFlowersData } from '../../Share/wedding';

const FlowerPost = ({ isOpen, onClose, addFlower }) => {
  // Available roles to choose
  const roles = ['Rose', 'Table Flower', 'Orchid', 'Holiday', 'Birthday', 'Congratulate', 'Wedding'];

  // State to manage selected role and corresponding flower list
  const [selectedRole, setSelectedRole] = useState('');
  const [flowerOptions, setFlowerOptions] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [flower, setFlower] = useState({
    id: Date.now(),
    role: '',
    name: '',
    description: '',
    status: 'available',
    price: '',
    image: '',
    shopName: '',
    quantity: 1, // Default quantity
    date: '', // Date input
  });

  const [error, setError] = useState(''); // State to store error message

  // Update flower list when a role is selected
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setFlower({ ...flower, role });
    setError(''); // Clear error when a role is selected

    // Filter flowers based on the role
    let filteredFlowers = [];
    switch (role) {
      case 'Rose':
        filteredFlowers = roseData;
        break;
      case 'Table Flower':
        filteredFlowers = tableFlowerData;
        break;
      case 'Orchid':
        filteredFlowers = orchidFlowerData;
        break;
      case 'Holiday':
        filteredFlowers = holidayFlowerData;
        break;
      case 'Birthday':
        filteredFlowers = birthdayFlowerData;
        break;
      case 'Congratulate':
        filteredFlowers = congratulateFlowerData;
        break;
      case 'Wedding':
        filteredFlowers = weddingFlowersData;
        break;
      default:
        filteredFlowers = [];
    }

    setFlowerOptions(filteredFlowers);
    setSelectedFlower(null); // Reset selected flower when changing role
  };

  // Handle flower selection based on role
  const handleFlowerChange = (e) => {
    const selectedFlowerId = e.target.value;
    const selectedFlower = flowerOptions.find(f => f.Id.toString() === selectedFlowerId);

    if (selectedFlower) {
      setSelectedFlower(selectedFlower);
      setFlower({
        ...flower,
        name: selectedFlower.Name,
        image: selectedFlower.Image,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if role is selected
    if (!selectedRole) {
      setError('Please select a role before adding the flower.');
      return;
    }

    const newFlower = { 
      ...flower, 
      id: Date.now(),
      price: parseFloat(flower.price.replace(/,/g, '')) || 0 // Convert price to number
    }; 

    addFlower(newFlower);

    // Reset form fields after submission
    setFlower({
      id: Date.now(),
      role: '',
      name: '',
      description: '',
      status: 'available',
      price: '',
      image: '',
      shopName: '',
      quantity: 1, // Default quantity
      date: '', // Reset date input
    });

    // Reset selected role and flower options
    setSelectedRole('');
    setFlowerOptions([]);
    setSelectedFlower(null);

    onClose(); // Close modal if necessary
  };

  // Date handling for Ant Design DatePicker
  const handleDateChange = (date, dateString) => {
    setFlower({ ...flower, date: dateString });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <form className="flower-post" onSubmit={handleSubmit}>
          <h2>Post Flower</h2>

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          {/* Select role */}
          <select name="role" value={selectedRole} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>

          {/* Display flower list after role selection */}
          {selectedRole && flowerOptions.length > 0 && (
            <select name="flower" value={selectedFlower?.Id || ''} onChange={handleFlowerChange}>
              <option value="">Select Flower</option>
              {flowerOptions.map(option => (
                <option key={option.Id} value={option.Id}>
                  {option.Name}
                </option>
              ))}
            </select>
          )}

          {/* Display selected flower image */}
          {selectedFlower && (
            <div className="flower-preview">
              <img src={selectedFlower.Image} alt={selectedFlower.Name} />
            </div>
          )}

          {/* Input description */}
          <input
            name="description"
            placeholder="Description"
            value={flower.description}
            onChange={(e) => setFlower({ ...flower, description: e.target.value })}
          />

          {/* Input status */}
          <select name="status" value={flower.status} onChange={(e) => setFlower({ ...flower, status: e.target.value })}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          {/* Input price */}
          <input
            name="price"
            placeholder="Price"
            value={flower.price}
            onChange={(e) => setFlower({ ...flower, price: e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') })}
          />

          {/* Input shop name */}
          <input
            name="shopName"
            placeholder="Shop Name"
            value={flower.shopName}
            onChange={(e) => setFlower({ ...flower, shopName: e.target.value })}
          />

          {/* Select quantity */}
          <select name="quantity" value={flower.quantity} onChange={(e) => setFlower({ ...flower, quantity: e.target.value })}>
            <option value="">Select Quantity</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>

          {/* Ant Design DatePicker */}
          <DatePicker onChange={handleDateChange} />

          {/* Submit button */}
          <button className="submit-btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default FlowerPost;
