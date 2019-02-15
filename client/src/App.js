import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  state={
    projects:[]
  }
  componentDidMount(){
    this.getProjects()
  }
  getProjects = () =>{
    axios.get('http://localhost:8000/projects')
    .then(res => this.setState({projects: res.data.posts}))
    .catch(err => console.log(err))
  }
  render() {
    console.log(this.state.projects)
    return (
      <div className="App">
        {this.state.projects.map(project =>{
          return <div key={project.id}><h1>{project.name}</h1> <p>{project.description}</p></div>
        })}
      </div>
    );
  }
}

export default App;
