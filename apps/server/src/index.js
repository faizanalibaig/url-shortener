import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import DatabaseConfig from './config/database.config.js';
import { router as shortenerRouter } from './modules/shortener/shortener.routes.js';

dotenv.config();
new DatabaseConfig();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/shortener', shortenerRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API');
});

app.listen(PORT, () => {
  console.log(`Server port: ${PORT}`);
});
