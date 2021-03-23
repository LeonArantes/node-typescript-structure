import express from 'express';
import '@controllers/UsersController';
import mongoose from '@config/dbConfig';
import cors from 'cors';
import helmet from 'helmet';
import routes from '@routes/user';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 8001;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Authorization',
      'Token',
    ],
  }),
);
app.use(helmet());

app.use('/user', routes);

app.listen(PORT, async () => {
  try {
    await mongoose.connect();
    console.log(`Listening on port: ${PORT}`);
    console.log('Database connected...');
  } catch (error) {
    console.error(error);
    throw error;
  }
});
