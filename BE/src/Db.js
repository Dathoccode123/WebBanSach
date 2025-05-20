import mongoose from 'mongoose'


async function connectDB(){
    const url = 'mongodb://localhost:27017/bookstore'

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;