import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import TagsInputField from "../components/TagsInputField";
import DueDate from "../components/DueDate";

/* 
Params: task title, and task description to be validated
Returns an object with keys "title" or "description" if either title or description
is invalid. If both are valid, an empty object is returned.
*/
const validateForm = (title, description) => {
    const errors = {};

    if (title.length === 0) {
        errors.title = "Title cannot be empty.";
    } else if (title.length > 100) {
        errors.title = "Please keep your title to within 100 characters.";
    }

    if (description.length === 0) {
        errors.description = "Description cannot be empty.";
    }

    return errors;
};

const TaskForm = props => {
    let title;
    let description;
    let tags;

    title = (
        <TextField
            variant="outlined"
            fullWidth
            label="Title"
            margin="normal"
            value={props.title}
            onKeyPress={event => {
                if (event.key === "Enter") event.preventDefault();
            }}
            onChange={props.handleTitleUpdate}
            // Convert string to boolean
            error={!!props.errors.title}
            // Render error message if there is, else render nothing.
            helperText={props.errors.title || ""}
        />
    );

    description = (
        <TextField
            variant="outlined"
            fullWidth
            multiline
            label="Description"
            margin="normal"
            value={props.description}
            //onKeyPress={event => {
            //    if (event.key === "Enter") event.preventDefault();
            //}}
            onChange={props.handleDescriptionUpdate}
            // Convert string to boolean
            error={!!props.errors.description}
            // Render error message if there is, else render nothing.
            helperText={props.errors.description || ""}
        />
    );

    tags = (
        <TagsInputField
            allTags={props.allTags}
            tag_list={props.tag_list}
            handleTagUpdate={props.handleTagUpdate}
            label="Add tags"
        />
    );

    return (
        <React.Fragment>
            <Grid container justify="space-between" alignItems="flex-end">
                <Grid item xs={12}>
                    {title}
                </Grid>

                <Grid item xs={12}>
                    {description}
                </Grid>

                <Grid item xs={12}>
                    {tags}
                </Grid>

                <Grid item xs={4}>
                    <DueDate
                        handleDueDateUpdate={props.handleDueDateUpdate}
                        due_date={props.due_date}
                        /* 
                        True is so that warning for overdue tasks
                        will not be rendered in the form when editing completed
                        and overdue tasks
                        */
                        completed={true}
                    />
                </Grid>

                <Grid item>{props.buttons}</Grid>
            </Grid>
        </React.Fragment>
    );
};

TaskForm.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    tag_list: PropTypes.array, // array of strings
    due_date: PropTypes.instanceOf(Date),
    errors: PropTypes.object,
    allTags: PropTypes.array, // array of Tag objects
    handleTitleUpdate: PropTypes.func,
    handleDescriptionUpdate: PropTypes.func,
    handleTagUpdate: PropTypes.func,
    handleDueDateUpdate: PropTypes.func,
    buttons: PropTypes.element
};

export { validateForm, TaskForm };
