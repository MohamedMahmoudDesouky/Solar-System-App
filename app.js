require('dotenv').config();

const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String
});

const planetModel = mongoose.model('planets', dataSchema);

app.post('/planet', function(req, res) {

  const planetId = Number(req.body.id);

  planetModel.findOne({ id: planetId }, function(err, planetData) {

    if (err) {
      return res.status(500).send("Error in Planet Data");
    }

    if (!planetData) {
      return res.status(404).send({});
    }

    res.send(planetData);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/os', (req, res) => {
  res.json({
    os: OS.hostname(),
    env: process.env.NODE_ENV
  });
});

app.get('/live', (req, res) => {
  res.json({ status: "live" });
});

app.get('/ready', (req, res) => {
  res.json({ status: "ready" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server successfully running on port - 3000");
  });
}

module.exports = app;
