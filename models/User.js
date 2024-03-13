import mongoose from 'mongoose';
import { Product } from './Product.js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  product:[
    {
    type:mongoose.Types.ObjectId,
    ref:Product
    }    
  ]
});

const User = mongoose.model('User', UserSchema);

export default User;
