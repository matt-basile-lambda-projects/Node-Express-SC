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
// UPDATE REQUESTS
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { description, name } = req.body;
    console.log(req.body)
    const project = { description, name };
    if (!description || !name) {
        return res.status(400).json({success: false, message: "Must provide content for the project"});
    }
    db.update(id, project)
      .then(response => {
        if(response == 0) {
            return res.status(404).json({success: false, message: "project with ID does not exist"});
        }
        else{
            res.status(200).json({success: true, project})
        }
      })
      .catch(message => {
        return res.status(400).json({success: false, message: message});
      });
});
// DELETE REQUEST
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(project => { 
        if(project){
        res.status(204).end();
      } else{
        res.status(404).json({success:false, message: 'The project with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The projects information could not be retrieved.'});
    })
});



module.exports = router
