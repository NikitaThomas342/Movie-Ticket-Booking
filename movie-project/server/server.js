const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./router.js');
const cookieParser = require('cookie-parser')
//google
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '371109756681-599bu64ani7nu12av4m8ieruiq8c3f34.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

const app = express();

app.use(express.json());

app.use(passport.initialize())

app.use(cookieParser())

app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());

app.use('/api', indexRouter);

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