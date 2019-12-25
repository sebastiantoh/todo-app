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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Divider from '@material-ui/core/Divider';

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
        paddingBottom: 0,
    },   
    button: {
        margin: 3,
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
            title: this.props.task.title,
            description: this.props.task.description,
            tag_list: this.props.task.tag_list,
            completed: this.props.task.completed,
            errors: {}
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleTaskComplete = this.handleTaskComplete.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
    }
    
    validateForm(title, description) {
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

    handleUpdate() {
        if (this.state.editable) {
            let task = {id: this.props.task.id, 
                title: this.state.title, 
                description: this.state.description, 
                tag_list: this.state.tag_list}
            this.props.handleUpdate(task)
        }
        this.setState({
            editable: !this.state.editable,
        })
    }
    
    handleTaskComplete() {
        let task = {id: this.props.task.id, 
            title: this.state.title, 
            description: this.state.description, 
            tag_list: this.state.tag_list,
            completed: !this.props.task.completed,
        }
        this.props.handleUpdate(task);
        this.setState({
            completed: !this.props.task.completed
        })     
    }

    handleTagDelete(deletedTag) {
        let updatedTagList = this.state.tag_list.filter((tag) => deletedTag !== tag)
        let task = {id: this.props.task.id, 
            title: this.state.title, 
            description: this.state.description, 
            tag_list: updatedTagList,
            completed: this.props.task.completed,
        }
        this.props.handleUpdate(task)
        this.setState({
            tag_list: updatedTagList,
        })
        
    }

    render() {
        const { classes } = this.props;
        let title;
        let description;
        let tags;
        let buttons;

        if (this.state.editable) {
            title = <TextField 
                        id="outlined-full-width" 
                        variant="outlined"
                        fullWidth 
                        label="Title"
                        margin="normal"
                        value={this.state.title}
                        onChange={(event)=>{this.setState({title: event.target.value})}}
                        error={this.state.errors.title}
                        // render error message if there is, else render empty.
                        helperText={this.state.errors.title || ""}
                    />
                    
            description = <TextField 
                            id="outlined-full-width" 
                            variant="outlined"
                            fullWidth 
                            multiline
                            label="Description"
                            margin="normal"
                            value={this.state.description}
                            onChange={(event)=>{this.setState({description: event.target.value})}}
                            error={this.state.errors.description}
                            // render error message if there is, else render empty.
                            helperText={this.state.errors.description || ""}
                            />

            tags = <Autocomplete
                        multiple
                        freeSolo
                        id="tags-filled"
                        options={this.props.allTags.map(tag => tag.name)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') event.preventDefault();
                        }}
                        // convert tags to lowercase, remove duplicates, and map back to array
                        value={[...new Set(this.state.tag_list.map(tag => tag.toLowerCase()))]}
                        onChange={(event, value) => this.setState({tag_list: value})}
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

            buttons = <React.Fragment>
                        <Button 
                            className={classes.button}
                            variant="contained"
                            size="small" 
                            color="primary" 
                            aria-label="edit" 
                            onClick={() => {
                                const errors = this.validateForm(this.state.title, 
                                    this.state.description);
                                // check if there are any keys (which corresponds to errors)
                                if (Object.keys(errors).length > 0) {
                                    this.setState({errors: errors})
                                    return;
                                }
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
                            onClick={() => this.props.handleDelete(this.props.task.id)}
                        >
                            <DeleteIcon /> 
                            &nbsp;Delete                   
                        </Button>

                        <Button 
                            className={`${classes.button} ${classes.greenButton}`}
                            variant="contained"
                            size="small" 
                            aria-label="complete" 
                            onClick={() => this.handleTaskComplete()}
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
                    {title}                 
                    {description}
                    
                    {tags}                    
                </CardContent>
                            
            
                <CardActions disableSpacing>                    
                    <div className={classes.rightButtons}>
                        {buttons}
                    </div>

                </CardActions>               
                
            </Card>
        )
    }
}

export default withStyles(styles)(Task);