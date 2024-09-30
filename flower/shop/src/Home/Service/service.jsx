import "./service.scss";
import { Image } from "antd"; // Correct import for antd Image component

function Service() {
  return (
    <div className="service-section">
      {" "}
      {/* Đặt đúng tên class */}
      <h2>Our Offers</h2> {/* Thay đổi tiêu đề thành Our Offers */}
      <div className="service-row">
        <div className="service-content">
          <Image
            src="/picture/xe-hoa-ha-noi-01.jpg"
            alt="Beautiful bouquet of flowers with a discount voucher"
            preview={false} // Disable preview if not needed
            className="service-image" // Optional: add class for styling
          />
        </div>
        <div className="service-text">
          <h3>Special Offer</h3>
          <h1>Discount Vouchers</h1>
          <p>
            Take advantage of our exclusive discount vouchers. Save up to 50% on
            your next bouquet with our limited-time offers. Make your gift even
            more special at a lower price.
          </p>
          <button className="subscribe-btn">Get Voucher Now</button>
        </div>
      </div>
    </div>
  );
}

export default Service;
