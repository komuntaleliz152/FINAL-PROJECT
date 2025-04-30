// const express = require("express");
// const router = express.Router();


// router.get("/managerDash", (req, res) => {
//   res.render("managersDashboard2");
// });

// module.exports =router;

const express = require("express");
const router = express.Router();

router.get("/managerDash/:branch", (req, res) => {
  const { branch } = req.params;

  if (branch === "Maganjo") {
    res.render("managerDashboard1"); 
  } else if (branch === "Mattuga") {
    res.render("managerDashboard2"); 
  } else {
    res.status(404).send("Invalid manager  branch");
  }
});

module.exports = router