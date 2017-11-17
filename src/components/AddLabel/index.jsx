import React, { Component } from 'react';

/**
*  To add a new Todo.
*/
class AddLabel extends Component {

    /**
    * Handler to submit form data after adding a new todo.
    */
    handleFormSubmit(e) {
        e.preventDefault();
        this.props.addNewLabel(this.form)
        this.form.reset();
    }

    componentDidMount() {
        this.props.handleMenuClasses("labels")
    }

    render() {

        // sets checkboxes JSX for all existing labels for add new todo form.
        let labelsJSX = this.props.labels.map((label, i) => {
            return <span key={i}>{label.title} </span>
        })

        return (
            // add new task form
            <div className="add-new-task">
                <section>
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Add New Label</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="list">
                                <label>Existing Labels: </label>
                                <label>{labelsJSX}</label>
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

export default AddLabel;