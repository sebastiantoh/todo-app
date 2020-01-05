import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { isEqual, sortBy } from "lodash-es";

import DueDate from "../components/DueDate";
import EditTask from "../components/EditTask";

const styles = {
    card: {
        width: "auto",
        margin: 10
    },
    title: {
        fontWeight: 500
    },
    button: {
        margin: 4
    },
    greenButton: {
        backgroundColor: "#4caf50",
        color: "white",
        "&:hover": {
            backgroundColor: "#388e3c"
        }
    },
    tag: {
        margin: 3
    },
    divider: {
        marginTop: 8,
        marginBottom: 8
    }
};

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false // Whether task can currently be edited by user
        };

        this.handleTaskCompletionStatusUpdate = this.handleTaskCompletionStatusUpdate.bind(
            this
        );
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleDueDateUpdate = this.handleDueDateUpdate.bind(this);
        this.toggleTaskEditability = this.toggleTaskEditability.bind(this);
        this.handleSaveTaskUpdate = this.handleSaveTaskUpdate.bind(this);
    }

    // Updates new task with updated completion status to backend
    handleTaskCompletionStatusUpdate() {
        // Create a copy of current task, and negate current task completion status
        let task = {
            ...this.props.task,
            completed: !this.props.task.completed
        };
        this.props.handleUpdate(task);
    }

    // Updates new task with updated tag list to backend
    handleTagDelete(deletedTag) {
        let updatedTagList = this.props.task.tag_list.filter(
            tag => deletedTag !== tag
        );
        let task = { ...this.props.task, tag_list: updatedTagList };
        this.props.handleUpdate(task);
    }

    // Updates new task with updated due date to backend
    handleDueDateUpdate(date) {
        let task = { ...this.props.task, due_date: date };
        this.props.handleUpdate(task);
    }

    // Called when user clicks "Save" or "Cancel"
    toggleTaskEditability() {
        this.setState({
            editable: !this.state.editable
        });
    }

    // Updates new task details to backend
    handleSaveTaskUpdate(title, description, tag_list, completed, due_date) {
        let task = {
            id: this.props.task.id,
            title: title,
            description: description,
            tag_list: tag_list,
            completed: completed,
            due_date: due_date
        };
        this.props.handleUpdate(task);
        this.toggleTaskEditability();
    }

    shouldComponentUpdate(nextProps, nextState) {
        /*
        If editable, update only when user clicks cancel OR list of tags updates 
        (so that dropdown menu can be re-populated during edit) 
        */

        if (this.state.editable) {
            return (
                this.state.editable != nextState.editable ||
                !isEqual(sortBy(this.props.allTags), sortBy(nextProps.allTags))
            );
        } else {
            /*
            Only update if task changes (can do shallow comparison because each task is immutable)
            or if editability is toggled
            */
            return (
                this.props.task != nextProps.task ||
                this.state.editable != nextState.editable
            );
        }
    }

    render() {
        const { classes } = this.props;
        let cardContent;
        let cardActions;

        if (this.state.editable) {
            cardContent = (
                <React.Fragment>
                    <EditTask
                        task={this.props.task}
                        allTags={this.props.allTags}
                        toggleTaskEditability={this.toggleTaskEditability}
                        handleSaveTaskUpdate={this.handleSaveTaskUpdate}
                        handleNewNotification={this.props.handleNewNotification}
                    />
                </React.Fragment>
            );
        } else {
            let title;
            let description;
            let tags;

            title = (
                <Typography
                    className={classes.title}
                    variant="h5"
                    gutterBottom
                    component="h2"
                    style={
                        // Greyish font color to indicate completed task
                        this.props.task.completed
                            ? { color: "#949494" }
                            : undefined
                    }
                >
                    {this.props.task.title}
                </Typography>
            );

            // To render new lines correctly
            description = this.props.task.description
                .split("\n")
                .map((i, key) => (
                    <Typography
                        key={key}
                        variant="body1"
                        gutterBottom
                        component="p"
                        style={
                            // Greyish font color to indicate completed task
                            this.props.task.completed
                                ? { color: "#949494" }
                                : undefined
                        }
                    >
                        {/* If i is empty string, render new line instead. */}
                        {i || <br />}
                    </Typography>
                ));

            tags = (
                <React.Fragment>
                    <Divider className={classes.divider} />
                    {this.props.task.tag_list.map((tag, index) => (
                        <Chip
                            label={tag}
                            key={index}
                            className={classes.tag}
                            style={
                                // Greyish font color to indicate completed task
                                this.props.task.completed
                                    ? { color: "#949494" }
                                    : undefined
                            }
                            onDelete={() => this.handleTagDelete(tag)}
                        />
                    ))}
                </React.Fragment>
            );

            cardContent = (
                <React.Fragment>
                    {title}
                    {description}
                    {tags}
                </React.Fragment>
            );

            let buttons = (
                <React.Fragment>
                    <Button
                        className={classes.button}
                        variant="contained"
                        size="medium"
                        color="primary"
                        aria-label="edit"
                        onClick={this.toggleTaskEditability}
                    >
                        <EditIcon />
                        &nbsp;Edit
                    </Button>

                    <Button
                        className={classes.button}
                        variant="contained"
                        size="medium"
                        color="secondary"
                        aria-label="delete"
                        onClick={() => {
                            this.props.handleNewNotification("Task deleted");
                            this.props.handleDelete(this.props.task.id);
                        }}
                    >
                        <DeleteIcon />
                        &nbsp;Delete
                    </Button>

                    <Button
                        className={`${classes.button} ${classes.greenButton}`}
                        variant="contained"
                        size="medium"
                        aria-label="complete"
                        onClick={this.handleTaskCompletionStatusUpdate}
                    >
                        {this.props.task.completed ? (
                            <React.Fragment>
                                <UndoIcon />
                                &nbsp;Mark as not Done
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <DoneIcon />
                                &nbsp;Mark as Done
                            </React.Fragment>
                        )}
                    </Button>
                </React.Fragment>
            );

            cardActions = (
                <CardActions style={{ padding: "16px" }}>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="flex-end"
                    >
                        <Grid item>
                            <DueDate
                                handleDueDateUpdate={this.handleDueDateUpdate}
                                // If due_date is null, return null. Else convert to date.
                                due_date={
                                    this.props.task.due_date &&
                                    new Date(this.props.task.due_date)
                                }
                                completed={this.props.task.completed}
                            />
                        </Grid>
                        <Grid item>{buttons}</Grid>
                    </Grid>
                </CardActions>
            );
        }

        return (
            <Card
                className={classes.card}
                variant="outlined"
                elevation={3}
                style={
                    // Greyish background to indicate completed task
                    this.props.task.completed
                        ? { backgroundColor: "#f6f6f6" }
                        : undefined
                }
            >
                <CardContent>{cardContent}</CardContent>

                {cardActions}
            </Card>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object,
    allTags: PropTypes.array, // array of Tag objects
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func,
    handleNewNotification: PropTypes.func
};

export default withStyles(styles)(Task);
