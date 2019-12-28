import React from "react";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import TagsInputField from "../components/TagsInputField";

const TaskFilterSortForm = (props) => {
    let searchField = <TextField
                            variant="outlined"
                            fullWidth 
                            margin="normal"
                            value={props.filterQuery} // to update body: pass in these as props
                            onKeyPress={event => {
                                if (event.key === 'Enter') event.preventDefault();
                            }}
                            onChange={(event) => {
                                props.handleFilterSortForm(event.target.value, 
                                        props.filterTags, 
                                        props.hideCompletedTasks,
                                        props.sortQuery
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
                            props.handleFilterSortForm(props.filterQuery, 
                                    value, 
                                    props.hideCompletedTasks,
                                    props.sortQuery
                            )
                        }}
                        label="Filter based on tags"
                    />   
    
    let hideCompletedTaskSwitch = <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={props.hideCompletedTasks}
                                                    onChange={(event) => {
                                                        props.handleFilterSortForm(props.filterQuery, 
                                                                props.filterTags, 
                                                                event.target.checked,
                                                                props.sortQuery
                                                        )
                                                    }}
                                                    color="primary"
                                                />
                                            }
                                            label="Hide Completed Tasks"
                                        />
                                    </Grid>

    let customSortingField = <Grid item>
                                <FormControlLabel
                                    label="Sort by:&nbsp;&nbsp;"
                                    labelPlacement="start"
                                    control={
                                        <Select
                                            value={props.sortQuery}
                                            onChange={(event) => {
                                                    props.handleFilterSortForm(props.filterQuery,
                                                            props.filterTags,
                                                            props.hideCompletedTasks,
                                                            event.target.value)
                                            }}                                    >
                                            <MenuItem value={"dateCreatedAsc"}>Date Created (Ascending)</MenuItem>
                                            <MenuItem value={"dateCreatedDsc"}>Date Created (Descending)</MenuItem>
                                            <MenuItem value={"titleAsc"}>Title (A-Z)</MenuItem>
                                            <MenuItem value={"titleDsc"}>Title (Z-A)</MenuItem>
                                            <MenuItem value={"tagsAsc"}>Number of Tags (Ascending)</MenuItem>
                                            <MenuItem value={"tagsDsc"}>Number of Tags (Descending)</MenuItem>
                                            <MenuItem value={"completedAsc"}>Completed Tasks First</MenuItem>
                                            <MenuItem value={"completedDsc"}>Uncompleted Tasks First</MenuItem>
                                            <MenuItem value={"dueDateAsc"}>Due Date (Ascending)</MenuItem>
                                            <MenuItem value={"dueDateDsc"}>Due Date (Descending)</MenuItem>
                                        </Select>
                                    }
                                />

                                
                            </Grid>

    return (
        <React.Fragment>
            {searchField}
            {tagsField}
            <Grid container justify="space-between" alignitems="flex-end">
                {hideCompletedTaskSwitch}
                {customSortingField}
            </Grid>
            <div style={{display: "flex",
                            paddingBottom: 3,
                            }}
            >
                
            </div>
        </React.Fragment>
    )    
}

const taskSortKey = {
    dateCreatedAsc: (tasks) => tasks.slice().sort(
            (task1, task2) => {
                let date1 = new Date(task1.created_at);
                let date2 = new Date(task2.created_at);
                return Math.sign(date1 - date2);
            }),
    dateCreatedDsc: (tasks) => tasks.slice().sort(
            (task1, task2) => {
                let date1 = new Date(task1.created_at);
                let date2 = new Date(task2.created_at);
                return Math.sign(date2 - date1);
            }),
    titleAsc: (tasks) => tasks.slice().sort(
            // sensitivity is to ignore casing i.e. a ≠ b, a = A
            (task1, task2) => task1.title.localeCompare(task2.title, 'en', {'sensitivity': 'base'})),
    titleDsc: (tasks) => tasks.slice().sort(
            (task1, task2) => task2.title.localeCompare(task1.title, 'en', {'sensitivity': 'base'})),
    tagsAsc: (tasks) => tasks.slice().sort(
            (task1, task2) => task1.tag_list.length - task2.tag_list.length),
    tagsDsc: (tasks) => tasks.slice().sort(
            (task1, task2) => task2.tag_list.length - task1.tag_list.length),
    completedAsc: (tasks) => tasks.slice().sort(
            (task1, task2) => {
                if (task1.completed) {
                    return -1;
                } else if (task2.completed) {
                    return 1;
                } else {
                    return 0;
                }
            }),
    completedDsc: (tasks) => tasks.slice().sort(
            (task1, task2) => {
                if (task2.completed) {
                    return -1;
                } else if (task1.completed) {
                    return 1;
                } else {
                    return 0;
                }
            }),
    dueDateAsc: (tasks) => tasks.slice().sort(
            (task1, task2) => {
                // tasks without due dates always at the end
                if (task1.due_date == null) {
                    return 1;
                }
                if (task2.due_date == null) {
                    return -1;
                }
                let date1 = new Date(task1.due_date);
                let date2 = new Date(task2.due_date);
                return Math.sign(date1 - date2);
            }),
    dueDateDsc: (tasks) => tasks.slice().sort(
            (task1, task2) => {
                // tasks without due dates always at the end
                if (task1.due_date == null) {
                    return 1;
                }
                if (task2.due_date == null) {
                    return -1;
                }
                let date1 = new Date(task1.due_date);
                let date2 = new Date(task2.due_date);
                return Math.sign(date2 - date1);
        }),
}

export {
    TaskFilterSortForm,
    taskSortKey,
}
