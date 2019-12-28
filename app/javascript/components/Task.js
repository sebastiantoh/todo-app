import React from "react";
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import UndoIcon from '@material-ui/icons/Undo';
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import {validateForm, TaskForm} from "../components/TaskForm";
import DueDate from "../components/DueDate";

const styles = {
    card: {
        width: 'auto',
        margin: 10,
    },
    title: {
        fontWeight: 500,
    },
    rightButtons: {
        marginLeft: 'auto',
        paddingBottom: 3,
    },   
    button: {
        margin: 4,
    },
    greenButton: {
        backgroundColor: "#4caf50",
        color: 'white',
        '&:hover': {
            backgroundColor: "#388e3c",
        },
    },
    tag: {
        margin: 3,
    },
    divider: {
        marginTop: 8,
        marginBottom: 8,
    },
};

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            // TODO: refactor below, may not be necessary to store in state.
            title: this.props.task.title,
            description: this.props.task.description,
            tag_list: this.props.task.tag_list,
            completed: this.props.task.completed,
            due_date: this.props.task.due_date,
            errors: {},
        }
        
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
        this.handleTagUpdate = this.handleTagUpdate.bind(this);
        this.handleDueDateUpdate = this.handleDueDateUpdate.bind(this);
    }

    handleUpdate() {
        if (this.state.editable) {
            let task = {
                id: this.props.task.id, 
                title: this.state.title, 
                description: this.state.description, 
                tag_list: this.state.tag_list,
                completed: this.state.completed,
                due_date: this.state.due_date
            }
            this.props.handleUpdate(task)
        }
        this.setState({
            editable: !this.state.editable,
        })
    }
    
    handleComplete() {
        let task = {
            id: this.props.task.id, 
            title: this.state.title, 
            description: this.state.description, 
            tag_list: this.state.tag_list,
            completed: !this.props.task.completed,
            due_date: this.state.due_date,
        }
        this.props.handleUpdate(task);
        this.setState({
            completed: !this.props.task.completed
        })     
    }

    handleTagDelete(deletedTag) {
        let updatedTagList = this.state.tag_list.filter((tag) => deletedTag !== tag)
        let task = {
            id: this.props.task.id, 
            title: this.state.title, 
            description: this.state.description, 
            tag_list: updatedTagList,
            completed: this.props.task.completed,
            due_date: this.state.due_date,
        }
        this.props.handleUpdate(task)
        this.setState({
            tag_list: updatedTagList,
        })   
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

    handleDueDateUpdate(date) {
        let task = {
            id: this.props.task.id, 
            title: this.state.title, 
            description: this.state.description, 
            tag_list: this.state.tag_list,
            completed: this.state.completed,
            due_date: date,
        }
        this.props.handleUpdate(task);
        this.setState({due_date: date});
    }
    
    render() {
        const { classes } = this.props;
        let taskContent;
        let title;
        let description;
        let tags;
        let buttons;

        if (this.state.editable) {
            taskContent = <TaskForm 
                                title={this.state.title}
                                description={this.state.description}
                                tag_list={this.state.tag_list}
                                allTags={this.props.allTags}
                                errors={this.state.errors}
                                handleTitleUpdate={this.handleTitleUpdate}
                                handleDescriptionUpdate={this.handleDescriptionUpdate}
                                handleTagUpdate={this.handleTagUpdate}
                            />                            
            
            buttons = <React.Fragment>
                        <Button 
                            className={classes.button}
                            variant="contained"
                            size="small" 
                            color="primary" 
                            aria-label="edit" 
                            onClick={() => {
                                const errors = validateForm(this.state.title, 
                                    this.state.description);
                                // check if there are any keys (which corresponds to errors)
                                if (Object.keys(errors).length > 0) {
                                    this.setState({errors: errors})
                                    return;
                                }
                                this.props.handleNewNotification("Task updated");
                                this.handleUpdate()}}
                        >
                            <SaveIcon />
                            &nbsp;Save 
                        </Button>

                        <Button
                            className={classes.button}
                            variant="contained"
                            size="small" 
                            color="secondary" 
                            aria-label="cancel" 
                            onClick={() => this.setState({
                                editable: false,
                                title: this.props.task.title,
                                description: this.props.task.description,
                                tag_list: this.props.task.tag_list,
                                completed: this.props.task.completed,
                                errors: {}
                            })}
                        >
                            <CancelIcon />
                            &nbsp;Cancel 
                        </Button>
                      </React.Fragment>
        } else {
            title = <Typography 
                        className={classes.title} 
                        variant="h5" 
                        gutterBottom
                        component="h2"
                        style={this.state.completed ? 
                            {color: "#949494"} : 
                            undefined
                        }
                    >
                        {this.state.title}                        
                    </Typography>

            // to render new lines correctly
            description = this.state.description.split("\n")
                                .map((i, key) => <Typography 
                                                        key={key}
                                                        variant="body1"
                                                        gutterBottom
                                                        component="p"
                                                        style={this.state.completed ? 
                                                            {color: "#949494"} : 
                                                            undefined
                                                        }
                                                    >
                                                    {i}
                                                </Typography>
                                    )
            
            tags = <React.Fragment>
                    <Divider className={classes.divider} />
                    {this.state.tag_list.map((tag, index) =>
                            <Chip
                                label={tag}
                                key={index}
                                className={classes.tag}
                                style={this.state.completed ? 
                                    {color: "#949494"} : 
                                    undefined
                                }
                                onDelete={() => this.handleTagDelete(tag)}
                            />
                    )}
                </React.Fragment>

            taskContent = <React.Fragment>
                            {title}
                            {description}
                            {tags}
                        </React.Fragment>
            
            buttons = <React.Fragment>
                        <Button 
                            className={classes.button}
                            variant="contained"
                            size="small" 
                            color="primary" 
                            aria-label="edit" 
                            onClick={() => this.handleUpdate()}
                        >
                            <EditIcon />
                            &nbsp;Edit
                        </Button>
                        
                        <Button 
                            className={classes.button}
                            variant="contained"
                            size="small" 
                            color="secondary" 
                            aria-label="delete" 
                            onClick={() => {
                                this.props.handleNewNotification("Task deleted");
                                this.props.handleDelete(this.props.task.id)
                            }}
                        >
                            <DeleteIcon /> 
                            &nbsp;Delete                   
                        </Button>

                        <Button 
                            className={`${classes.button} ${classes.greenButton}`}
                            variant="contained"
                            size="small" 
                            aria-label="complete" 
                            onClick={() => this.handleComplete()}
                        >
                            {this.state.completed
                                ? <React.Fragment>
                                    <UndoIcon />               
                                        &nbsp;Mark as not Done
                                  </React.Fragment> 
                                : <React.Fragment>
                                    <DoneIcon />
                                        &nbsp;Mark as Done  
                                  </React.Fragment>
                            }   
                        </Button>
                    </React.Fragment>
        }

        return (
            <Card 
                className={classes.card} 
                variant="outlined" 
                elevation={3}
                style={this.state.completed ? {backgroundColor: "#f6f6f6"} : undefined}                
            >
                <CardContent>                    
                    {taskContent}                
                </CardContent>
            
                <CardActions style={{padding: "16px"}}>     
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <DueDate 
                                handleDueDateUpdate={this.handleDueDateUpdate}
                                due_date={this.state.due_date}
                            />
                        </Grid>
                        <Grid item>
                            {buttons}
                        </Grid>
                    </Grid>               
                   
                </CardActions>          
                
            </Card>
        )
    }
}

export default withStyles(styles)(Task);