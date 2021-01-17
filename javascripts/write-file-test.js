fs = require('fs');
function write() {
  console.log('Made it');
  fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
}

function testy() {
  console.log("Hi");
}

document.getElementById("but").addEventListener("click", testy);