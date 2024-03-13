import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './routes/auth.js'
import productRouter from './routes/product.js'


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/user/', userRouter);
app.use('/api/v1/product/',productRouter)

export default app;
