const createError = require('http-errors');
const express = require('express');
const path = require('path');
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

app.use(cookieParser())

app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());

app.use('/api', indexRouter);

//google
app.post('/google/login', (req,res)=>{
  let token = req.body.token;

  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
    }
    verify()
    .then(()=>{
        res.cookie('session-token', token);
        res.send('success')
    })
    .catch(console.error);
})

app.get('/google/logout', (req, res)=>{
  res.clearCookie('session-token');
  res.redirect('/login')
})
//

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