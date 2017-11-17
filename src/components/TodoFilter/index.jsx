import React, { Component } from 'react';
import TodoList from '../TodoList';
import ProjectList from '../ProjectList';

/**
* Filters data as required by child components.
*/
class TodoFilter extends Component {

    render() {
        return (
                <div className="row">
                    <div className="col-sm-12">
                        {!this.props.todoListIsHidden &&
                            <TodoList projects={this.props.projects}
                                todos={this.props.todos}
                                getTitleById={this.props.getTitleById}
                                removeTodos={this.props.removeTodos}
                                status={this.props.status}
                                updateTask={this.props.updateTask}
                                deleteById={this.props.deleteById}
                                competeTasksCounter={this.props.competeTasksCounter}
                                handleMenuClasses={this.props.handleMenuClasses}
                            />}
                        {!this.props.projectListIsHidden &&
                            <ProjectList projects={this.props.projects}
                                todos={this.props.todos}
                                getTitleById={this.props.getTitleById}
                                status={this.props.status}
                                labels={this.props.labels}
                                updateTask={this.props.updateTask}
                                removeTodos={this.props.removeTodos}
                                deleteById={this.props.deleteById}
                                competeTasksCounter={this.props.competeTasksCounter}
                                handleMenuClasses={this.props.handleMenuClasses}
                            />}
                    </div>
                </div>
        )
    }
}

export default TodoFilter;