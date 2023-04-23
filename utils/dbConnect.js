import mongoose from 'mongoose';

const MONGODB_URI = process.env.DB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const connection = await mongoose.connect(MONGODB_URI, options);
  cachedConnection = connection;
  return connection;
}

export default connectToDatabase;
