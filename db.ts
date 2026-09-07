import mongoose from "mongoose";

const url = process.env.NEXT_MONGODB_URL as string | undefined;

if (!url) {
  console.warn("Missing NEXT_MONGODB_URL environment variable — connectDB will throw when called.");
}


type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalAny: any = global;

if (!globalAny._mongooseCache) {
  globalAny._mongooseCache = { conn: null, promise: null } as MongooseCache;
}

const cached: MongooseCache = globalAny._mongooseCache;

const connectDB = async () => {
  if (!url) {
    throw new Error("Missing NEXT_MONGODB_URL environment variable");
  }
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(url, { autoIndex: false })
      .then((m) => {
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
export default connectDB;