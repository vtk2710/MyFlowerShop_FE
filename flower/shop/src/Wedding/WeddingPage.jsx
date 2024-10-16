/* eslint-disable react/prop-types */
import { useState } from 'react';
import Navbar from "./Navbar";
import "./WeddingPage.scss"; // Liên kết với file SCSS cho styling
import { weddingFlowersData } from "../Share/wedding"; // Import dữ liệu hoa cưới từ weddingFlowers.js
import Header from '../components/Header/header';

const WeddingFlowersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Tính toán dữ liệu hiển thị trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = weddingFlowersData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(weddingFlowersData.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <Header/>
      <div className="roses-page">
        <h1>All Wedding Flowers</h1>
        <div className="modal-container">
          {currentItems.map((flower) => (
            <div key={flower.Id} className="modal">
              <img src={flower.Image} alt={flower.Name} />
              <h1>{flower.Name}</h1>
              {/* Thêm nút View Details */}
              <button className="view-details-btn" onClick={() => alert(`Viewing details for ${flower.Name}`)}>View Details</button>
            </div>
          ))}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={weddingFlowersData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        <li onClick={() => paginate(currentPage - 1)} className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a href="#!" className="page-link">&laquo;</a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a href="#!" className="page-link">{number}</a>
          </li>
        ))}
        <li onClick={() => paginate(currentPage + 1)} className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a href="#!" className="page-link">&raquo;</a>
        </li>
      </ul>
    </nav>
  );
};

export default WeddingFlowersPage;
