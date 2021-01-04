const { response } = require("express");
const express = require("express");
const router = express.Router();
const { user } = require("../DB/index");
//////////////////////////////////////////////////
//returning the list of users whenever needed
router.get("/data", (req, res) => {
  user.find({}, function (err, docs) {
    if (!err) {
      res.json(docs);
    }
  });
});
////////////////////////////////////////////////////
//handeling the login
router.post("/login", (req, res) => {
  user.findOne({ username: req.body.email }, (err, docs) => {
    if (!err) {
      try {
        if (req.body.pass === docs.password) {
          res.json(docs);
        }
      } catch (error) {
        console.log("user not found");
      }
    }
  });
});
///////////////////////////////////////////////////////
//finding the points for each user
router.post("/userscore", (req, res) => {
  user.findOne({ username: req.body.username }, (err, doc) => {
    try {
      res.json(doc.points);
    } catch (error) {}
  });
});
////////////////////////////////////////////////////////////
//updating user score
router.post("/scorepluplus", async (req, res) => {
  const query = { username: req.body.name };
  let score;
  await user.findOne({ username: req.body.name }, (err, data) => {
    if (!err) {
      score = data.points + 1;
    }
  });

  await user.findOneAndUpdate(
    query,
    { $set: { points: score } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log("updated");
    }
  );
});
//////////////////////////////////////////////////////////////////
//adding users
router.post("/adduser", (req, res) => {
  user.create({
    username: req.body.name,
    password: req.body.pass,
    isadmin: false,
    points: 0,
  });
});
/////////////////////////////////////////////////////////////////
//deleting users
router.post("/delete", (req, res) => {
  user.findOneAndDelete({ _id: req.body.id }, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
  });
});
module.exports = router;
