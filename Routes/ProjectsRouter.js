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
// INSERT REQUESTS
router.post('/', (req, res) => {
    const { name, description } = req.body;
    const newProj= { name, description };
    if (!name || !description) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a name and description for the project." });
    }
    db.insert(newProj)
      .then(user => {res.status(201).json(user);})
      .catch(() => res.status(500).json({success: false, message: "There was an error while saving the user to the database."})
)});


module.exports = router
