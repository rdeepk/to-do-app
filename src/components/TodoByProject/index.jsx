import React, { Component } from 'react';

/**
* Child component to display todo for todos by project filter.
*/
class TodoByProject extends Component {
    constructor() {
        super();
        this.state = {
            showTodoDisplay: "block",
            editTodoDisplay: "none"
        }
    }

    /**
    * Sets the state to toggle display between todos in display or edit mode.
    */
    toggleDisplay = () => {
        this.setState({
            showTodoDisplay: this.state.showTodoDisplay === "block" ? "none" : "block",
            editTodoDisplay: this.state.editTodoDisplay === "block" ? "none" : "block"
        })
    }

    /**
    * Handler to submit form data after editing a todo.
    */
    handleFormSubmit(e) {
        this.props.updateTask(this.form, this.props.todo._id)
    }

    deleteTodo(id) {
        this.props.deleteById(id, 'Todo');
    }
   
    componentDidMount() {
        this.props.handleMenuClasses("todos")
    }

    render() {
        //Makes jsx for the edit mode of labels for todos
        let editLabelsJSX = this.props.labels.map((labelObj, i) => {
            let checked = false;
            this.props.todo.labels.forEach((label, j) => {
                if(labelObj._id === label) {
                    checked = true;
                }
            });
            return <div key={i} className="edit-labels">   
                        <label htmlFor="labels">
                            {/* <input type="checkbox" name="labels" id={label.id} checked={label.ischecked}/> */}
                            <input type="checkbox" name="labels" id={labelObj._id} checked={checked}/>
                            {this.props.getTitleById('labels', labelObj._id).title}
                        </label>
                    </div>
        })

        //to store the selected value of status for a todo.
        let existingTodoStatus;

        //sets status options for select dropdown for a todo
        let statusJSX = this.props.status.map((item, i) => {
            if(!existingTodoStatus) {
                existingTodoStatus = (item._id === this.props.todo.status) ? item._id : '';
            }
                return <option value={item._id} key={i}>{item.title}</option>
        })

        //Makes jsx for the display mode of valid labels for todos
        let labelsJSX = this.props.todo.labels.map((label, i) => {
            return <div key={i} className="todo-label">
                        <label htmlFor="labels">
                            <input type="checkbox" name="labels" value={label} checked="checked" />
                            {this.props.getTitleById('labels', label).title}
                        </label>
                    </div>
        })

        //get status title from id of a status
        let status = this.props.getTitleById('status', this.props.todo.status).title;

        //make css name to add styles as per the current value of status
        let statusClass = status.toLowerCase().split(' ').join('-');

        //get the right icon to be displayed on a todo depending upon status.
        let getIcon = () => {
            let icon;
            switch(statusClass) {
                case 'active':
                    icon = <i className="fa fa-ellipsis-h" aria-hidden="true" title="Active"></i>
                    break;
                case 'complete':
                    icon = <i className="fa fa-check" aria-hidden="true" title="Completed"></i>
                    break;
                case 'not-started':
                    icon = <i className="fa fa-book" aria-hidden="true" title="Not Started"></i>
                    break;
            }
            return icon;
        }


        return (
            <div className={"item " + statusClass}>
                {/* display of todos and visible by default */} 
                <div style={{ display: this.state.showTodoDisplay }}>
                    <div className="row">
                        <div className="col-xs-3 col-md-2 check">
                            <div>{getIcon()}</div>
                            <div><button className="edit-link" onClick={this.toggleDisplay}><i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit"></i></button></div>
                            <div><button className="delete-link" onClick={() => {this.deleteTodo(this.props.todo.id)}}><i className="fa fa-trash-o" aria-hidden="true" title="Delete Todo"></i></button></div>
                        </div>
                        <div className="col-xs-9 col-md-10 display">
                            <div className="title"><strong>Task:</strong> {this.props.todo.title}</div>
                            <div className="description"><strong>Description:</strong> {this.props.todo.description}</div>
                            <div className="labels"><strong>Labels:</strong> {labelsJSX}</div>
                            <div className="status"><strong>Status:</strong> {status}</div>
                        </div>
                    </div>
                </div>
                {/* form to edit a todo and hidden by default and is visible when user clicks on edit link */}
                 <div style={{ display: this.state.editTodoDisplay }} className="edit">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <form id="editTodoForm" ref={(form) => { this.form = form }}
                                onChange={(e) => { this.handleFormSubmit(e) }}>
                                <div className="form-group">
                                    <label htmlFor="title">Title: <span className="required">*</span></label>
                                    <input type="text" value={this.props.todo.title} name="title" required="required" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label  htmlFor="description">Description: <span className="required">*</span></label>
                                    <input type="text" name="description" value={this.props.todo.description} required="required" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status: <span className="required">*</span></label>
                                    <select name="status" value={existingTodoStatus}>{statusJSX}</select>
                                </div>
                                <div className="form-group hidden">
                                    <label htmlFor="project">Project: <span className="required">*</span></label>
                                    <input type="text" name="project" value={this.props.todo.project} required="required" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="labels">Labels: {editLabelsJSX}</label>
                                </div>
                                <button type="button" onClick={this.toggleDisplay}>Close</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default TodoByProject;