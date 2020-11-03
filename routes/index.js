//Paste in routes/index.js
const mongoose = require('mongoose')
const Employee = mongoose.model("Employee")
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;

  console.log(username+email+phonenumber+password)

  const employee = new Employee({
    username,
    email,
    phonenumber,
    password
  })

  employee.save()
  .then(result => () => {
    console.log(result)
    res.json(result)
  })
  
  res.redirect('/');
  res.end();

})


module.exports = router;
