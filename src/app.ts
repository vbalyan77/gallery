import express, { Application, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { ApiError } from './errors/ApiError';
import { authRouter } from './routes/auth';
import { galleryRouter } from './routes/gallery';
import 'dotenv/config';

const app: Application = express();
const port: any = 3000 || process.env.PORT;

mongoose.connect(`mongodb://localhost:27017/testTasks`);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', authRouter);
app.use('/gallery', galleryRouter);

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500).json(new ApiError(err, err.status || 500));
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️ Server is running on port ${port}!`);
});
