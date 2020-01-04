import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
    tag: {
        margin: 3
    }
}));

const TagsInputField = props => {
    const classes = useStyles();

    /* 
    Params: inputTag (represented by a string)
    Returns the frequency of the input tag.
    */
    const taggingCount = inputTag =>
        props.allTags.filter(tag => tag.name == inputTag)[0].taggings_count;

    return (
        <Autocomplete
            multiple // Allow multiple selection from dropdown
            freeSolo // Allow user to input custom values not in dropdown
            margin="normal"
            options={props.allTags.map(tag => tag.name)}
            renderOption={tag => `${tag} [${taggingCount(tag)}]`}
            onKeyPress={event => {
                if (event.key === "Enter") event.preventDefault();
            }}
            // Convert tags to lowercase, remove duplicates, and map back to array
            value={[...new Set(props.tag_list.map(tag => tag.toLowerCase()))]}
            onChange={props.handleTagUpdate}
            renderTags={(value, getTagProps) =>
                value.map((tag, index) => (
                    <Chip
                        label={tag}
                        key={index}
                        className={classes.tag}
                        {...getTagProps({ index })}
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
    );
};

TagsInputField.propTypes = {
    allTags: PropTypes.array, // array of Tag objects
    tag_list: PropTypes.array, // array of strings
    handleTagUpdate: PropTypes.func,
    label: PropTypes.string
};
export default TagsInputField;
