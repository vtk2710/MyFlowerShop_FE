import { useEffect, useState } from 'react';
import "./RosesPage.scss"; // Liên kết với file SCSS cho styling
import Header from '../components/Header/header';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFlowerList, fetchFlowerListByCategoryName } from '../API/flower/get_flower_list';

const RosesPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [flowerList, setFlowerList] = useState([]);
  const itemsPerPage = 6;

  // Tính toán dữ liệu hiển thị trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = flowerList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(flowerList.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleOpen = (flower) => {
    // Điều hướng sang trang chi tiết sản phẩm
    navigate(`/viewflower/${flower.flowerId}`);
  };

  useEffect(() => {
    fetchFlowerListByCategoryName(categoryName).then((data) => setFlowerList(data.$values));
    setCurrentPage(1);
  }, [categoryName]);

  return (
    <>
      {/* <Navbar /> Hiển thị Navbar trong trang Roses */}
      <Header />
      <div className="roses-page">
        {/* <h1>All Rose In Flatform</h1> */}
        <div className="modal-container">
          {currentItems.map((flower) => (
            <div key={flower.flowerId} className="modal-rose">
              <img src={flower.imageUrl} alt={flower.flowerName} />
              <h1>{flower.flowerName}</h1>
              {/* Thêm nút View Details */}
              <button className="view-details-btn" onClick={() => handleOpen(flower)}>View Details</button>
            </div>
          ))}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={flowerList.length}
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
          <span className="page-link">&laquo;</span>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <span className="page-link">{number}</span>
          </li>
        ))}
        <li onClick={() => paginate(currentPage + 1)} className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <span className="page-link">&raquo;</span>
        </li>
      </ul>
    </nav>
  );
};

export default RosesPage;
