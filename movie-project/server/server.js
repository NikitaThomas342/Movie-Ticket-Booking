const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./router.js');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

passport.use(new FacebookStrategy({
  clientID: '208029371403890',
  clientSecret: '47b288b07ef5ab87177e3f3b2a40b21e',
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id','displayName','name','email'],
  passReqToCallback:true,
},
function(req,accessToken, refreshToken, profile, done) {
  try{
      console.log(req)
      if(profile){
          req.user = profile
          done(null,profile)
      }
  }catch(err){
      done(err)
  }
})
);

app.use(express.json());
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());

app.use(passport.initialize())

app.use('/api', indexRouter);

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
  session: false, 
  failureRedirect: 'http://localhost:3000' 
}),(req,res)=>{
  res.redirect('http://localhost:3000/')
});

// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(5000,() => console.log('Server is running on port 5000'));