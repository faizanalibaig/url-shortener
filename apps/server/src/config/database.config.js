import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export default class DatabaseConfig {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }
      console.log('Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
      process.exit(1);
    }
  }
}
