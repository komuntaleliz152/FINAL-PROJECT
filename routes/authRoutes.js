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
    console.log("Signup attempt with data:", req.body);
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({ 
      email: req.body.email
     });

    if (existingUser) {
      console.log("User already exists:", req.body.email);
      return res.status(400).send("Not Registered, email already exists");
    } else {
      await Signup.register(user, req.body.password, (error) => {
        if(error) {
          console.error("Error registering user:", error);
          throw error;
        }
        console.log("User registered successfully:", req.body.email);
        res.redirect("/Login");
      });
    }
  } catch (error){
    console.error("Signup error:", error);
    res.status(500).send("Error during signup: " + error.message);
  } 
});

router.get("/login", (req, res) =>{
  res.render("login");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}),(req,res) =>{
  console.log("Login successful for user:", req.body.email, "with role:", req.user.role);
  req.session.user = req.user;
  

  if(req.user.role ==="Manager"){
    res.redirect("/managerDash");
}
else if(req.user.role ==="salesAgent"){
    res.redirect("/salesAgentDash")
}
else if(req.user.role ==="director"){
    res.redirect("/directorsDash");
}else{
    res.send("You do not have any role in the system")
}

});

// //the roles are the values of the input not what appears at user interface
// router.get("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy((error) => {
//       if (error) {
//         return res.status(500).send("Error logging out");
//       }
//       res.redirect("/logout/comfirm"); // ✅ redirect to a safe route
//     });
//   } else {
//     res.redirect("/logout/cofirm"); // ✅ still redirect if no session
//   }
// });






  

module.exports =router;