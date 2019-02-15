import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Modal from './Modal'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      projects:[],
      selectedActions: []
    }
    this.connecToServer = this.connecToServer.bind(this);
  }
  connecToServer() {
    fetch('/');
  }
  componentDidMount(){
    this.connecToServer()
    this.getProjects()
  }
  getProjects = () =>{
    axios.get('http://localhost:8000/projects')
    .then(res => this.setState({projects: res.data.posts}))
    .catch(err => console.log(err))
  }
  getProjectsArticles = id =>{
    axios.get(`http://localhost:8000/projects/actions/${id}`)
    .then(res => this.setState({selectedActions : res.data}))
    .catch(err =>console.log(err))
  }
  moreProjectInfo = (e, id) =>{
    e.preventDefault();
    this.getProjectsArticles(id);
  }
 
  render() {
    console.log(this.state.projects)
    return (
      <div className="App">
        {this.state.projects.map(project =>{
          return <div key={project.id}><h1>{project.name}</h1> <p>{project.description}</p><Modal moreProjectInfo={this.moreProjectInfo} actions={this.state.selectedActions} project={project}/></div>
        })}
        
      </div>
    );
  }
}

export default App;
