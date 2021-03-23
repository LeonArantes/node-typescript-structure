import mongoose from 'mongoose';

const connect = async () =>
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

export default { mongoose, connect };
