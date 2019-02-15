// code away!
require('dotenv').config();

const express = require('express')
const cors = require('cors');

const projects = require('./data/helpers/projectModel.js')
const projectsRouter = require('./Routes/ProjectsRouter');
const actionsRouter = require('./Routes/ActionsRouter');
const path = require('path');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/projects', projectsRouter)
server.use('/actions', actionsRouter)


// Home Route Running
server.get('/', (req, res) => {
    res.send('Hello from Sprint Challenge')
});
// GET Project Actions
server.get('/projects/actions/:projectId', (req, res) => {
    const { projectId } = req.params;
    projects
      .getProjectActions(projectId)
      .then(projectPosts => {
        if (projectPosts === 0) {
          return errorHelper(404, 'No posts by that user', res);
        }
        res.json(projectPosts);
      })
      .catch(err => {
        return errorHelper(500, 'Database Error', res);
      });
  });

const port = process.env.PORT || 8000;

//Static file declaration
server.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));
  //
  server.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

//start server
server.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})