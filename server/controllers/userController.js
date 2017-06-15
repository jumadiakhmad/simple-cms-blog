const User = require('../models/user')
const methods = {}
const bCrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const saltRounds = 10

methods.signUp = (req, res) => {
  let pwd = req.body.password
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: bCrypt.hashSync(pwd, saltRounds),
    email: req.body.email
  })

  newUser.save((error, response) => {
    if (error) res.json({msg: `Something error signup: ${error}`, success: false})
    else {
      console.log('Signup success');
      console.log(response);
      res.send(response)
    }
  })
}

methods.signIn = (req, res) => {
  let pwd = req.body.password
  User.findOne({ username: req.body.username}, (error, response) => {
    if (error) res.json({msg: `Something error signup: ${error}`, success: false})
    else {
      if (bCrypt.compareSync(response.password, pwd)) {
        let token = jwt.sign({
          id:
        })
      }
    }
  })
}

module.exports = methods
