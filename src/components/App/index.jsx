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

    /**
    * Sets the default state for competeTasksCounter.
    */
  //   this.getCompleteTasksCount = () => {
  //     let count = 0;
  //     props.todos.forEach((todo, i) => {
  //       if(Number(todo.status) === 101) {
  //         count++;
  //       }
  //     })
  //     return count;
  //   }

    this.state = {
      todos: [],
      projects: [],
      status: [],
      labels: []
      // competeTasksCounter: this.getCompleteTasksCount()
    }
   }

  getTodos = () => {
    let promise = axios.get(serverUrl+'todos')
    promise.then((response) => {
      // console.log(response);
      this.setState({
        todos: response.data.todos
      },() => {
        // console.log(this.state.todos)
      })
    })
    promise.catch(function (error) {
      console.log(error);
    });
  }

  getProjects = () => {
    let promise = axios.get(serverUrl+'project')
    promise.then((response) => {
      // console.log(response);
      this.setState({
        projects: response.data.project
      })
    })
    promise.catch(function (error) {
      console.log(error);
    });
  }

  getStatus = () => {
    let promise = axios.get(serverUrl+'status')
    promise.then((response) => {
      // console.log(response);
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
      // console.log(response);
      this.setState({
        labels: response.data.label
      })
    })
    promise.catch(function (error) {
      console.log(error);
    });
  }

  componentWillMount() {
    this.getTodos();
    this.getStatus();
    this.getLabels();
    this.getProjects();
  }

  /**
    * Takes array as param and use id key return an incremented value.
    */
  // getNextId = (arrName => arrName[arrName.length-1].id+1);


  /**
  * Recalculates the count of completed todos.
  */
  // setCompleteTasksCounter = () => {
  //   let count = 0;
  //   this.state.todos.forEach((todo, i) => {
  //     if(Number(todo.status) === 101) {
  //       count++;
  //     }
  //   })
  //   this.setState({
  //     competeTasksCounter: count
  //   })
  // }

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
    let obj;
    axios.post(serverUrl+'todos', newTodo)
    .then(function(response){
      obj = response.data;
      console.log('saved successfully')
    });
      this.state.todos.push(obj);
      this.setState(this.state.todos);
  }  

  /**
  * Adds new labels.
  */
  addNewLabel = (label) => {
    let newLabel = {
      title: label.title.value
    }
    axios.post(serverUrl+'label', newLabel)
    .then(function(response){
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
    .then(function(response){
      this.state.projects.push(response.data);
      this.setState(this.state.projects);
      console.log('saved successfully')
    });
  }

  /**
  * Updates an existing todo.
  */
  updateTask = (task, id) => {
    this.state.todos.forEach((todo, i) => {
      if(todo.id === id) {
        this.state.todos[i].title = task.title.value;
        this.state.todos[i].description = task.description.value;
        this.state.todos[i].status = task.status.value;
        //set labels
        task.labels.forEach((label, j) => {
          this.state.todos[i].labels[j].ischecked = task.labels[j].checked
        })
        this.setState(this.state.todos);
      }
    })
    // this.setCompleteTasksCounter();
  }

  deleteById = (id, name) => {
    if(name === 'todos') {
      let ids = [];
      ids.push(id);
      this.removeTodos(ids);
    }
  }

  /**
  * Takes id and name of the object and returns corresponding title.
  */
  getTitleById = (name, id) => {
    return this.props[name].find((key, index) => {
        return key.id === id;
    });
  }

  /**
  * Deletes a todo.
  */
  removeTodos = (todoIdArray) => {
    todoIdArray.forEach((id, i) => {
      this.state.todos.forEach((todo, index) => {
        if(id === todo.id) {
          this.state.todos.splice(index, 1);
        }
      })
    })
    this.setState(this.state.todos);
    // this.setCompleteTasksCounter();
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
    // this.state.todos.forEach((todo, i) => {
    //   stats.total++;
    //   switch(Number(todo.status)) {
    //     case 100:
    //       stats.active++;
    //       break;
    //     case 101:
    //       stats.complete++;
    //       break;
    //   }
    // })
    return stats;
  }

  render() {
    //lets get fresh todo stats
    // console.log(this.state.todos)
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
                /> 
      </div>
    );
  }
}

export default App;
