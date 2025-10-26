import React from "react";

const ProfitLossSummary = ({ totalSummary }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Overall Summary</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 text-lg font-medium">
        <div className="bg-green-100 rounded-lg py-4">
          <p>Total Revenue</p>
          <p className="text-green-700 font-bold">PKR {totalSummary.totalRevenue || 0}</p>
        </div>
        <div className="bg-red-100 rounded-lg py-4">
          <p>Total Expenses</p>
          <p className="text-red-700 font-bold">PKR {totalSummary.totalExpenses || 0}</p>
        </div>
        <div className="bg-yellow-100 rounded-lg py-4">
          <p>Total Profit</p>
          <p className="text-yellow-700 font-bold">PKR {totalSummary.totalProfit || 0}</p>
        </div>
        <div className="bg-blue-100 rounded-lg py-4">
          <p>Annual Growth</p>
          <p className="text-blue-700 font-bold">
            {totalSummary.annualGrowth || 0}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossSummary;
