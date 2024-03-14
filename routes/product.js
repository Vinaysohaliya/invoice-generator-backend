import { Router } from "express";
import fs from 'fs';
import PDFDocument from "pdfkit-table";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.post('/pdf', async (req, res) => {
  try {
    const inputData = req.body;

    // Define the output path for the generated PDF
    const outputPath = join(__dirname, "../document.pdf");

    let doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Pipe the PDF document to a writable stream
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    const productData = inputData.products.map(product => [
      product.name || 'null',
      product.qty.toString(),
      product.rate.toString(),
      product.total.toString(),
      product.gst.toString()
    ]);

    const tableData = {
      title: "Invoice",
      headers: ["Product", "Quantity", "Rate", "Total", "GST"],
      rows: productData
    };

    doc.table(tableData);

    doc.moveDown().text(`Grand Total: ${inputData.grandTotal}`, { align: 'right' });

    doc.end();

    // Wait for the PDF to finish writing
    writeStream.on('finish', () => {
      // Send the PDF file back to the client
      res.download(outputPath, 'invoice.pdf', (err) => {
        if (err) {
          console.error('Error sending PDF:', err);
          res.status(500).send('Error sending PDF');
        } else {
          // Delete the file from the server after sending it
          fs.unlink(outputPath, (err) => {
            if (err) {
              console.error('Error deleting PDF:', err);
            } else {
              console.log('PDF deleted successfully');
            }
          });
        }
      });
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

export default router;
