import React from "react";
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import UndoIcon from '@material-ui/icons/Undo';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import DueDate from "../components/DueDate";
import EditTask from "../components/EditTask";

const styles = {
    card: {
        width: 'auto',
        margin: 10,
    },
    title: {
        fontWeight: 500,
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
        }
        
        this.handleTaskCompletionStatusUpdate = this.handleTaskCompletionStatusUpdate.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleDueDateUpdate = this.handleDueDateUpdate.bind(this);
        this.toggleTaskEditability = this.toggleTaskEditability.bind(this);
        this.handleSaveTaskUpdate = this.handleSaveTaskUpdate.bind(this);
    }
    
    handleTaskCompletionStatusUpdate() {
        let task = {...this.props.task, 
            completed: !this.props.task.completed
        }
        // updates new task completion status to backend
        this.props.handleUpdate(task);   
    }

    handleTagDelete(deletedTag) {
        let updatedTagList = this.props.task.tag_list.filter((tag) => deletedTag !== tag)
        let task = {...this.props.task, 
            tag_list: updatedTagList,
        }
        // updates new tag list to backend
        this.props.handleUpdate(task)
    }

    handleDueDateUpdate(date) {
        let task = {...this.props.task,
            due_date: date,
        }
        // updates new due dateto backend
        this.props.handleUpdate(task);
    }
    
    // called when user clicks "Save" or "Cancel"
    toggleTaskEditability() {
        this.setState({
            editable: !this.state.editable,
        })
    }
    
    handleSaveTaskUpdate(title, description, tag_list, completed, due_date) {
        let task = {
            id: this.props.task.id, 
            title: title, 
            description: description, 
            tag_list: tag_list,
            completed: completed,
            due_date: due_date,
        }
        // updates new task details to backend
        this.props.handleUpdate(task);
        this.toggleTaskEditability();
    }

    render() {
        const { classes } = this.props;
        let cardContent;
        let cardActions;

        if (this.state.editable) {
            cardContent = <React.Fragment>                                 
                            <EditTask 
                                task={this.props.task}
                                allTags={this.props.allTags}
                                toggleTaskEditability={this.toggleTaskEditability}
                                handleSaveTaskUpdate={this.handleSaveTaskUpdate}
                                handleNewNotification={this.props.handleNewNotification}
                            />
                        </React.Fragment>
        } else {
            let title;
            let description;
            let tags;

            title = <Typography 
                        className={classes.title} 
                        variant="h5" 
                        gutterBottom
                        component="h2"
                        style={this.props.task.completed ? 
                            {color: "#949494"} : 
                            undefined
                        }
                    >
                        {this.props.task.title}                        
                    </Typography>

            // to render new lines correctly
            description = this.props.task.description.split("\n")
                                .map((i, key) => <Typography 
                                                        key={key}
                                                        variant="body1"
                                                        gutterBottom
                                                        component="p"
                                                        style={this.props.task.completed ? 
                                                            {color: "#949494"} : 
                                                            undefined
                                                        }
                                                    >
                                                    {i}
                                                </Typography>
                                    )
            
            tags = <React.Fragment>
                    <Divider className={classes.divider} />
                    {this.props.task.tag_list.map((tag, index) =>
                            <Chip
                                label={tag}
                                key={index}
                                className={classes.tag}
                                style={this.props.task.completed ? 
                                    {color: "#949494"} : 
                                    undefined
                                }
                                onDelete={() => this.handleTagDelete(tag)}
                            />
                    )}
                </React.Fragment>

            cardContent = <React.Fragment>
                            {title}
                            {description}
                            {tags}
                        </React.Fragment>
            
            let buttons = <React.Fragment>
                                <Button 
                                    className={classes.button}
                                    variant="contained"
                                    size="medium" 
                                    color="primary" 
                                    aria-label="edit" 
                                    onClick={() => this.toggleTaskEditability()}
                                >
                                    <EditIcon />
                                    &nbsp;Edit
                                </Button>
                            
                                <Button 
                                    className={classes.button}
                                    variant="contained"
                                    size="medium" 
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
                                    size="medium" 
                                    aria-label="complete" 
                                    onClick={() => this.handleTaskCompletionStatusUpdate()}
                                >
                                    {this.props.task.completed
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

            cardActions = <CardActions style={{padding: "16px"}}>     
                                <Grid container justify="space-between" alignItems="flex-end">
                                    <Grid item>
                                        <DueDate 
                                            handleDueDateUpdate={this.handleDueDateUpdate}
                                            due_date={this.props.task.due_date}
                                            completed={this.props.task.completed}
                                        />
                                    </Grid>
                                    <Grid item>
                                        {buttons}
                                    </Grid>
                                </Grid>               
                            </CardActions> 
        }

        return (
            <Card 
                className={classes.card} 
                variant="outlined" 
                elevation={3}
                style={this.props.task.completed ? {backgroundColor: "#f6f6f6"} : undefined}                
            >   
                <CardContent>
                    {cardContent}
                </CardContent>
                
                {cardActions}              
            </Card>
        )
    }
}

export default withStyles(styles)(Task);