const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

  // app.listen(process.env.PORT || 4200);
  // console.log('API AMS is running on https://amsclinica.herokuapp.com')

   app.listen(4200);
   console.log('API AMS is running on http://localhost:4200')


