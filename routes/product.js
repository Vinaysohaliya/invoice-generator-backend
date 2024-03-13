import { Router } from "express";
import PDFDocument from 'pdfkit';
import fs from 'fs';

const router = Router();



router.post('/pdf', (req, res) => {
  console.log(req.body);


  try {
    
  } catch (error) {
    throw error;
  }


  const doc = new PDFDocument();

  const writeStream = fs.createWriteStream('output.pdf');
  doc.pipe(writeStream);

  doc.fontSize(20).text('Hello, PDFKit!', { align: 'center' });
  

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      console.log('PDF generated successfully');
      resolve();
    });
    writeStream.on('error', (err) => {
      reject(err);
    });
  });
});




export default router;