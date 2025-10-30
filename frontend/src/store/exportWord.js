import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx";
import { saveAs } from "file-saver";

export async function exportToWord(project, activities, distribution, saleAmount) {
  const rows = activities.map(
    (a) =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(a.date)] }),
          new TableCell({ children: [new Paragraph(a.activity)] }),
          new TableCell({ children: [new Paragraph(a.notes || "-")] }),
          new TableCell({ children: [new Paragraph(String(a.cost))] }),
        ],
      })
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [new TextRun({ text: `Crop Report: ${project.name}`, bold: true, size: 28 })] }),
          new Paragraph(`Season: ${project.season}`),
          new Paragraph(`Farming Type: ${project.farmingType}`),
          project.farmingType === "lease" ? new Paragraph(`Lease Amount: ${project.leaseAmount}`) : null,
          new Paragraph(`Landowner: ${project.landOwner}`),
          project.hasFarmer ? new Paragraph(`Farmers: ${project.farmers.join(", ")}`) : null,
          new Paragraph(" "),
          new Paragraph({ text: "Activities", bold: true }),
          new Table({ rows }),
          new Paragraph(" "),
          new Paragraph({ text: "Sale & Distribution", bold: true }),
          new Paragraph(`Gross Sale: ${saleAmount}`),
          new Paragraph(`Expenses: ${distribution.expensesSum}`),
          new Paragraph(`Net Profit: ${distribution.netProfit}`),
          new Paragraph(`Your Final Share: ${distribution.userFinal}`),
        ].filter(Boolean),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${project.name}_report.docx`);
}
