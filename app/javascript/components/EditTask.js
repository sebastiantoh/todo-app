import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

import { validateForm, TaskForm } from "../components/TaskForm";

const styles = {
    button: {
        margin: 4
    }
};

class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.task.title,
            description: this.props.task.description,
            tag_list: this.props.task.tag_list,
            completed: this.props.task.completed,
            due_date: this.props.task.due_date,
            errors: {}
        };

        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
        this.handleTagUpdate = this.handleTagUpdate.bind(this);
        this.handleDueDateUpdate = this.handleDueDateUpdate.bind(this);
    }

    handleTitleUpdate(event) {
        this.setState({ title: event.target.value });
    }

    handleDescriptionUpdate(event) {
        this.setState({ description: event.target.value });
    }

    handleTagUpdate(event, value) {
        this.setState({ tag_list: value });
    }

    /* 
    when in editing mode: only updates due date if user clicks on save.
    when in non-editing mode (Task component): any changes will be immediately
    saved
    */
    handleDueDateUpdate(date) {
        this.setState({ due_date: date });
    }

    render() {
        const { classes } = this.props;
        let editTaskForm;
        let buttons;

        buttons = (
            <React.Fragment>
                <Button
                    className={classes.button}
                    variant="contained"
                    size="medium"
                    color="primary"
                    aria-label="edit"
                    onClick={() => {
                        const errors = validateForm(
                            this.state.title,
                            this.state.description
                        );
                        // check if there are any keys (which corresponds to errors)
                        if (Object.keys(errors).length > 0) {
                            this.setState({ errors: errors });
                            return;
                        }
                        this.props.handleNewNotification("Task updated");
                        this.props.handleSaveTaskUpdate(
                            this.state.title,
                            this.state.description,
                            this.state.tag_list,
                            this.state.completed,
                            this.state.due_date
                        );
                    }}
                >
                    <SaveIcon />
                    &nbsp;Save
                </Button>

                <Button
                    className={classes.button}
                    variant="contained"
                    size="medium"
                    color="secondary"
                    aria-label="cancel"
                    onClick={this.props.toggleTaskEditability}
                >
                    <CancelIcon />
                    &nbsp;Cancel
                </Button>
            </React.Fragment>
        );

        editTaskForm = (
            <TaskForm
                title={this.state.title}
                description={this.state.description}
                tag_list={this.state.tag_list}
                // if due_date is null, return null. Else convert to date.
                due_date={this.state.due_date && new Date(this.state.due_date)}
                allTags={this.props.allTags}
                errors={this.state.errors}
                handleTitleUpdate={this.handleTitleUpdate}
                handleDescriptionUpdate={this.handleDescriptionUpdate}
                handleTagUpdate={this.handleTagUpdate}
                handleDueDateUpdate={this.handleDueDateUpdate}
                buttons={buttons}
            />
        );

        return <React.Fragment>{editTaskForm}</React.Fragment>;
    }
}

EditTask.propTypes = {
    task: PropTypes.object,
    allTags: PropTypes.array,
    toggleTaskEditability: PropTypes.func,
    handleSaveTaskUpdate: PropTypes.func,
    handleNewNotification: PropTypes.func
};

export default withStyles(styles)(EditTask);
