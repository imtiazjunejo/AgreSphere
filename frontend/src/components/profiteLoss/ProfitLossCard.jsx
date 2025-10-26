import React from "react";

const ProfitLossCard = ({ crop }) => {
  const profitColor =
    crop.profit > 0 ? "bg-green-100" : crop.profit < 0 ? "bg-red-100" : "bg-gray-100";

  return (
    <div className={`${profitColor} p-4 rounded-xl shadow-sm`}>
      <h3 className="text-xl font-semibold text-gray-800">{crop.cropName}</h3>
      <p className="mt-2 text-gray-600">Revenue: PKR {crop.revenue}</p>
      <p className="text-gray-600">Expenses: PKR {crop.expenses}</p>
      <p className="font-bold mt-2">
        {crop.profit > 0 ? (
          <span className="text-green-700">Profit: +PKR {crop.profit}</span>
        ) : crop.profit < 0 ? (
          <span className="text-red-700">Loss: PKR {crop.profit}</span>
        ) : (
          <span className="text-gray-600">No Data</span>
        )}
      </p>
    </div>
  );
};

export default ProfitLossCard;
