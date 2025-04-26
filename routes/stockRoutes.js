
const express = require("express");
const router = express.Router();
// Stock A Route
router.get('/stock', async (req, res) => {
    try {
       const procurement= await Procurement.find()
       
       res.render('stock', { procurement: procurement }); // Ensure 'stockA' matches the view file name
   } catch (err) {
       console.error('Error fetching stock data:', err); // Improved error logging
       res.status(500).send('Internal Server Error');
   }
});
module.exports = router;