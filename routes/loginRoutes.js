const express =require("express");
const router =express.Router();
const passport= require("passport");

router.get("/login", (req, res) =>{
   res.render("login");
});

router.post("/login", 
    passport.authenticate("local", {failureRedirect: "/login"}),
    (req,res) =>{
    console.log(req.body);
    req.session.user =req.user;
    if(req.user.role ==="manager"){
        res.redirect("/managersdash");
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



module.exports =router;