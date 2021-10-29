const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", signupValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This user is already in use!",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (name, email, password) VALUES ('${
                req.body.name
              }', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "The user has been registerd with us!",
                });
              }
            );
          }
        });
      }
    }
  );
});
router.post("/login", loginValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              { id: result[0].id },
              "the-super-strong-secrect",
              { expiresIn: "1h" }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});
router.post("/get-user", signupValidation, (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      message: "Please provide the token",
    });
  }
  const theToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(theToken, "the-super-strong-secrect");
  db.query(
    "SELECT * FROM users where id=?",
    decoded.id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "Fetch Successfully.",
      });
    }
  );
});
router.post('/add_list',(req,res,next)=>{
    let user_id = req.body.user_id
    let item_id = req.body.item_id
    let type = req.body.type
    db.query('INSERT INTO list (user_id,item_id,type) VALUES (?,?,?)',[user_id,item_id,type],(error,results,fields)=>{
        if(error) throw error
        return res.send({
            error: false,
            data:results,
            message:"Added To List"
        })
    })
})
router.post('/add_favorite',(req,res,next)=>{
    let user_id = req.body.user_id
    let item_id = req.body.item_id
    let type = req.body.type
    db.query('INSERT INTO favorite (user_id,item_id,type) VALUES (?,?,?)',[user_id,item_id,type],(error,results,fields)=>{
        if(error) throw error
        return res.send({
            error: false,
            data:results,
            message:"Added To List"
        })
    })
})
router.post('/add_bookmark',(req,res,next)=>{
    let user_id = req.body.user_id
    let item_id = req.body.item_id
    let type = req.body.type
    db.query('INSERT INTO bookmark (user_id,item_id,type) VALUES (?,?,?)',[user_id,item_id,type],(error,results,fields)=>{
        if(error) throw error
        return res.send({
            error: false,
            data:results,
            message:"Added To List"
        })
    })
})
router.post('/get_list',(req,res,next)=>{
    let user_id = req.body.user_id
    db.query('SELECT * FROM list WHERE user_id = ?',[user_id],(error,results)=>{
        if(error) throw error
        return res.send({
            error: false,
            data:results,
            message:"Fetch successful"
        })
    })
})
router.post('/get_favorite',(req,res,next)=>{
    let user_id = req.body.user_id
    db.query('SELECT * FROM favorite WHERE user_id = ?',[user_id],(error,results)=>{
        if(error) throw error
        return res.send({
            error: false,
            data:results,
            message:"Fetch successful"
        })
    })
})
router.post('/get_bookmark',(req,res,next)=>{
    let user_id = req.body.user_id
    db.query('SELECT * FROM bookmark WHERE user_id = ?',[user_id],(error,results)=>{
        if(error) throw error
        return res.send({
            error: false,
            data:results,
            message:"Fetch successful"
        })
    })
})

router.delete('/delete_list/:id', (req, res) => {
  let id = req.params.id
  db.query('DELETE FROM list WHERE id = ?',[id],(error,results)=>{
    if(error) throw error
    return res.send({
      error:false,
      data:results,
      message:'Item Deleted'
    })
  })
})

router.delete('/delete_favorite/:id', (req, res) => {
  let id = req.params.id
  db.query('DELETE FROM favorite WHERE id = ?',[id],(error,results)=>{
    if(error) throw error
    return res.send({
      error:false,
      data:results,
      message:'Item Deleted'
    })
  })
})

router.delete('/delete_bookmark/:id', (req, res) => {
  let id = req.params.id
  db.query('DELETE FROM bookmark WHERE id = ?',[id],(error,results)=>{
    if(error) throw error
    return res.send({
      error:false,
      data:results,
      message:'Item Deleted'
    })
  })
})

router.post('/login_check',(req,res)=>{
  let email = req.body.email

  db.query('SELECT * FROM users WHERE email = ?',[email],(error,results)=>{
    if(error) throw error
    if(results.length>0){
        const token = jwt.sign(
          { id: results[0].id },
          "the-super-strong-secrect",
          { expiresIn: "1h" }
        );
        db.query(
          `UPDATE users SET last_login = now() WHERE id = '${results[0].id}'`
        );
        return res.status(200).send({
          error:false,
          msg: "Logged in!",
          token: token,
          user: results[0],
        });
    }else{
      return res.send({
        error:true,
        message:'User Not Found'
      })
    }
    
  })

})

module.exports = router;
