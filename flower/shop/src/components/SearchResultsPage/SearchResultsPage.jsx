/* eslint-disable react/no-unescaped-entities */
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng
import { Products } from "../../Share/Product";
import { Button, Pagination } from "antd";
import { useState, useRef } from "react";
import "./SearchResultsPage.scss";
import Header from "../Header/header";
import Footer from "../../Home/footer/footer";

function SearchResultsPage() {
  const { searchTerm } = useParams(); // Lấy từ khóa từ URL
  const navigate = useNavigate(); // Sử dụng navigate để điều hướng
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const productSectionRef = useRef(null);

  // Lọc các sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = Products.filter(product =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang sản phẩm
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
<>
<Header/> 
<h2 style={{marginTop:"100px"}}>Search Results for "{searchTerm}"</h2>

    <div className="row HomePage__body" ref={productSectionRef}>
     
    
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="product-card" key={product.Id}>
              <img src={product.Image} alt={product.Name} />
              <h3>{product.Name}</h3>
              <Button
                type="primary"
                onClick={() => navigate(`/ViewPage/${product.Id}`)} // Sử dụng navigate để điều hướng
                style={{ marginTop: "10px",marginLeft:"100px" }}
              >
                View Details
              </Button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      

    
    </div>
      {/* Phân trang nếu có nhiều sản phẩm */}
      {filteredProducts.length > productsPerPage && (
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={filteredProducts.length}
          onChange={handlePageChange}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    <Footer/>
    </>
  );
  
}

export default SearchResultsPage;
