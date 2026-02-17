//  1. Dependencies
const express =require('express');
const path = require('path');
const mongoose =require('mongoose');
const passport =require('passport')
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  });

require('dotenv').config();

//import user's mode
const Signup =require('./models/Signup');
const Register =require('./models/Register');
const ProduceSale =require('./models/ProduceSale');
const Creditsale =require('./models/Credit');
const Procurement =require('./models/Procurement');

// 2.Instantations
const app =express();
const PORT = process.env.PORT || 3004; // fallback to 3004 for local dev


//import routes
 const authRoutes =require("./routes/authRoutes");
 const registerproduceRoutes =require("./routes/registerproduceRoutes");
 const salesRegisterRoutes =require("./routes/salesRegisterRoutes");
 const homeRoutes =require("./routes/homeRoutes");
 const managerRoutes =require("./routes/managerRoutes");
 const salesAgentRoutes =require("./routes/salesAgentRoutes");
 const directorRoutes =require("./routes/directorRoutes");
 const stockRoutes = require("./routes/stockRoutes");
 const addProduceSaleRoutes = require("./routes/addproducesaleRoutes");
 const creditRoutes = require("./routes/creditRoutes");
 const logoutRoutes = require("./routes/logoutRoutes");
// 3. Configurations
//set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));//specify the views directory

// Database connection
const DATABASE_URL = process.env.DATABASE || 'mongodb://localhost:27017/KGL';

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Mongoose connection open');
    console.log('Connected to database:', DATABASE_URL.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB');
  })
  .catch((err) => {
    console.log(`Connection error: ${err.message}`);
  });


// 4. middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public/img/uploads", express.static(__dirname + "/public/img/uploads"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use(express.urlencoded({ extended: true })); //helps to parse data from forms
// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// // passport configs
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());



//5.Routes
//using imported routes
app.use('/', authRoutes);
app.use('/', registerproduceRoutes);
app.use('/', salesRegisterRoutes);
app.use('/', homeRoutes);
app.use('/', managerRoutes);
app.use('/', salesAgentRoutes);
app.use('/', directorRoutes);
app.use('/', stockRoutes);
app.use('/', addProduceSaleRoutes);
app.use('/', creditRoutes);
app.use('/', logoutRoutes);
  



//6.Bootstraping the server
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));