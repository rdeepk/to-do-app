import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TodoFilter from '../TodoFilter';
import AddTodo from '../AddTodo';
import AddProject from '../AddProject';
import AddLabel from '../AddLabel';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: "all",
            filteredTodos: this.props.todos,
            todosFilter: "default",
            todoListIsHidden: false,
            projectListIsHidden: true,
            displayClearForDefaultTodos: "inline-block",
            todosMenuClass: "active",
            addNewMenuClass: "",
            labelsMenuClass: "",
            projectsMenuClass: ""
        }
    }

    /**
    * Handler for todos filter for default display format and display by project.
    */
    handleTodosFilter = (e) => {
        this.setState({
            todosFilter: e.target.value
        }, () => this.toggleDisplay());
    }

    /**
    * sets state to hide or show components as per user input.
    */
    toggleDisplay = () => {
        this.setState({
            projectListIsHidden: this.state.projectListIsHidden ? false : true,
            todoListIsHidden: this.state.todoListIsHidden ? false : true,
            displayClearForDefaultTodos: this.state.displayClearForDefaultTodos === "none" ? "inline-block" : "none"
        })
    }

    /**
    * Called by handleFilterByStatus to get the todos filtered by status. The current status value is taken from selectValue state
    */
    filterTodos = () => {
        let filteredTodos;
        if (this.state.selectValue === "all") {
            filteredTodos = this.props.todos;
        } else {
            filteredTodos = this.props.todos.filter((todo, item) => {
                return (todo.status === this.state.selectValue)? true:false
            })
        }
        this.setState({
            filteredTodos: filteredTodos
        })
    }

    /**
    * Handler for Filter todos by status on change event of select.
    */
    handleFilterByStatus = (e) => {
        this.setState({
            selectValue: e.target.value
        }, () => this.filterTodos())
    }

    /**
    * Handler clear complete button on click event.
    */
    handleClearComplete = (projectId) => {
        let completeTodos = [];
        this.props.todos.forEach((todo, i) => {
            if (Number(todo.status) === 101) {
                completeTodos.push(todo.id);
            }
        })
        this.props.removeTodos(completeTodos);
    }

    handleMenuClasses = (key) => {
        switch(key) {
            case "todos":
                this.setState({
                    todosMenuClass : "active",
                    addNewMenuClass: "",
                    labelsMenuClass:"",
                    projectsMenuClass:""
                })
            break;
            case "addNew":
                this.setState({
                    todosMenuClass :"",
                    addNewMenuClass: "active",
                    labelsMenuClass:"",
                    projectsMenuClass:""
                })
            break;
            case "projects":
                this.setState({
                    todosMenuClass :"",
                    addNewMenuClass: "",
                    labelsMenuClass:"",
                    projectsMenuClass:"active"
                })
            break;
            case "labels":
                this.setState({
                    todosMenuClass :"",
                    addNewMenuClass: "",
                    labelsMenuClass:"active",
                    projectsMenuClass:""
                })
                break;
        }
    }

    // handleMenuClasses = (classesObj) => {
    //     for(let key in classesObj) {
    //         let stateKey = key + 'MenuClass';
    //         this.state[stateKey] = classesObj[key];
    //         console.log(classesObj);
    //         console.log(this.state[stateKey]);
    //         this.setState(this.state[stateKey]);
    //     }
    // }



    render() {
        
        // css for disable and enable clear complete button
        let clearBtnCss = {};

        if (!this.props.competeTasksCounter) {
            clearBtnCss = {
                "backgroundColor": "#ccc",
                "pointerEvents": "none",
                "color": "#000",
                display: this.state.displayClearForDefaultTodos
            }
        } else {
            clearBtnCss = {
                "backgroundColor": "#111",
                "pointerEvents": "auto",
                "color": "#fff",
                display: this.state.displayClearForDefaultTodos
            }
        }


        //assign status options for filter.
        let selectJSX = this.props.status.map((state, i) => {
            return <option value={state._id} key={i}>{state.title}</option>
        })
        return (
            <div>
                <nav className="site-nav">
                    <div className="container-fluid">
                        <ul>
                            <li className={this.state.todosMenuClass}><Link to="/">Todos</Link></li>
                            <li className={this.state.addNewMenuClass}><Link to="/addnew">Add New Todo</Link></li>
                            <li className={this.state.projectsMenuClass}><Link to="/projects">Projects</Link></li>
                            <li className={this.state.labelsMenuClass}><Link to="/labels">Labels</Link></li>
                        </ul>
                        {/* <!-- /.navbar-collapse --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </nav>
                <nav className="nav-sub">
                    <div className="container-fluid">
                        <ul>
                        <li><select className="todos-filter" value={this.state.todosFilter} onChange={this.handleTodosFilter}>
                            <option value="default">Default</option>
                            <option value="filterByProject">Filter by project</option>
                        </select></li>
                        <li><select className="todos-by-status" value={this.state.selectValue} onChange={this.handleFilterByStatus}>
                            <option value="all">All</option>
                            {selectJSX}
                        </select></li>
                        <li><button style={clearBtnCss} onClick={() => { this.handleClearComplete(this.props.id) }}>Clear Complete</button></li>
                        </ul>
                        {/* <!-- /.navbar-collapse --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </nav>
                <Route path="/addnew" exact render={(props) => (<AddTodo    projects={this.props.projects}
                                                                            status={this.props.status}
                                                                            labels={this.props.labels}
                                                                            addNewTask={this.props.addNewTask}
                                                                            handleMenuClasses={this.handleMenuClasses}
                                                                    />
                )} />
                <Route path="/" exact render={(props) => (<TodoFilter   getTitleById={this.props.getTitleById}
                                                                        removeTodos={this.props.removeTodos}
                                                                        status={this.props.status}
                                                                        updateTask={this.props.updateTask}
                                                                        todos={this.state.filteredTodos}
                                                                        projects={this.props.projects}
                                                                        labels={this.props.labels}
                                                                        competeTasksCounter={this.props.competeTasksCounter}
                                                                        todoListIsHidden={this.state.todoListIsHidden}
                                                                        projectListIsHidden={this.state.projectListIsHidden}
                                                                        deleteById={this.props.deleteById}
                                                                        handleMenuClasses={this.handleMenuClasses}
                                                                    />
                )} />
                <Route path="/projects" exact render={(props) => (<AddProject    projects={this.props.projects}
                                                                            status={this.props.status}
                                                                            labels={this.props.labels}
                                                                            addNewProject={this.props.addNewProject}
                                                                            handleMenuClasses={this.handleMenuClasses}
                                                                    />
                )} />
                <Route path="/labels" exact render={(props) => (<AddLabel    projects={this.props.projects}
                                                                            status={this.props.status}
                                                                            labels={this.props.labels}
                                                                            addNewLabel={this.props.addNewLabel}
                                                                            handleMenuClasses={this.handleMenuClasses}
                                                                    />
                )} />
            </div>
        )
    }
}

export default Header;