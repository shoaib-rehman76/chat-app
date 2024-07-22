const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connection established!');
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDb
