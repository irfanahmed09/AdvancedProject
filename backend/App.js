const express = require("express");
var config = require("./config/default.json");
const fs = require("fs");
const path = require("path");
//var cors = require("cors");
var multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
var mongoose = require("mongoose");

var env = config["development"];
var mongoURL = env.mongoURI;

//start app
const app = express();
//app.use(cors());

const connection = mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let storage = new GridFsStorage({
  db: connection,
  file: (req, file) => {
    let command = req.get("command_name");
    return {
      bucketName: "AudioRecords",
      filename: command,
      //Setting collection name, default name is fs
    };
  },
});

const upload = multer({ storage });

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
  res.send("Working fine");
});

app.get("/read-file", (req, res) => {
  fs.readFile(
    path.join(__dirname, "/dataset/commands.txt"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      var data_array = data.split(env.Delimiter);
      res.send(JSON.stringify(data_array));
    }
  );
});

const PORT = process.env.PORT || env.port;

app.post("/receive-audio", upload.single("audio_data"), (req, res) => {
  //console.log(req);
  return res
    .status(200)
    .send({ message: "Received blob successfully and Uploaded" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
