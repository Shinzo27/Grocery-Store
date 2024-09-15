import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: boolean
}

const MONGODB_URI : string = process.env.MONGODB_URI || ""
console.log(MONGODB_URI);
// if(!MONGODB_URI) throw new Error("MONGODB_URI is not set!")

interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

declare global {
    var mongooseCache: MongooseCache;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = {
        conn: null,
        promise: null,
    };
}

const connection : ConnectionObject = {}

async function connectDB() : Promise<mongoose.Connection> {
    if(cached.conn) {
        console.log("DB Already connected!");
        return cached.conn
    }

    if(!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB