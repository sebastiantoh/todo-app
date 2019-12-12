import React from "react"

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    
    handleUpdate() {
        if (this.state.editable) {
            let title = this.title.value;
            let description = this.description.value;
            let id = this.props.task.id;
            let task = {id: id, title: title, description: description}
            this.props.handleUpdate(task)
        }
        this.setState({
            editable: !this.state.editable,
        })
    }

    render() {
        let title;
        let description;
        if (this.state.editable) {
            title = <input type='text' 
                        ref={input => this.title = input} 
                        defaultValue={this.props.task.title}
                    />
            description = <input type='text' 
                            ref={input => this.description = input} 
                            defaultValue={this.props.task.description}
                            />
        } else {
            title = <React.Fragment>{this.props.task.title}</React.Fragment>
            description = <React.Fragment>{this.props.task.description}</React.Fragment>
        }

        return (
            <React.Fragment>
                <td>{title}</td>
                <td>{description}</td>

                <button onClick={() => this.handleUpdate()}>
                    {this.state.editable ? 'Save' : 'Edit'}
                </button>

                <button 
                    onClick={() => this.props.handleDelete(this.props.task.id)}
                >
                    Delete
                </button>
            </React.Fragment>
        )
    }
}

export default Task;
