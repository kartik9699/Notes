const mongoose = require('mongoose');

const mongodb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Notes');
    console.log('Connected!');
    const UserData=await mongoose.connection.db.collection("users").find({}).toArray();
    const NotesData=await mongoose.connection.db.collection("notes").find({}).toArray();
  global.userdata=UserData;
  global.notes=NotesData;

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongodb;
