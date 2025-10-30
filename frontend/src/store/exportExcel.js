import * as XLSX from "xlsx";

export function exportToExcel(project, activities, distribution, saleAmount) {
  const sheetData = [
    ["Crop Report"],
    ["Name", project.name],
    ["Season", project.season],
    ["Farming Type", project.farmingType],
    project.farmingType === "lease" ? ["Lease Amount", project.leaseAmount] : [],
    ["Landowner", project.landOwner],
    ["Farmers", project.hasFarmer ? project.farmers.join(", ") : "None"],
    [],
    ["Activities"],
    ["Date", "Activity", "Notes", "Cost"],
    ...activities.map((a) => [a.date, a.activity, a.notes, a.cost]),
    [],
    ["Sale & Distribution"],
    ["Gross Sale", saleAmount],
    ["Expenses", distribution.expensesSum],
    ["Net Profit", distribution.netProfit],
    project.farmingType === "partnership" ? ["Landowner (50%)", distribution.landOwnerShare] : [],
    project.farmingType !== "owner" && distribution.farmerTotalShare > 0 ? ["Farmers (25%)", distribution.farmerTotalShare] : [],
    ["Your Final Share", distribution.userFinal],
  ].filter((row) => row.length > 0);

  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Report");
  XLSX.writeFile(wb, `${project.name}_report.xlsx`);
}
