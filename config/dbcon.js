const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongouri)

        console.log('Connected to MongoDB successfully');
    }catch (err){
        console.error(`Database connection error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;