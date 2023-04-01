const express = require("express");
const bodyParser = require('body-parser');
const router = require('./router')
const handlebars = require("express-handlebars");
const { initializePassport } = require("./config/passport.config");

require("./config/mongo.config");

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine())

app.set("views",__dirname+"/views")
app.set("view engine","handlebars")
app.use(express.static(__dirname+"/public"))
initializePassport(app);

router(app)

module.exports = app;
