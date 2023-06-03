import mongoose from 'mongoose';
import { config } from './config/config';

export class DB {
  public static async init() {
    try {
      await mongoose.connect(config.dbUrl, {
        retryWrites: true,
        w: 'majority'
      });
      console.log('Connected to database');
    } catch (error) {
      console.log(error, 'Error connecting to database');
    }
  }
}
