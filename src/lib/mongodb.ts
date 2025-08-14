import { MongoClient, Db, Document, Collection } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URI as string | undefined;
const dbName = (process.env.MONGODB_DB as string | undefined) || 'rento';

if (!uri) {
  throw new Error('Missing MONGODB_URI. Set it in your environment variables.');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const c = await clientPromise;
  return c.db(dbName);
}

export async function getCollection<T extends Document = Document>(name: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}
