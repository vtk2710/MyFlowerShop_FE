/* eslint-disable react/prop-types */
import { useState } from 'react';
import { DatePicker, notification } from 'antd'; // Import DatePicker from Ant Design
import './FlowerPost.scss';
import { postNewFlower } from '../../API/flower/create_modify_flower';

const FlowerPost = ({ isOpen, onClose }) => {
  const categories = ['Rose', 'Table', 'Orchid', 'Holiday', 'Birthday', 'Congratulate', 'Wedding'];

  // State to manage form data and validation
  const [selectCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [flower, setFlower] = useState({
    category: '',
    name: '',
    description: '',
    status: 'available',
    price: '',
    image: '',
    quantity: 1,
    date: '',
  });
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFlower((prev) => ({ ...prev, image: file }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlower((prevFlower) => ({
      ...prevFlower,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const input = e.target.value.replace(/,/g, "");
    if (!isNaN(input)) {
      setFlower((prevFlower) => ({ ...prevFlower, price: parseFloat(input).toLocaleString() }));
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFlower((prevFlower) => ({ ...prevFlower, category }));
    setError('');
  };

  const handleDateChange = (date, dateString) => {
    setFlower((prevFlower) => ({ ...prevFlower, date: dateString }));
  };

  const validateForm = () => {
    const { category, name, description, price, date, quantity } = flower;
    if (!category || !name || !description || !price || !date || !quantity) {
      return 'Please fill in all fields before submitting.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError); // Set error if validation fails
      return;
    }

    const formData = new FormData();
    formData.append("flowerName", flower.name); 
    formData.append("flowerDescription", flower.description);
    formData.append("price", flower.price.replace(/,/g, "")); 
    formData.append("availableQuantity", flower.quantity);
    formData.append("categoryName", selectCategory); 
    formData.append("status", flower.status); 

    if (selectedImage) {
      const imageFile = await fetch(selectedImage).then(res => res.blob());
      formData.append("image", imageFile, "flower-image.jpg"); // Append the image file with a name
    }

    try {
      console.log("Submitting new flower:", flower);
      const response = await postNewFlower(formData);
      onClose();
      notification.success({
        message: "Post new flower successfully !",
        duration: 2
      })
      
    } catch (error) {
      console.error("Submission error:", error);
      setError("An error occurred while submitting. Please try again.");
    }
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <form className="flower-post" onSubmit={handleSubmit}>
          <h2>Post Flower</h2>

          {error && <p className="error-message">{error}</p>}

          <select name="categoryName" value={selectCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>

          <input
            name="name"
            placeholder="Name"
            value={flower.name}
            onChange={handleInputChange}
            autoComplete="off"
          />

          <input
            name="description"
            placeholder="Description"
            value={flower.description}
            onChange={handleInputChange}
            autoComplete="off"
          />

          <div className="flower-preview">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected Flower" />
            ) : (
              <p>No image selected</p>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <select name="status" value={flower.status} onChange={(e) => setFlower({ ...flower, status: e.target.value })}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <input
            name="price"
            placeholder="Price"
            value={flower.price}
            onChange={handlePriceChange}
            autoComplete="off"
          />

          <select name="quantity" value={flower.quantity} onChange={(e) => setFlower({ ...flower, quantity: e.target.value })}>
            <option value="">Select Quantity</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>

          <DatePicker onChange={handleDateChange} style={{ width: '100%' }} />

          <button className="submit-btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default FlowerPost;
