const mongoose = require("mongoose");


  mongoose.set('strictQuery', false)
mongoose.connect(``)
  .then(() => console.log("Connected to db"))
  .catch((error) => console.log(`Something went wrong ${error}`));