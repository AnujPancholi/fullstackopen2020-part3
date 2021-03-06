"use strict";

const Mongoose = require("mongoose");



const DB_CONFIG = {
  URI: `mongodb+srv://m001-student:${process.argv[2] || ""}@cluster0-a1zxz.mongodb.net/fullstackopen_phonebook?retryWrites=true&w=majority`
}


const run = async() => {


  try{
    if(!process.argv[2]){
      throw new Error("NO PASSWORD DETECTED")
    }

    Mongoose.connect(DB_CONFIG.URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const EntrySchema = new Mongoose.Schema({
      "name": String,
      "phoneNumber": String
    })

    const Entry = Mongoose.model('Entry',EntrySchema);

    if(process.argv[3] && process.argv[4]){

      const entryToAdd = new Entry({
        name: process.argv[3],
        phoneNumber: process.argv[4]
      })

      const entrySaveResult = await entryToAdd.save();
      // console.log(entrySaveResult);

      console.log("Entry Saved");
    } else {
      const allEntriesResult = await Entry.find({});

      // console.log(typeof(allEntriesResult),Array.isArray(allEntriesResult));

      allEntriesResult.forEach((entry) => {
        console.log(entry);
      })
    }

    Mongoose.connection.close();

  }catch(e){
    console.error(`ERROR: `,e);

    process.exit(1);

  }
}


run();