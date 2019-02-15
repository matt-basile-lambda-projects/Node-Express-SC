const express = require('express')
const db = require('../data/helpers/actionModel.js')
const router = express.Router();

// GET REQUESTS
router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        if(posts){
        res.status(200).json({success: true, posts})
      } else{
        res.status(500).json({success:false, message: 'The actions could not be retrieved.'});
      }})
      .catch(({code, message}) =>{
        res.status(code).json({success: false, message})
    })
});
// INSERT REQUESTS
router.post('/', (req, res) => {
    const { notes, description, project_id	 } = req.body;
    const newAction= { project_id, notes, description };
    if (!notes || !description) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a name and description for the project." });
    }
    db.insert(newAction)
      .then(user => {res.status(201).json(user);})
      .catch(() => res.status(500).json({success: false, message: "There was an error while saving the action to the database."})
)});
// UPDATE ACTION
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { description, notes } = req.body;
    const action = { description, notes };
    console.log(action) //{ title: 'Exzc', contents: 'ent at Lambda School' }
    if (!action) {
        return res.status(400).json({success: false, message: "Must provide content for the action"});
    }
    db.update(id, action)
      .then(response => {
        if(response == 0) {
            return res.status(404).json({success: false, message: "action with ID does not exist"});
        }
        else{
            res.status(200).json({success: true, response})
        }
      })
      .catch(message => {
        return res.status(400).json({success: false, message: message});
      });
});
// DELETE ACTION
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(project => { 
        if(project){
        res.status(204).end();
      } else{
        res.status(404).json({success:false, message: 'The action with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The action information could not be retrieved.'});
    })
});


module.exports = router
