import jsPDF from "jspdf";
import "jspdf-autotable";

export function generateCropReport(project, activities, distribution, saleAmount) {
  const doc = new jsPDF();
  const fmt = (n) =>
    typeof n === "number"
      ? `Rs ${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : "Rs 0.00";

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`🌾 Crop Report`, 105, 20, { align: "center" });

  // Project Info
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Crop Name: ${project.name}`, 14, 35);
  doc.text(`Season: ${project.season}`, 14, 42);
  doc.text(`Farming Type: ${project.farmingType}`, 14, 49);
  if (project.farmingType === "lease") doc.text(`Lease Amount: ${fmt(project.leaseAmount)}`, 14, 56);
  doc.text(`Landowner: ${project.landOwner}`, 14, 63);
  if (project.hasFarmer && project.farmers.length > 0) {
    doc.text(`Farmers: ${project.farmers.join(", ")}`, 14, 70);
  }

  // Activities Table
  let currentY = project.hasFarmer ? 80 : 75;
  if (activities.length > 0) {
    doc.autoTable({
      startY: currentY,
      head: [["Date", "Activity", "Notes", "Cost"]],
      body: activities.map((a) => [a.date, a.activity, a.notes || "-", fmt(a.cost)]),
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133], halign: "center" },
      styles: { fontSize: 10 },
    });
    currentY = doc.lastAutoTable.finalY + 10;
  } else {
    doc.text("No activities recorded.", 14, currentY);
    currentY += 10;
  }

  // Distribution Table
  if (distribution) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("💰 Sale & Distribution", 14, currentY);
    doc.setFont("helvetica", "normal");

    const rows = [
      ["Gross Sale", fmt(Number(saleAmount || 0))],
      ["Expenses", fmt(distribution.expensesSum)],
      ["Net Profit", fmt(distribution.netProfit)],
    ];

    if (project.farmingType === "partnership") {
      rows.push(["Landowner (50%)", fmt(distribution.landOwnerShare)]);
      if (project.hasFarmer) rows.push(["Farmers (25%)", fmt(distribution.farmerTotalShare)]);
    }

    if (project.farmingType === "lease") {
      if (project.hasFarmer) rows.push(["Farmers (25%)", fmt(distribution.farmerTotalShare)]);
      rows.push(["Your Share before Lease", fmt(distribution.netProfit - distribution.farmerTotalShare)]);
      rows.push(["Lease Deduction", `- ${fmt(distribution.lease)}`]);
    }

    rows.push(["Your Final Share", fmt(distribution.userFinal)]);

    doc.autoTable({
      startY: currentY + 5,
      head: [["Description", "Amount"]],
      body: rows,
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185], halign: "center" },
      styles: { fontSize: 11 },
    });
  }

  doc.save(`${project.name}_report.pdf`);
}
 