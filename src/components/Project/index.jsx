import React, {Component} from 'react';
import TodoListByProject from '../TodoListByProject';

/**
* Project component for displaying todos by project.
*/
class Project extends Component {

    /**
    * Takes the project id as param, then collects all its todos with complete status and send them for deletion.
    * its called on click event of clear complete link.
    */
    clearComplete = (projectId) => {
        let completeTodos = [];
        this.props.todos.forEach((todo, i) => {
            if(Number(todo.status) === 101) {
                completeTodos.push(todo.id);
            }
        })
        this.props.removeTodos(completeTodos);
    }

    render() {
        //calculates the count of todos with complete status.
        let completeTasksCount = 0;
        this.props.todos.forEach((todo, i) => {
          if(Number(todo.status) === 101) {
            completeTasksCount++;
          }
        })

        //Disable or enable css for clear complete button based on count of todos with complete status.
        let clearBtnCss;
        if(!completeTasksCount) {
            clearBtnCss = {
                "background-color": "#ccc",
                "pointer-events": "none",
                "color": "#000"
            }
        } else {
            clearBtnCss = {
                "background-color": "#111",
                "pointer-events": "auto",
                "color": "#fff"
            }
        }
        
        return (
            <div className="project">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="project-header">
                            <h3>Project: {this.props.title}</h3>
                            <button style={clearBtnCss} onClick={()=>{this.clearComplete(this.props.id)}}>Clear Complete</button>
                        </div>
                    </div>
                </div>
                
                <TodoListByProject  todos={this.props.todos}
                                    getTitleById = {this.props.getTitleById}
                                    status={this.props.status}
                                    labels={this.props.labels}
                                    updateTask={this.props.updateTask}
                                    project={this.props.id}
                                    deleteById={this.props.deleteById}
                                    handleMenuClasses={this.props.handleMenuClasses}
                                    />
            </div>
        )
    }
}

export default Project;