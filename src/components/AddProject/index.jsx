import React, { Component } from 'react';

/**
*  To add a new project.
*/
class AddProject extends Component {

    /**
    * Handler to submit form data after adding a new project.
    */
    handleFormSubmit(e) {
        e.preventDefault();
        this.props.addNewProject(this.form)
        this.form.reset();
    }

    componentDidMount() {
        this.props.handleMenuClasses("projects")
    }

    render() {
        //makes JSX for the list of existing projects.
        let projectsJSX = this.props.projects.map((project, i) => {
            return <span key={i}>{project.title} </span>
        })

        return (
            // add new task form
            <div className="add-new-task">
                <section>
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Add New Project</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="list">
                                <label>Existing Projects:</label>
                                <label>{projectsJSX}</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <form id="contactForm" ref={(form) => { this.form = form }}
                                onSubmit={(e) => { this.handleFormSubmit(e) }}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" name="title" required="required" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Add" />
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default AddProject;