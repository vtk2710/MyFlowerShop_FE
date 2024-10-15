/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useParams, useNavigate } from "react-router-dom";
import { Products } from "../../Share/Product";
import { Button, InputNumber, Pagination } from "antd";
import { useState, useRef, useEffect } from "react";
import "./SearchResultsPage.scss";
import Header from "../Header/header";
import Footer from "../../Home/footer/footer";

function SearchResultsPage() {
  const { searchTerm } = useParams(); // Lấy từ khóa từ URL
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const productSectionRef = useRef(null);
  const [minPrice, setMinPrice] = useState(0); // Giá min
  const [maxPrice, setMaxPrice] = useState(Infinity); // Giá max
  const [searchResults, setSearchResults] = useState(Products); // Trạng thái lưu kết quả tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState([]); // Trạng thái cho sản phẩm đã lọc theo giá

  // Hàm tìm kiếm sản phẩm theo từ khóa
  const searchProducts = () => {
    const searched = Products.filter((product) =>
      product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Searched Products:", searched);
    setSearchResults(searched);
    setFilteredProducts(searched);
  };

  // Hàm lọc sản phẩm theo khoảng giá từ kết quả tìm kiếm
  const filterByPrice = () => {
    console.log("Min Price:", minPrice, "Max Price:", maxPrice);

    const filtered = searchResults.filter((product) => {
      // Loại bỏ ký tự không phải số và chuyển đổi Price thành số
      const productPrice = Number(product.Price.replace(/[^0-9]/g, ""));
      return productPrice >= minPrice && productPrice <= maxPrice;
    });
    setFilteredProducts(filtered);
  };

  // Tìm kiếm sản phẩm khi từ khóa thay đổi
  useEffect(() => {
    searchProducts();
  }, [searchTerm]);

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
      <Header />
      <h2 style={{ marginTop: "100px" }}>Search Results for "{searchTerm}"</h2>

      {/* Chỉ hiển thị form lọc khi cần */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span>Min Price: </span>
        <InputNumber
          min={0}
          defaultValue={0}
          onChange={(value) => setMinPrice(value || 0)}
          style={{ width: "100px" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          } // Định dạng số
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")} // Parser cho đúng định dạng
        />
        <span>Max Price: </span>
        <InputNumber
          min={0}
          defaultValue={1000000}
          onChange={(value) => setMaxPrice(value || Infinity)}
          style={{ width: "100px" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />

        {/* Nút Lọc */}
        <Button
          type="primary"
          onClick={filterByPrice}
          style={{ padding: "0 20px", marginBottom: "20px", width: "100px" }}
        >
          Lọc
        </Button>
      </div>

      {/* Danh sách sản phẩm sau khi lọc */}
      <div className="row HomePage__body" ref={productSectionRef}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="product-card" key={product.Id}>
              <img src={product.Image} alt={product.Name} />
              <h3>{product.Name}</h3>
              <p>
                {product.Price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <Button
                type="primary"
                onClick={() => navigate(`/ViewPage/${product.Id}`)}
                style={{ marginTop: "10px", marginLeft: "100px" }}
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
      <Footer />
    </>
  );
}

export default SearchResultsPage;
