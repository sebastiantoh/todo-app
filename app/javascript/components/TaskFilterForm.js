import React from "react";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
                                props.handleFilterForm(event.target.value, 
                                        props.filterTags, 
                                        props.hideCompletedTasks
                                )
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
                            props.handleFilterForm(props.filterQuery, 
                                    value, 
                                    props.hideCompletedTasks
                            )
                        }}
                        label="Filter based on tags"
                    />   
    
    let hideCompletedTaskSwitch = <FormControlLabel
                                        control={
                                            <Switch
                                                checked={props.hideCompletedTasks}
                                                onChange={(event) => {
                                                    props.handleFilterForm(props.filterQuery, 
                                                            props.filterTags, 
                                                            event.target.checked
                                                    )
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Hide Completed Tasks"
                                    />

    return (
        <React.Fragment>
            {searchField}
            {tagsField}
            {hideCompletedTaskSwitch}
        </React.Fragment>
    )    
}


export default TaskFilterForm;