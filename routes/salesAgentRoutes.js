// const express = require("express");
// const router = express.Router();

// router.get("/salesAgentDash", (req, res) => {
//   res.render("salesAgentDashboard1");
// });

// module.exports =router;


const express = require("express");
const router = express.Router();

router.get("/salesAgentDash/:branch", (req, res) => {
  const { branch } = req.params;

  if (branch === "Maganjo") {
    res.render("salesAgentDashboard1"); 
  } else if (branch === "Mattuga") {
    res.render("salesAgentDashboard2"); 
  } else {
    res.status(404).send("Invalid sales agent branch");
  }
});

module.exports = router