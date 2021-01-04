const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dhaouiaziz13:Dhaoui2708@cluster0.cxxvc.mongodb.net/pointing?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("connected to db");
  } catch (error) {
    console.log("bummer an error happned while trying to connect to db");
  }
};

//********************************************
const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  points: Number,
  isadmin: Boolean,
});
/////////////////////////////////////////////////////////////////

const user = mongoose.model("users", usersSchema);

/////////////////////////////////////////////////////////////////
module.exports = {
  connectdb,
  user,
};
