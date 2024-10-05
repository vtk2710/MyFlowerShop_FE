import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Customer feedback data
const feedbackData = [
  {
    subject: "Flower Quality",
    A: 85, // Customer rating (out of 100)
    fullMark: 100,
  },
  {
    subject: "Customer Service",
    A: 75,
    fullMark: 100,
  },
  {
    subject: "Delivery Time",
    A: 90,
    fullMark: 100,
  },
  {
    subject: "Pricing",
    A: 70,
    fullMark: 100,
  },
  {
    subject: "Overall Satisfaction",
    A: 80,
    fullMark: 100,
  },
];

const Dashboard2 = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Customer Feedback Radar Chart</h2>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={feedbackData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" /> {/* Criteria names */}
          <PolarRadiusAxis angle={30} domain={[0, 100]} />{" "}
          {/* Value range from 0 - 100 */}
          <Radar
            name="Customer"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard2;
