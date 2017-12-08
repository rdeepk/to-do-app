import React, { Component } from 'react';
import Header from '../Header';
import axios from 'axios';

let serverUrl = 'http://localhost:8080/';
/**
 * Top level Parent component.
 */
class App extends Component {
  constructor() {
    super()

    this.state = {
      loading:false,
      todos: [],
      projects: [],
      status: [],
      labels: [],
      compteTasksCounter: 0,
      filteredTodos: []
    }
   }

  getTodos = () => {
    let promise = axios.get(serverUrl+'todos')
    promise.then((response) => {
      this.setState({
        todos: response.data.todos,
        filteredTodos: response.data.todos,
        loading:false
      },()=>{
        this.setCompleteTasksCounter();
      })
    })
    promise.catch(function (error) {
      console.log(error);
    });
  }

  setFilteredTodos = (todos) => {
    this.setState({filteredTodos: todos})
  }

  
  getProjects = () => {
    axios.get(serverUrl+'project')
      .then((response) => {
      this.setState({
        projects: response.data.project
      })
    })
      .catch((error) => {
      console.log(error);
    });
  }

  getStatus = () => {
    let promise = axios.get(serverUrl+'status')
    promise.then((response) => {
      this.setState({
        status: response.data.status
      })
    })
    promise.catch(function (error) {
      console.log(error);
    });
  }

  getLabels = () => {
    let promise = axios.get(serverUrl+'label')
    promise.then((response) => {
      this.setState({
        labels: response.data.label
      })
    })
    promise.catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    this.setState({loading: true})
    this.getStatus();
    this.getLabels();
    this.getProjects();
    this.getTodos();
  }


  /**
  * Recalculates the count of completed todos.
  */
  setCompleteTasksCounter = () => {
    let count = 0;
    this.state.todos.forEach((todo, i) => {
      if(this.getTitleById('status',todo.status).title === 'Complete') {
        count++;
      }
    })
    this.setState({
      competeTasksCounter: count
    })
  }

  /**
  * Adds new todo.
  */
  addNewTask = (todo) => {
    let labels = [];
    todo.labels.forEach((label, i) => {
      if(label.checked) {
        labels.push(label.id);
      }
    })

    let newTodo = {
      title: todo.title.value,
      description: todo.description.value,
      status: todo.status.value,
      project: todo.project.value,
      labels: labels
    }
    axios.post(serverUrl+'todos', newTodo)
    .then((response) => {
      this.state.todos.push(response.data);
      this.setState(this.state.todos);
      this.setFilteredTodos(this.state.todos);
      console.log('saved successfully')
    });
  }  

  /**
  * Adds new labels.
  */
  addNewLabel = (label) => {
    let newLabel = {
      title: label.title.value
    }
    axios.post(serverUrl+'label', newLabel)
    .then((response) => {
      this.state.labels.push(response.data);
      this.setState(this.state.labels);
      console.log('saved successfully')
    });
  }

  /**
  * Adds new projects.
  */
  addNewProject = (project) => {
    let newProject = {
      title: project.title.value
    }
    axios.post(serverUrl+'project', newProject)
    .then((response) => {
      this.state.projects.push(response.data);
      this.setState(this.state.projects);
      console.log('saved successfully')
    });
  }

  /**
  * Updates an existing todo.
  */
  updateTask = (todo, id) => {
    let labels = [];
    todo.labels.forEach((label, i) => {
      if(label.checked) {
        labels.push(label.id);
      }
    })

    let newTodo = {
      title: todo.title.value,
      description: todo.description.value,
      status: todo.status.value,
      project: todo.project.value,
      labels: labels
    }
    axios.post(serverUrl+'updateTodo?id='+id, newTodo)
    .then((response) => {
      console.log('saved successfully')
    });

    this.state.todos.forEach((todo, i) => {
      if(todo._id === id) {
        this.state.todos[i] = newTodo;;
        this.setState(this.state.todos);
        this.setFilteredTodos(this.state.todos);
      }
    })

    this.setCompleteTasksCounter();
  }

  deleteById = (id, name) => {
    axios.post(serverUrl+'delete'+name+'ById?id='+id)
    .then((response) => {
      console.log('deleted successfully')
    });
    if(name === 'Todo') {
      let todos = this.state.todos.filter((todo, i)=>{
        return id !== todo._id
      })
      this.setState({
        todos: todos
      },() => {
        this.setCompleteTasksCounter();
      })
    }
  }

  /**
  * Takes id and name of the object and returns corresponding title.
  */
  getTitleById = (name, id) => {
    return this.state[name].find((key, index) => {
        return key._id === id;
    });
  }

  /**
  * Deletes a todo.
  */
  removeTodos = (todoIdArray) => {
    todoIdArray.forEach((id, i) => {
      this.state.todos.forEach((todo, index) => {
        if(id === todo._id) {
          this.deleteById(id, 'Todo');
          this.state.todos.splice(index, 1);
          this.setState(this.state.todos);
          this.setFilteredTodos(this.state.todos);
        }
      })
    })
    this.setCompleteTasksCounter();
  }

  /**
  * Calculates and return stats for total, active and completed tasks.
  */
  getTodoStats = () => {
    let stats = {
      total:0,
      active:0,
      complete:0
    };
    this.state.todos.forEach((todo, i) => {
      stats.total++;
      switch(this.getTitleById('status',todo.status).title) {
        case "Active":
          stats.active++;
          break;
        case "Complete":
          stats.complete++;
          break;
      }
    })
    return stats;
  }

  render() {
    //lets get fresh todo stats
    if(this.state.loading) {
      return <h1>Loading..</h1>
    }
    
    let stats = this.getTodoStats()
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 stats">
              <div className="stats">
                <span>Total Tasks: {stats.total}</span>
                <span>Active: {stats.active}</span>
                <span>Complete: {stats.complete}</span>
              </div>
          </div>
        </div>

        <Header getTitleById = {this.getTitleById}
                removeTodos={this.removeTodos}
                status={this.state.status}
                updateTask={this.updateTask}
                todos={this.state.todos}
                projects={this.state.projects}
                labels={this.state.labels}
                competeTasksCounter={this.state.competeTasksCounter}
                addNewTask={this.addNewTask}
                addNewLabel={this.addNewLabel}
                addNewProject={this.addNewProject}
                deleteById={this.deleteById}
                setFilteredTodos={this.setFilteredTodos}
                filteredTodos={this.state.filteredTodos}
                /> 
      </div>
    );
  }
}

export default App;
