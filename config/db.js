import mongoose from "mongoose";



const connectToDB = async () => {
   try {
    const { connection } = await mongoose.connect(
      'mongodb+srv://vinay:22112002@cluster0.qyxgam9.mongodb.net/intern'|| `mongodb://127.0.0.1:27017/lms`
    );

    if (connection) {
      console.log(`Connected to MongoDB: ${connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;