import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoUri = process.env['MONGO_URI'] || 'mongodb://localhost:27017/swiftdo';

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); 
  }
};

export default connectDB;