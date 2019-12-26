import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import {validateForm, TaskForm} from "../components/TaskForm";

const styles = {
    root: {
        '& > *': {
          marginBottom: 8,
        },
    },
    button: {
        marginLeft: 'auto',

    },  
};

class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            tag_list: [],
            errors: {},
        }
        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
        this.handleTagUpdate = this.handleTagUpdate.bind(this);
    }

    handleTitleUpdate(event) {
        this.setState({title: event.target.value});
    }

    handleDescriptionUpdate(event) {
        this.setState({description: event.target.value});
    }
    
    handleTagUpdate(event, value) {
        this.setState({tag_list: value});
    }
    
    
    render() {
        const { classes } = this.props;

        return (
            <form 
                className={classes.root}
                autoComplete="off"
                onSubmit={(event) => {
                        event.preventDefault();

                        const errors = validateForm(this.state.title, 
                                this.state.description);

                        // check if there are any keys (which corresponds to errors)
                        if (Object.keys(errors).length > 0) {
                            this.setState({errors: errors})
                            return;
                        }

                        this.props.handleFormSubmit(this.state.title, 
                            this.state.description, this.state.tag_list); 
                        this.props.handleNewNotification("Task created");
                        this.setState({title: '', 
                                description: '', 
                                tag_list: [],
                                errors: {}})
                }}
            >
                <TaskForm 
                    title={this.state.title}
                    description={this.state.description}
                    tag_list={this.state.tag_list}
                    allTags={this.props.allTags}
                    errors={this.state.errors}
                    handleTitleUpdate={this.handleTitleUpdate}
                    handleDescriptionUpdate={this.handleDescriptionUpdate}
                    handleTagUpdate={this.handleTagUpdate}
                />

                <div style={{display: "flex",
                            paddingBottom: 3,
                            }}
                >
                    <Button 
                        className={classes.button}
                        variant="contained"
                        size="small" 
                        color="primary" 
                        aria-label="add" 
                        type="submit"
                    >
                        <AddIcon />
                        &nbsp;Add New Task 
                    </Button>
                </div>

            </form>
        )
    }
}
export default withStyles(styles)(NewTask);