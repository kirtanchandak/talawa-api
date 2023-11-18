import "dotenv/config";
import mongoose from "mongoose";
import { MONGO_DB_URL } from "../../src/constants";

// Returns a mongoose instance to the testing database
export async function connect(
  dbName = "TALAWA_API_TEST_DATABASE"
): Promise<typeof mongoose> {
  return await mongoose.connect(MONGO_DB_URL as string, {
    dbName,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  });
}

export async function dropAllCollectionsFromDatabase(
  mongooseInstance: typeof mongoose
): Promise<void> {
  const collections = await mongooseInstance.connection.db.collections();

  for (const collection of collections) {
    await collection.drop();
  }
}

export async function dropDatabase(
  mongooseInstance: typeof mongoose
): Promise<void> {
  await mongooseInstance.connection.db.dropDatabase();
}

// Disconnects from the provided mongoose instance
export async function disconnect(
  mongooseInstance: typeof mongoose
): Promise<void> {
  await mongooseInstance.connection.close();
}
