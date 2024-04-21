import mongoose from 'mongoose';

const connectMongoBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected to mongodb');
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoBD;