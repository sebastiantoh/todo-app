import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { isEqual, sortBy } from "lodash-es";

import { validateForm, TaskForm } from "../components/TaskForm";

const styles = {
    root: {
        "& > *": {
            marginBottom: 8
        }
    },
    button: {
        marginLeft: "auto"
    }
};

class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            tag_list: [],
            due_date: null,
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

    handleDueDateUpdate(date) {
        this.setState({ due_date: date });
    }

    shouldComponentUpdate(nextProps, nextState) {
        /*
        If allTags changed, update. If state changed, update.
        Compare 2 arrays by sorting them first
        */
        return (
            !isEqual(sortBy(this.props.allTags), sortBy(nextProps.allTags)) ||
            !isEqual(this.state, nextState)
        );
    }

    render() {
        const { classes } = this.props;

        const buttons = (
            <Button
                className={classes.button}
                variant="contained"
                size="large"
                color="primary"
                aria-label="add"
                type="submit"
            >
                <AddIcon />
                &nbsp;Add New Task
            </Button>
        );
        return (
            <form
                className={classes.root}
                autoComplete="off"
                onSubmit={event => {
                    // To prevent form submission from pressing "Enter"
                    event.preventDefault();

                    const errors = validateForm(
                        this.state.title,
                        this.state.description
                    );

                    // Check if there are any keys (which corresponds to errors)
                    if (Object.keys(errors).length > 0) {
                        this.setState({ errors: errors });
                        return;
                    }

                    // Send new task information to backend
                    this.props.handleFormSubmit(
                        this.state.title,
                        this.state.description,
                        this.state.tag_list,
                        this.state.due_date
                    );

                    // Create new notification
                    this.props.handleNewNotification("Task created");

                    // Reset form input fields
                    this.setState({
                        title: "",
                        description: "",
                        tag_list: [],
                        due_date: null,
                        errors: {}
                    });
                }}
            >
                <TaskForm
                    title={this.state.title}
                    description={this.state.description}
                    tag_list={this.state.tag_list}
                    // If due_date is null, return null. Else convert to date.
                    due_date={
                        this.state.due_date && new Date(this.state.due_date)
                    }
                    errors={this.state.errors}
                    allTags={this.props.allTags}
                    handleTitleUpdate={this.handleTitleUpdate}
                    handleDescriptionUpdate={this.handleDescriptionUpdate}
                    handleTagUpdate={this.handleTagUpdate}
                    handleDueDateUpdate={this.handleDueDateUpdate}
                    buttons={buttons}
                />
            </form>
        );
    }
}

NewTask.propTypes = {
    allTags: PropTypes.array, // array of Tag objects
    handleFormSubmit: PropTypes.func,
    handleNewNotification: PropTypes.func
};

export default withStyles(styles)(NewTask);
