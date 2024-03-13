import connectToDB from './config/db.js';
import app from './app.js';
import { json } from 'express';

const port = 3000;


connectToDB();



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
