import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles(theme => ({
    tag: {
        margin: 3,
    },
}));

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
    const classes = useStyles();

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

    tags = <Autocomplete
                multiple
                freeSolo
                id="tags-filled"
                options={props.allTags.map(tag => tag.name)}
                onKeyPress={event => {
                    if (event.key === 'Enter') event.preventDefault();
                }}
                // convert tags to lowercase, remove duplicates, and map back to array
                value={[...new Set(props.tag_list.map(tag => tag.toLowerCase()))]}
                onChange={props.handleTagUpdate}
                renderTags={(value, getTagProps) =>
                    value.map((tag, index) => (
                        <Chip 
                            label={tag}
                            key={index}
                            className={classes.tag}
                            {...getTagProps({index})} 
                        />
                    ))
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        label="Add tags"
                        margin="normal"
                    />
                )}
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