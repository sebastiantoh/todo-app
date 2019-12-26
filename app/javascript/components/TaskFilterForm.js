import React from "react";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import TagsInputField from "../components/TagsInputField";

const TaskFilterForm = (props) => {
    let searchField = <TextField
                            variant="outlined"
                            fullWidth 
                            margin="normal"
                            value={props.filterQuery} // to update body: pass in these as props
                            onKeyPress={event => {
                                if (event.key === 'Enter') event.preventDefault();
                            }}
                            onChange={(event) => {
                                props.handleFilterForm(event.target.value, props.filterTags)
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

    let tagsField = <TagsInputField
                        allTags={props.allTags} 
                        tag_list={props.filterTags}
                        handleTagUpdate={(event, value) => {
                            props.handleFilterForm(props.filterQuery, value)
                        }}
                        label="Filter based on tags"
                    />   

    return (
        <React.Fragment>
            {searchField}
            {tagsField}
        </React.Fragment>
    )    
}


export default TaskFilterForm;