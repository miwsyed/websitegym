//Paste in routes/index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;

  res.send('Name: ' + name + '</br>Email: ' + email + '</br>Phone: ' + phone + '</br>Messsage: ' +  message);
})
module.exports = router;
