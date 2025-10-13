import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

const colors = ["#16a34a", "#dc2626", "#eab308", "#2563eb"];

const ProfitCharts = ({ cropProfits }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-center">Profit by Crop</h3>
        <BarChart width={450} height={300} data={cropProfits}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cropName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="profit" fill="#16a34a" />
        </BarChart>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-center">Expenses vs Revenue</h3>
        <PieChart width={450} height={300}>
          <Pie
            data={cropProfits}
            dataKey="expenses"
            nameKey="cropName"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#dc2626"
            label
          >
            {cropProfits.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default ProfitCharts;
