const express = require("express");
const cors = require('cors');
const path = require('path');
const XXH = require('xxhashjs');

let app = express();
app.use(cors());
app.use(express.json({ type: '*/*' }));

app.post('/hash', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*")
  console.log('in hash: ', req.body);
  let hash = XXH.h32(req.body.hash, 0xABCD).toString(16);
  res.send({ hash: hash });
});

app.all('*', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*")
  console.log('header: ', req.headers);

  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
    res.status(200).sendFile(path.join(__dirname + '/img/FF4D001px.png'));
  }
  else {
    let time = 1000 * 60;
    res.setHeader("Strict-Transport-Security", `max-age=${time}`);
    res.status(201).sendFile(path.join(__dirname + '/img/FF4D002px.png'));
  }
});

app.listen(7002, () => {
  console.log('listen on port 7002');
});