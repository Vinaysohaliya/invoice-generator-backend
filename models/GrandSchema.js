import mongoose from "mongoose";
import { Product } from "./Product.js";


const GrandTotalSchema = new mongoose.Schema({
    products: [Product], 
    grandTotal: {
      type: Number,
      required: true
    }
  });

const GrandTotal = mongoose.model('GrandTotal', GrandTotalSchema);

export default GrandTotal;