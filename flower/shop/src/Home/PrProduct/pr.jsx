import { useNavigate } from "react-router-dom";
import { Products } from "../../Share/Product";
import { Button } from "antd";
import "./pr.scss";

function PrProduct() {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleOpen = (product) => {
    // Điều hướng sang trang chi tiết sản phẩm
    navigate(`/ViewPage/${product.Id}`);
  };

  return (
    <div className="row HomePage__body">
      <h2>All HOT FLOWERS IN SHOP</h2>
      {Products.map((product) => (
        <div className="product-card" key={product.Id}>
          <img src={product.Image} alt={product.Name} />
          <br />
          <h3>{product.Name}</h3>
          <br />
          <Button
            type="primary" // Sử dụng kiểu "primary"
            onClick={() => handleOpen(product)} // Điều hướng sang trang chi tiết sản phẩm
            style={{ marginTop: "10px" }}
          >
            View Details
          </Button>
        </div>
      ))}
    </div>
  );
}

export default PrProduct;
