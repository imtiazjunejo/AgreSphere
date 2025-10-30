// frontend/src/pages/ProfitLoss.jsx
import React, { useEffect } from "react";
import { useProfitLossStore } from "../store/useProfitLossStore";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ProfitLoss = () => {
  const { data, summary, fetchProfitLoss, loading, error } = useProfitLossStore();

  useEffect(() => {
    fetchProfitLoss();
  }, [fetchProfitLoss]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Profit & Loss Overview</h1>

      {/* Summary */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-green-700">Total Profit</h3>
            <p className="text-2xl font-bold text-green-800">
              ${summary.totalProfit.toLocaleString()}
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-red-700">Total Loss</h3>
            <p className="text-2xl font-bold text-red-800">
              ${summary.totalLoss.toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-blue-700">Net Balance</h3>
            <p className="text-2xl font-bold text-blue-800">
              ${summary.net.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Chart */}
      {data.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Profit Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cropName" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#16a34a" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Crop List */}
      <div className="grid gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{item.cropName}</h3>
              <p className="text-sm text-gray-500">
                {item.season} • {item.date}
              </p>
              <p>Revenue: ${item.revenue} | Expenses: ${item.expenses}</p>
              <p
                className={`font-semibold ${
                  item.profit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.profit >= 0 ? "Profit" : "Loss"}: ${item.profit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfitLoss;
