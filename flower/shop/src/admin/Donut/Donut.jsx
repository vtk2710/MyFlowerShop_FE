import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Dữ liệu về hoa
const data = [
  { name: "Lotus Flower", value: 30 },
  { name: "Tulip", value: 20 },
  { name: "Sunflower", value: 25 },
  { name: "Rose", value: 15 },
  { name: "Orchid", value: 10 },
];

// Mảng màu sắc để tô màu cho từng phần
const colors = ["#FF7F50", "#FFBB28", "#00C49F", "#FF8042", "#0088FE"];

const FlowerDonutChart = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Biểu đồ Donut */}
      <PieChart width={300} height={300}>
        <Pie
          data={data} // Dữ liệu biểu đồ
          cx="50%" // Vị trí ngang
          cy="50%" // Vị trí dọc
          outerRadius={80} // Bán kính ngoài của biểu đồ
          label // Hiển thị nhãn (tên loại hoa)
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {/* Tooltip hiển thị khi di chuột */}
        <Tooltip />
      </PieChart>

      {/* Custom Legend (chú thích tùy chỉnh) */}
      <div style={{ marginLeft: "20px" }}>
        <h3>Flower Sales Data</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.map((entry, index) => (
            <li
              key={`legend-${index}`}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Ô màu sắc */}
              <span
                style={{
                  width: "15px",
                  height: "15px",
                  display: "inline-block",
                  backgroundColor: colors[index % colors.length],
                  marginRight: "10px",
                }}
              ></span>
              {/* Tên hoa */}
              {entry.name}: {entry.value}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlowerDonutChart;
