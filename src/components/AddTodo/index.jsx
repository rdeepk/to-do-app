import React, { Component } from 'react';
import { Link } from 'react-router-dom';


/**
*  To add a new Todo.
*/
class AddTodo extends Component {
    constructor() {
        super();
        this.state = {
            addNewButtonDisplay: "inline-block",
            displaySuccessMessage: "none"
        }
    }

    /**
    * Sets the state to toggle display between add new button and add new todo form.
    */
    toggleDisplay = () => {
         this.setState({
            addNewButtonDisplay: this.state.addNewButtonDisplay === "inline-block" ? "none" : "inline-block",
            displaySuccessMessage: this.state.displaySuccessMessage === "block" ? "none" : "block",
         })     
    }

    // componentDidMount() {
    //     this.props.handleMenuClasses({
    //         addNew : "active",
    //         todos: "",
    //         projects: "",
    //         labels: ""
    //     })
    // }

    componentDidMount() {
        this.props.handleMenuClasses("addNew")
    }

    /**
    * Handler to submit form data after adding a new todo.
    */
    handleFormSubmit(e) {
        e.preventDefault();
        this.props.addNewTask(this.form)
        this.toggleDisplay();
        this.form.reset();
    }

    render() {
        //sets the options for projects dropdown in add new todo form.
        let projectsJSX = this.props.projects.map((project, i) =>{
                return <option value={project.id} key={i}>{project.title}</option>
        })

        //sets the options for status dropdown in add new todo form.
        let statusJSX = this.props.status.map((item, i) =>{
            return <option value={item.id} key={i}>{item.title}</option>
        })

        // sets checkboxes JSX for all existing labels for add new todo form.
        let editLabelsJSX = this.props.labels.map((label, i) => {
            return   <label htmlFor="labels" key={i}>
                        <input type="checkbox" name="labels" id={label.id}/>
                        {label.title}
                    </label>
        })

        return (
            // add new task form
            <div className="add-new-task">
                <section>
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Add New Task</h3>
                    </div>
                </div> 	
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <form id="contactForm"  ref={(form) => { this.form = form }}
                                                onSubmit={(e) => { this.handleFormSubmit(e) }}>
                        <div className="form-group">
                            <label htmlFor="name">Title:</label>
                            <input type="text" name="title" required="required" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input type="text" name="description" required="required" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="project">Project:</label>
                            <select name="project">{projectsJSX}</select>
                            <label htmlFor="status">Status:</label>
                            <select name="status">{statusJSX}</select>
                            <label className="labels">Labels: {editLabelsJSX}</label>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add" />
                        </div>
                        </form>
                    </div>
                </div>                        
            </section>
            <div className="success" style={{display: this.state.displaySuccessMessage}}>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <p>New Todo is added. Please {<Link to="/">click here</Link>} to view todos.</p>
                    </div>
                </div>
            </div>
        </div> 
        )
    }
}

export default AddTodo;