const express = require("express");
const mongodb=require("./db");
const cors = require("cors");
const app = express();
const PORT = 4000;
mongodb();
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api",require("./Router/Addnotes"));
app.use("/api",require("./Router/Signup"));
app.use("/api",require("./Router/Login"));
app.use("/api",require("./Router/NotesData"));
app.use("/api",require("./Router/DeleteNotes"));
app.use("/api",require("./Router/EditNotes"));
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});