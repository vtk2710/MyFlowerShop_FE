import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './OrderPayment.scss';

const App = () => {
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  const handleOrderHistoryClick = () => {
    navigate('/orderhistory'); // Chuyển hướng đến trang /orderhistory
  };

  const handleShoppingClick = () => {
    navigate('/homepage'); //Chuyển hướng đến trang /homepage
  };

  return (
    <div className="outer-rectangle">
      <div className="outer-container">
        <div className="inner-container">
          <h2 className="success-text">Checkout successfully</h2>
          <div className="button-group">
            <button className="status-btn" onClick={handleOrderHistoryClick}>
              View order history
            </button>
            <button className="shopping-btn" onClick={handleShoppingClick}>
                Continue shoppingshopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
