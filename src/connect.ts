import mongoose from 'mongoose';

type TInput = {
  url: string;
};

export default ({ url }: TInput) => {
  const connect = () => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.info('Successfully connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to database: ', error);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
};
