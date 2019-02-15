// code away!
const express = require('express')
const projects = require('./data/helpers/projectModel.js')
const projectsRouter = require('./Routes/ProjectsRouter');
const actionsRouter = require('./Routes/ActionsRouter');
const server = express();

server.use(express.json());
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
  

server.listen(8000, () => console.log('API running on port 8000'));
