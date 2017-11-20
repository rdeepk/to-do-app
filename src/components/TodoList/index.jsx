import React, {Component} from 'react';
import Todo from '../Todo';

/**
* Provides the List of todos for default display.
*/
class TodoList extends Component {
    render() {

        let todosJSX = this.props.todos.map((todo, index)=>{
            return <Todo    key={index}
                            todo={todo}
                            getTitleById={this.props.getTitleById}
                            status={this.props.status}
                            labels={this.props.labels}
                            updateTask={this.props.updateTask}
                            competeTasksCounter={this.props.competeTasksCounter}
                            deleteById={this.props.deleteById}
                            handleMenuClasses={this.props.handleMenuClasses}
                            />
        })
        return (
            <div className="todos-default">{todosJSX}</div>
        )
    }
}

export default TodoList;