const express =require('express');
const router =express.Router();
const passport= require('passport');


//import models
const Signup =require('../models/Signup');

router.get("/Signup", (req, res) =>{
    res.render("Signup");
 });
    
 router.post("/SignUp", async (req, res) => {
  try {
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({ 
      email: req.body.email
     });

    if (existingUser) {
      return res.status(400).send("Not Registered, email already exists");
    } else {
      await Signup.register(user, req.body.password, (error) => {
        if(error) {
          throw error;
        }
        res.redirect("/Login");
      });
    }
    console.log(user);
  } catch (error){
    res.status(400).render("signup");
    console.log(error);
  } 
});

router.get("/login", (req, res) =>{
  res.render("login");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}),(req,res) =>{
  console.log("Login successful for user:", req.body.email, "with role:", req.user.role);
  req.session.user = req.user;
  
  const { role, branch } = req.user;

    if (!role) {
      return res.status(400).send("User role missing");
    }

    const lowerRole = role.toLowerCase();

    if (lowerRole === "Manager" || lowerRole === "salesAgent") {
      if (!branch) {
        return res.status(400).send("Branch missing for this user");
      }

      const lowerBranch = branch.toLowerCase();

      if (lowerRole === "Manager") {
        if (lowerBranch === "Maganjo") {
          return res.redirect("/managerDash/Maganjo");
        } else if (lowerBranch === "Mattuga") {
          return res.redirect("/managerDash/Mattuga");
        } else {
          return res.send("Invalid branch for manager");
        }
      } else if (lowerRole === "salesAgent") {
        if (lowerBranch === "Maganjo") {
          return res.redirect("/salesAgentDash/Maganjo");
        } else if (lowerBranch === "Mattuga") {
          return res.redirect("/salesAgentDash/Mattuga");
        } else {
          return res.send("Invalid branch for sales agent");
        }
      }
    } else if (lowerRole === "director") {
      return res.redirect("/directorDash");
    } else {
      return res.send("This role does not exist");

  }
});
  

module.exports =router;