const { connectdb } = require("./DB/index");

const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));
connectdb();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
