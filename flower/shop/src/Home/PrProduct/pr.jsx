import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../../Share/Product";
import { Button, Pagination } from "antd";
import "./pr.scss";

function PrProduct() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Tạo ref để tham chiếu đến phần tử chứa danh sách sản phẩm
  const productSectionRef = useRef(null);

  // Lấy danh sách sản phẩm cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleOpen = (product) => {
    if (product && product.Id) {
      navigate(`/ViewPage/${product.Id}`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Cuộn lên đầu phần chứa các card sản phẩm khi người dùng chuyển trang
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <h2>All HOT FLOWERS IN SHOP</h2>
      <div className="row HomePage__body" ref={productSectionRef}>
        {currentProducts.map((product) => (
          <div className="product-card" key={product.Id}>
            <img src={product.Image} alt={product.Name} />
            <h3>{product.Name}</h3>
            <Button
              type="primary"
              onClick={() => handleOpen(product)}
              style={{ marginTop: "10px", marginLeft: "90px" }}
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
      {/* Phân trang sử dụng Ant Design */}
      <Pagination
        current={currentPage}
        pageSize={productsPerPage}
        total={Products.length}
        onChange={handlePageChange}
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </>
  );
}

export default PrProduct;
