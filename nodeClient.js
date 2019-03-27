const net = require('net');
const client = new net.Socket();

const port = 7070;
let host = '127.0.0.1';
host = '82.196.14.167'

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(port, host, function() {
    console.log('Connected');

    rl.on('line', (input) => {
        client.write(input);
      });
});

client.on('data', function(data) {
    console.log('Server Msg : ' + data + '\n');
});

client.on('close', function() {
    console.log('Connection closed');
});
