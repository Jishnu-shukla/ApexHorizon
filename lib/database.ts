import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}
const MongoURI = process.env.MONGODB_URI

if(!MongoURI) {
    throw new Error("Database string not found in env!");
}

export async function connectToDatabase(): Promise<void> {
    if(connection.isConnected) {
        console.log("Already connected to database!")
        return
    }

    try {
        const db = await mongoose.connect(MongoURI!)

        connection.isConnected = db.connections[0].readyState

        console.log("Database connected successfully!")
    } catch (error) {
        console.log("Database connection failed: ", error)
        process.exit(1)
    }
}