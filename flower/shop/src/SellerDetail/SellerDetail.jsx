/* eslint-disable react/prop-types */
import { useState } from 'react'; // Import React and useState
import { useParams } from 'react-router-dom'; // Import useParams to get sellerId from URL
import { ShoppingCartOutlined, CalendarOutlined, EnvironmentOutlined, InfoCircleOutlined, TagsOutlined } from '@ant-design/icons'; // Import Ant Design icons
import "./SellerDetail.scss"; // Custom SCSS for styling
import { sellerData } from "../Share/seller"; // Import seller data

const SellerDetail = () => {
  const { sellerId } = useParams(); // Lấy sellerId từ URL
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Tìm seller với sellerId từ URL
  const seller = sellerData.find(seller => seller.Id === parseInt(sellerId));

  if (!seller) {
    return <div>Seller not found</div>; // Hiển thị thông báo nếu không tìm thấy seller
  }

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = seller.products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(seller.products.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="seller-page">
      {/* Shop Details Section */}
      <div className="seller-details-container">
        <div className="seller-logo-container">
          <img src={seller.logo} alt="Shop Logo" className="seller-logo" />
        </div>
        <div className="seller-details">
          <h1>{seller.name}</h1>
          <div className="seller-info">
            <span>
              <EnvironmentOutlined /> Address: <span>{seller.address}</span>
            </span>
            <span>
              <ShoppingCartOutlined /> Products: <span>{seller.products.length}</span>
            </span>
            <span>
              <TagsOutlined /> Type: <span>{seller.type}</span>
            </span>
            <span>
              <CalendarOutlined /> Created At: <span>{seller.created_at}</span>
            </span>
            <span>
              <CalendarOutlined /> Updated At: <span>{seller.updated_at}</span>
            </span>
            <span>
              <InfoCircleOutlined /> Role: <span>{seller.role}</span>
            </span>
          </div>
          <div className="seller-introduction">
            <h3>
              <InfoCircleOutlined /> Introduction:
            </h3>
            <p>{seller.introduction}</p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <h2>All Products from {seller.name}</h2>

        {/* Product Grid Section */}
        <div className="product-grid">
          {currentItems.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={seller.products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

// Pagination Component
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

export default SellerDetail;
