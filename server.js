const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('uncaughtException 🛬 shutting down....');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');
//console.log('establishing connection');

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

//console.log(process.env);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port:${port}`);
});
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION 🛬 shutting down....');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});
