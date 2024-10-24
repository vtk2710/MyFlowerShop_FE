/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useParams, useNavigate } from "react-router-dom";
import { Button, InputNumber, Pagination } from "antd";
import { useState, useRef, useEffect } from "react";
import "./SearchResultsPage.scss";
import Header from "../Header/header";
import Footer from "../../Home/footer/footer";
import axios from "axios";

function SearchResultsPage() {
  const { searchTerm } = useParams(); // Lấy từ khóa từ URL
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const flowersPerPage = 9;
  const flowerSectionRef = useRef(null); // Tham chiếu đến phần tử flowerSection
  const [minPrice, setMinPrice] = useState(0); // Giá min
  const [maxPrice, setMaxPrice] = useState(Infinity); // Giá max
  const [searchResults, setSearchResults] = useState([]); // Trạng thái lưu kết quả tìm kiếm hoa
  const [filteredFlowers, setFilteredFlowers] = useState([]); // Trạng thái cho hoa đã lọc theo giá

  // Hàm tìm kiếm hoa
  const searchFlowers = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7198/api/Search/${searchTerm}` // Đảm bảo URL đúng
      );
      console.log("API response data:", response); // Log toàn bộ dữ liệu API trả về
      setSearchResults(response.data);
      setFilteredFlowers(response.data.$values);
    } catch (error) {
      console.error(
        "Error fetching search results:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Hàm lọc hoa theo khoảng giá từ kết quả tìm kiếm
  const filterByPrice = async () => {
    try {
      // Kiểm tra minPrice và maxPrice trước khi gọi API
      console.log("Min Price:", minPrice, "Max Price:", maxPrice);

      // Gọi API với giá trị minPrice và maxPrice động
      const response = await axios.get(
        `https://localhost:7198/api/FlowerInfo/GetFlowersByPrice?price1=${minPrice}&price2=${maxPrice}`
      );

      // Log kết quả trả về để kiểm tra dữ liệu
      console.log("API response data:", response.data);

      // Cập nhật trạng thái với kết quả trả về từ API
      setSearchResults(response.data);
      setFilteredFlowers(response.data.$values); // Nếu response có định dạng chứa $values
    } catch (error) {
      // Xử lý lỗi nếu xảy ra khi gọi API
      console.error(
        "Error fetching filtered search results:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Tìm kiếm hoa khi từ khóa thay đổi
  useEffect(() => {
    searchFlowers();
  }, [searchTerm]);

  // Phân trang hoa
  const indexOfLastFlower = currentPage * flowersPerPage;
  const indexOfFirstFlower = indexOfLastFlower - flowersPerPage;
  const currentFlowers = filteredFlowers.slice(
    indexOfFirstFlower,
    indexOfLastFlower
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (flowerSectionRef.current) {
      flowerSectionRef.current.scrollIntoView({
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

      {/* Danh sách hoa sau khi lọc */}
      <div className="row HomePage__body" ref={flowerSectionRef}>
        {currentFlowers.length > 0 ? (
          currentFlowers.map((flower) => (
            <div className="flower-card" key={flower.flowerId}>
              <img src={flower.imageUrl} alt={flower.flowerName} />
              <h3>{flower.flowerName}</h3>
              <p>
                {flower.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <Button
                type="primary"
                onClick={() => navigate(`/viewflower/${flower.flowerId}`)}
                style={{ marginTop: "10px", marginLeft: "90px" }}
              >
                View Details
              </Button>
            </div>
          ))
        ) : (
          <p>No flowers found.</p>
        )}
      </div>

      {/* Phân trang nếu có nhiều hoa */}
      {filteredFlowers.length > flowersPerPage && (
        <Pagination
          current={currentPage}
          pageSize={flowersPerPage}
          total={filteredFlowers.length}
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
