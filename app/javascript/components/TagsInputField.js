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


const TagsInputField = (props) => {
    const classes = useStyles();

    return (
        <Autocomplete
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
                    label={props.label}
                    margin="normal"
                />
            )}
        />
    )
}

export default TagsInputField;