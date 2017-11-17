import React, {Component} from 'react';
import Project from '../Project';

/**
* Handles the projects and their corresponding todos for filtering todos by project.
*/
class ProjectList extends Component {

    /**
    * Takes the project id as a param and returns the todos by that project.
    */
    getTodosByProject = (id) => {
        let todosJSX = this.props.todos.filter((todo, j) => {
            return todo.project === id ? true: false
        })
        return todosJSX;
    }

    render() {
        // returns the array of projects that have todos attached to them.
        let projects = this.props.projects.filter((project, i) => {
            let todos = this.getTodosByProject(project.id);
            return todos.length > 0 ? true : false;
        })

        // makes the todos JSX.
        let projectsJSX= projects.map((project, i) => {
            let todos = this.getTodosByProject(project.id);
            return <Project id={project.id}
                            title ={project.title}
                            todos={todos}
                            status={this.props.status}
                            labels={this.props.labels}
                            getTitleById = {this.props.getTitleById}
                            updateTask={this.props.updateTask}
                            removeTodos={this.props.removeTodos}
                            deleteById={this.props.deleteById}
                            handleMenuClasses={this.props.handleMenuClasses}
                            />
        })
        return (
            <div>{projectsJSX}</div>
        )
    }
}

export default ProjectList;