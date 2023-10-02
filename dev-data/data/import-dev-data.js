const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => 'DB connection successful');

//READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Tour.create(tours); //create can also accept an array of objects
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//console.log(process.argv);

//Delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany(); //this will delete all the documents in the collection
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);
if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--import') {
  importData();
}
