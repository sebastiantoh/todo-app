import React from "react";
import TextField from '@material-ui/core/TextField';

import TagsInputField from "../components/TagsInputField";

const validateForm = (title, description) => {
    const errors = {}

    if (title.length === 0) {
        errors.title = "Title cannot be empty."
    } else if (title.length > 50) {
        errors.title = "Please keep your title to within 50 characters."
    }

    if (description.length === 0) {
        errors.description = "Description cannot be empty."
    }

    return errors;
}

const TaskForm = (props) => {
    let title;
    let description;
    let tags;

    title = <TextField 
                id="outlined-full-width" 
                variant="outlined"
                fullWidth 
                label="Title"
                margin="normal"
                value={props.title}
                onKeyPress={event => {
                    if (event.key === 'Enter') event.preventDefault();
                }}
                onChange={props.handleTitleUpdate}

                // convert string to boolean
                error={!!props.errors.title}

                // render error message if there is, else render empty.
                helperText={props.errors.title || ""}
            />

    description = <TextField 
                    id="outlined-full-width" 
                    variant="outlined"
                    fullWidth 
                    multiline
                    label="Description"
                    margin="normal"
                    value={props.description}
                    onKeyPress={event => {
                        if (event.key === 'Enter') event.preventDefault();
                    }}
                    onChange={props.handleDescriptionUpdate}
                    // convert string to boolean
                    error={!!props.errors.description}
                    // render error message if there is, else render empty.
                    helperText={props.errors.description || ""}
                />

    tags = <TagsInputField 
                    allTags={props.allTags}
                    tag_list={props.tag_list}
                    handleTagUpdate={props.handleTagUpdate}
                    label="Add tags"
            />
    
    return (
        <React.Fragment>
            {title}
            {description}
            {tags}
        </React.Fragment>
    )
}

export {
    validateForm,
    TaskForm,
}