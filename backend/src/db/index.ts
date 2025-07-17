import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://ramchodhry02355:manish@cluster0.ajhs9.mongodb.net/';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'test'
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;