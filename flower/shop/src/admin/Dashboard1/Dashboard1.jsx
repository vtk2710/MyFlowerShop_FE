import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Products } from "../../Share/Product";
import FlowerDonutChart from "../Donut/Donut";

// Hàm để chuyển đổi dữ liệu cho biểu đồ
const transformDataForChart = (products) => {
  return products.map((product) => {
    // Chuyển đổi giá "400,000 VND" thành 400000 (dạng số)
    const numericPrice = parseInt(product.Price.replace(/\D/g, ""), 10);
    return {
      name: product.Name, // Tên của loại hoa
      price: numericPrice, // Giá dạng số
    };
  });
};

const Dashboard1 = () => {
  const data = transformDataForChart(Products); // Gọi hàm chuyển đổi dữ liệu

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Flower Sales Data</h1>

      {/* Flexbox container để hiển thị cả hai biểu đồ cạnh nhau */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Biểu đồ cột */}
        <div style={{ width: "60%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Donut */}
        <div style={{ width: "35%", height: 400 }}>
          <FlowerDonutChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
