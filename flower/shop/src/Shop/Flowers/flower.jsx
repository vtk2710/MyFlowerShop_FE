/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col, Card, Spin, Alert } from "antd";
import Header from "../../components/Header/header";
import "./flower.scss";
import axios from "axios";

function Flowers() {
  const { id } = useParams();
  const [flowerList, setFlowerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getListFlower = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7198/api/Category/${id}/flowers`
      );
      return Array.isArray(response.data) && response.data.length > 0
        ? response.data
        : [];
    } catch (error) {
      console.error("Error fetching flower list:", error);
      setError("Failed to fetch flowers. Please try again later.");
      return [];
    }
  };

  useEffect(() => {
    const fetchFlowers = async () => {
      setLoading(true);
      const flowers = await getListFlower();
      setFlowerList(flowers);
      setLoading(false);
    };

    fetchFlowers();
  }, [id]);

  if (loading) {
    return <Spin size="large" />; // Hiển thị spinner khi đang tải
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  if (flowerList.length === 0) {
    return (
      <Alert
        message="No flowers found for this category."
        type="info"
        showIcon
      />
    );
  }

  const handleOpen = (flower) => {
    navigate(`/viewflower/${flower.flowerId}`);
  };

  return (
    <>
      <Header />
      <Row gutter={16} className="flower-list">
        {flowerList.map((flower) => (
          <Col span={8} key={flower.flowerId}>
            <div className="product-card">
              {" "}
              <Card
                hoverable
                cover={<img src={flower.imageUrl} alt={flower.flowerName} />}
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleOpen(flower)}
                    style={{ margin: "10px 85px" }}
                  >
                    View Details
                  </Button>
                ]}
              >
                <Card.Meta
                  title={flower.flowerName}
                  description={`Price: ${flower.price}`}
                />
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Flowers;
