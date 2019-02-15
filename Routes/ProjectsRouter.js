const express = require('express')
const db = require('../data/helpers/projectModel.js')
const router = express.Router();

// GET REQUESTS
router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        if(posts){
        res.status(200).json({success: true, posts})
      } else{
        res.status(500).json({success:false, message: 'The projects could not be retrieved.'});
      }})
      .catch(({code, message}) =>{
        res.status(code).json({success: false, message})
    })
});



module.exports = router
