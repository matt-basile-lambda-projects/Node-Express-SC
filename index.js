// code away!
const express = require('express')
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

  

server.listen(8000, () => console.log('API running on port 8000'));
