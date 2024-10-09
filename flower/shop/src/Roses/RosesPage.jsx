/* eslint-disable react/prop-types */
import { useState } from 'react';
//import Navbar from "./Navbar";
import "./RosesPage.scss"; // Liên kết với file SCSS cho styling
import { roseData } from "../Share/rose"; // Import dữ liệu từ rose.js
import Header from '../components/Header/header';
import { useNavigate } from 'react-router-dom';

const RosesPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Tính toán dữ liệu hiển thị trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = roseData.slice(indexOfFirstItem, indexOfLastItem);

  // console.log(roseData)
  // console.log(indexOfLastItem, indexOfFirstItem, currentItems);
  // console.log(currentItems[0])

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(roseData.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleOpen = (rose) => {
    // Điều hướng sang trang chi tiết sản phẩm
    navigate(`/viewflower/${rose.Id}`);
  };

  return (
    <>
      {/* <Navbar /> Hiển thị Navbar trong trang Roses */}
      <Header />
      <div className="roses-page">
        <h1>All Rose In Flatform</h1>
        <div className="modal-container">
          {currentItems.map((rose) => (
            <div key={rose.Id} className="modal-rose">
              <img src={rose.Image} alt={rose.Name} />
              <h1>{rose.Name}</h1>
              {/* Thêm nút View Details */}
              <button className="view-details-btn" onClick={() => handleOpen(rose)}>View Details</button>
            </div>
          ))}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={roseData.length}
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

export default RosesPage;
