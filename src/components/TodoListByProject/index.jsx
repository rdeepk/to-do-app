import React, {Component} from 'react';
import TodoByProject from '../TodoByProject';

/**
* For handling list of todos by a project.
*/
class TodoListByProject extends Component {
    render(){
        let TodoByProjectJSX = this.props.todos.map((todo, i) => {
            return <TodoByProject   todo={todo}
                                    getTitleById = {this.props.getTitleById}
                                    status={this.props.status}
                                    labels={this.props.labels}
                                    updateTask={this.props.updateTask}
                                    project={this.props.project}
                                    deleteById={this.props.deleteById}
                                    handleMenuClasses={this.props.handleMenuClasses}
                                    removeTodos={this.props.removeTodos}
                                    />
        })
        return (
            <div className="todos-default">{TodoByProjectJSX}</div>
        )
    }
}

export default TodoListByProject;