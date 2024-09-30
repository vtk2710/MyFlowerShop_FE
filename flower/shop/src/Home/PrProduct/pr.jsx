import { useState } from "react";
import { Products } from "../../Share/Product";
import { Button, Modal } from "antd";

import "./pr.scss";
function PrProduct() {
  const [pro, setPro] = useState({});
  const [visible, setVisible] = useState(false);

  const handleOpen = (pro) => {
    setPro(pro);
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
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
            type="secondary"
            onClick={() => handleOpen(product)}
            style={{ marginTop: "10px" }}
          >
            View Details
          </Button>
        </div>
      ))}
      <Modal
        title="Information About Flower"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="ok"
            type="secondary"
            onClick={handleOk}
            size="small"
            className="info-modal__button"
          >
            OK
          </Button>,
        ]}
      >
        <div className="info-modal__img">
          <img src={pro.Image} alt={pro.Name} />
        </div>
        <div className="info-modal__content">
          {/* <p>
            <strong>Id: {pro.Id}</strong>
          </p> */}
          <p>
            <strong className="shop-name">Shop: {pro.ShopName}</strong>
          </p>

          <p>
            <strong>Name: {pro.Name}</strong>
          </p>
          <p>
            <strong>Origin: {pro.Origin}</strong>
          </p>
          <p>
            <strong>Description: {pro.Description}</strong>
          </p>
          <p style={{ textAlign: "center" }}>Price: {pro.Price}</p>
        </div>
      </Modal>
    </div>
  );
}

export default PrProduct;
