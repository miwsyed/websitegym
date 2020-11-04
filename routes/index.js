//Paste in routes/index.js
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//For Registering

router.post('/', (req, res) => {

   const username = req.body.username;
   const email = req.body.email;
   const phonenumber = req.body.phonenumber;
   const password = req.body.password;


   bcrypt.hash(req.body.password, 10, function(err,hashedPass){
    if(err){
        res.json({
            error : err
        })
    }

    let user = new User ({
        username : req.body.username,
        email : req.body.email,
        phonenumber : req.body.phonenumber,
        password : hashedPass
    })
    user.save()
    .then(user => {
       res.json({
        message: 'User Added Successfully!'
       })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })
    res.redirect('/')
    res.end

})
    
     
})




//For Login

router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  User.findOne({$or: [{email:username},{phonenumber:username}]})
  .then(user => {
      if(user){
          bcrypt.compare(password, user.password, function(err,result){
              if(err){
                  res.json({
                      error: err
                  })
              }
              if(result){
                  let token = jwt.sign({name:user.name}, 'verySecretValue', {expiresIn:'1h'})
                  res.json({
                      message: 'Login Successful!',
                      token
                  })
              }else{
                  res.json({
                      message: 'Password does not match'
                  })
              }
          })
      }else{
          res.json({
              message: 'No user found!'
          })
      }
  })
})




module.exports = router;
