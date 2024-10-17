/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import './FlowerPost.scss';

const FlowerPost = ({ isOpen, onClose, addFlower }) => {
  const flowerOptions = [
    { id: 1, name: 'Hydrangea', image: '/image/camtucaujpg.jpg' }, 
    { id: 2, name: 'Lisianthus', image: '/image/hoacattuong.jpg' }, 
    { id: 3 , name: 'Hibiscus', image: '/image/hoadambut.jpg' }, 
    { id: 4, name: 'Camellia', image: '/image/hoahaiduong.jpg' }, 
    { id: 5, name: ' Rose', image: '/image/hoahongdep.jpg' }, 
    { id: 6, name: 'White Rose', image: '/image/hoahongtrang.png' }, 
    { id: 7, name: 'Sunflower', image: '/image/hoahuongduong.jpg' }, 
    { id: 8, name: 'Gladiolus', image: '/image/hoalayon.jpg' }, 
    { id: 9, name: 'Peony', image: '/image/hoamaudon.jpg' }, 
    { id: 10, name: 'Jade flower', image: ' /image/hoangocbich.jpg' }, 
    { id: 11, name: 'Jasmine', image: '/image/hoanhai.jpg' }, 
    { id: 12, name: 'Lotus', image: '/image/hoasen .jpg' }, 
    { id: 13, name: 'Purple flower', image: '/image/hoatim.jpg' }, 
    { id: 14, name: 'Tulip flower', image: '/image/tulip.jpg ' }, 
    { id: 15, name: 'Wedding flower', image: '/image/weddingflower.jpg' },
  ];

  const [flower, setFlower] = useState({
    id: Date.now(),
    name: flowerOptions[0].name,
    description: '',
    status: 'available',
    price: '',
    image: flowerOptions[0].image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlower({
      ...flower,
      [name]: value,
    });
  };

  const handleFlowerChange = (e) => {
    const selectedFlower = flowerOptions.find((f) => f.name === e.target.value);
    setFlower({
      ...flower,
      name: selectedFlower.name,
      image: selectedFlower.image,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingFlowers = JSON.parse(localStorage.getItem('flowers')) || [];
    const newFlowers = [...existingFlowers, flower];
    localStorage.setItem('flowers', JSON.stringify(newFlowers));
    addFlower(flower);
    setFlower({
      id: Date.now(),
      name: flowerOptions[0].name,
      description: '',
      status: 'available',
      price: '',
      image: flowerOptions[0].image,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <form className="flower-post" onSubmit={handleSubmit}>
          <h2>Post Flower</h2>
          <select name="name" value={flower.name} onChange={handleFlowerChange}>
            {flowerOptions.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <input name="description" placeholder="Description" value={flower.description} onChange={handleInputChange} />
          <select name="status" value={flower.status} onChange={handleInputChange}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <input name="price" placeholder="Price" value={flower.price} onChange={handleInputChange} />
          {flower.image && <img src={flower.image} alt="Flower Preview" />}
          <button className="submit-btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default FlowerPost;
