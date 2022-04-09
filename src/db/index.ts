import mongoose, { Connection } from 'mongoose';

const { APP_DB_URI } = process.env;

export const connectDb = async (cb: (param: Connection) => void) => {
  cb(mongoose.connection);
  return mongoose.connect(APP_DB_URI);
};
