import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from "docx";

export async function exportToPDF({ project, activities, saleAmount, distribution }) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Crop Project Report: ${project.name}`, 14, 20);

  doc.setFontSize(12);
  doc.text(`Season: ${project.season}`, 14, 30);
  doc.text(`Farming Type: ${project.farmingType}`, 14, 38);
  if (project.farmingType === "lease") doc.text(`Lease: Rs ${project.leaseAmount}`, 14, 46);
  if (project.hasFarmer) doc.text(`Farmers: ${project.farmers.join(", ")}`, 14, 54);

  // Activities Table
  autoTable(doc, {
    startY: 65,
    head: [["Date", "Activity", "Notes", "Cost"]],
    body: activities.map((a) => [a.date, a.activity, a.notes, `Rs ${a.cost}`]),
  });

  // Distribution Section
  const distY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text("Distribution", 14, distY);
  doc.setFontSize(12);
  doc.text(`Gross Sale: Rs ${saleAmount}`, 14, distY + 8);
  doc.text(`Net Profit: Rs ${distribution.netProfit}`, 14, distY + 16);
  doc.text(`Your Final Share: Rs ${distribution.userFinal}`, 14, distY + 24);

  doc.save("Crop-Report.pdf");
}

export async function exportToWord({ project, activities, saleAmount, distribution }) {
  const rows = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Date")] }),
        new TableCell({ children: [new Paragraph("Activity")] }),
        new TableCell({ children: [new Paragraph("Notes")] }),
        new TableCell({ children: [new Paragraph("Cost")] }),
      ],
    }),
    ...activities.map(
      (a) =>
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(a.date)] }),
            new TableCell({ children: [new Paragraph(a.activity)] }),
            new TableCell({ children: [new Paragraph(a.notes)] }),
            new TableCell({ children: [new Paragraph(`Rs ${a.cost}`)] }),
          ],
        })
    ),
  ];

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: `Crop Project: ${project.name}`, heading: "Heading1" }),
          new Paragraph(`Season: ${project.season}`),
          new Paragraph(`Farming Type: ${project.farmingType}`),
          project.farmingType === "lease" && new Paragraph(`Lease: Rs ${project.leaseAmount}`),
          project.hasFarmer && new Paragraph(`Farmers: ${project.farmers.join(", ")}`),
          new Paragraph({ text: "Activities", heading: "Heading2" }),
          new Table({ rows }),
          new Paragraph({ text: "Distribution", heading: "Heading2" }),
          new Paragraph(`Gross Sale: Rs ${saleAmount}`),
          new Paragraph(`Net Profit: Rs ${distribution.netProfit}`),
          new Paragraph(`Your Final Share: Rs ${distribution.userFinal}`),
        ].filter(Boolean),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Crop-Report.docx");
}

export async function exportToExcel({ project, activities, saleAmount, distribution }) {
  const ws = XLSX.utils.json_to_sheet(
    activities.map((a) => ({
      Date: a.date,
      Activity: a.activity,
      Notes: a.notes,
      Cost: a.cost,
    }))
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Activities");

  // Add Summary Sheet
  const summaryData = [
    ["Project", project.name],
    ["Season", project.season],
    ["Farming Type", project.farmingType],
    project.farmingType === "lease" ? ["Lease", project.leaseAmount] : null,
    ["Gross Sale", saleAmount],
    ["Net Profit", distribution.netProfit],
    ["Final Share", distribution.userFinal],
  ].filter(Boolean);

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

  XLSX.writeFile(wb, "Crop-Report.xlsx");
}
