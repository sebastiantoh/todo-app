import React from "react";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import TagsInputField from "../components/TagsInputField";

class TaskFilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterQuery: "",
            filterTags: []
        }
        this.handleFilterQueryUpdate = this.handleFilterQueryUpdate.bind(this);
        this.handleTagUpdate = this.handleTagUpdate.bind(this);
    }
    
    handleFilterQueryUpdate(event) {
        this.setState({filterQuery: event.target.value}, () =>
                this.props.handleFilteredTasks(this.state.filterQuery, this.state.filterTags)
        );
    }

    handleTagUpdate(event, value) {
        this.setState({filterTags: value}, () => 
                this.props.handleFilteredTasks(this.state.filterQuery, this.state.filterTags)
        );
    }

    render() {
        let searchField = <TextField
                                variant="outlined"
                                fullWidth 
                                margin="normal"
                                value={this.state.filterQuery}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') event.preventDefault();
                                }}
                                onChange={this.handleFilterQueryUpdate}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

        let tagsField = <TagsInputField
                            allTags={this.props.allTags} 
                            tag_list={this.state.filterTags}
                            handleTagUpdate={this.handleTagUpdate}
                            label="Filter based on tags"
                        />   

        return (
            <React.Fragment>
                {searchField}
                {tagsField}
            </React.Fragment>
        )
    }
}

export default TaskFilterForm;