const { Router } = require('express');
const UserDao = require("../dao/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = new UserDao();
const passport = require("passport");
const { initializePassport } = require("../config/passport.config");


initializePassport();

const router = Router();



router.post("/signup", async (req, res) => {
  try {
    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const data = await user.insertOne(newUser);

    res.send({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json(`Something went wrong, ${error}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await user.findOne(email); //traigo el usuario si existe

    const match = await bcrypt.compare(String(password), String(data.password));


    if (!match) return res.status(500).json("Incorrect password");

    let token = jwt.sign({ email, role: data.role }, "secreto");

    res.send({ token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Invalid email or password' });

  }
});

router.get('/login', (req, res) => {
  res.render('login.handlebars', { style: "login.css" });
});

router.get('/signup', (req, res) => {
  res.render('signup.handlebars', { style: "signup.css" });
});

router.get('/forgotPassword', (req, res) => {
  res.render('forgotPassword.handlebars', { style: "forgotPassword.css" });
});

router.get("/public",  (req, res) => {
  res.send({ message:"Hola desde endpoint publico"});
});


router.get("/profile",passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    res.send({ message:"Hola USER autenticado"});;
  } catch (error) {
    res.status(500).json(`Something went wrong, ${error}`);
  }
});



module.exports = router;