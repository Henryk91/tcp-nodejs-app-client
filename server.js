const net = require('net');
const client = new net.Socket();
var bodyParser = require('body-parser');
const express = require('express')
const path = require('path');
const app = express()
const expressPort = 3000
const port = 7070;
let host = '127.0.0.1';
host = '82.196.14.167'

let msg = '';

app.use(bodyParser.json());

app.use(express.static(__dirname + '/view'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/index.html'))
})

app.listen(expressPort, () => console.log(`Listening on port ${expressPort}!`))


client.connect(port, host, function () {
  console.log('Connected');

  app.post('/send_msg', function (req, res) {
    console.log(req.body.msg);
    msg = req.body.msg;
    client.write(req.body.msg);
    res.json(req.body);
  })
});


client.on('data', function (data) {

  msg = data;
  console.log('Server Msg : ' + data + '\n');
});

app.get('/data', function (req, res) {
  var data = "lorem ipsum dolor";
  data = msg;
  res.send(data);
});

client.on('close', function () {
  console.log('Connection closed');
});
