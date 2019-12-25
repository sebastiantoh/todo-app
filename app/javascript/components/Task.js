import React from "react";
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
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
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
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

    handleTagDelete(deletedTag) {
        let updatedTagList = this.state.tag_list.filter((tag) => deletedTag !== tag)
        let task = {id: this.props.task.id, 
            title: this.state.title, 
            description: this.state.description, 
            tag_list: updatedTagList}
        this.props.handleUpdate(task)
    }

    render() {
        const { classes } = this.props;
        let title;
        let description;
        let tags;
        if (this.state.editable) {
            title = <TextField 
                        id="outlined-full-width" 
                        variant="outlined"
                        fullWidth 
                        label="Title"
                        margin="normal"
                        // inputRef={input => this.title = input} 
                        // TODO: modify this inputRef. see NewTask.js
                        value={this.state.title}
                        onChange={(event)=>{this.setState({title: event.target.value})}}
                        // defaultValue={this.props.task.title}
                    />
            description = <TextField 
                            id="outlined-full-width" 
                            variant="outlined"
                            fullWidth 
                            multiline
                            label="Description"
                            margin="normal"
                            // inputRef={input => this.description = input} 
                            // defaultValue={this.props.task.description}
                            value={this.state.description}
                            onChange={(event)=>{this.setState({description: event.target.value})}}
                            />

            tags = <Autocomplete
                        multiple
                        freeSolo
                        id="tags-filled"
                        options={this.props.allTags.map(tag => tag.name)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') event.preventDefault();
                        }}
                        value={this.state.tag_list}
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
        } else {
            title = <Typography 
                        className={classes.title} 
                        variant="h5" 
                        gutterBottom
                        component="h2"
                    >
                        {this.state.title}
                    </Typography>

            // to render new lines correctly
            description = this.state.description.split("\n")
                                .map((i, key) => <Typography 
                                                        key={key}
                                                        variant="body1"
                                                        gutterBottom
                                                        component="p">
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
                                onDelete={() => this.handleTagDelete(tag)}
                            />
                    )}
                </React.Fragment>
            
        }

        return (
            <Card className={classes.card} variant="outlined" elevation={3}>
                <CardContent>                    
                    {title}                 
                    {description}
                    
                    {tags}                    
                </CardContent>
                            
            
                <CardActions disableSpacing>                    
                    <div className={classes.rightButtons}>
                        <Fab 
                            className={classes.button}
                            size="small" 
                            color="primary" 
                            aria-label="edit" 
                            onClick={() => this.handleUpdate()}
                        >
                            {this.state.editable ? <SaveIcon /> : <EditIcon />}
                        </Fab>

                        <Fab 
                            className={classes.button}
                            size="small" 
                            color="secondary" 
                            aria-label="delete" 
                            onClick={() => this.props.handleDelete(this.props.task.id)}
                        >
                            <DeleteIcon />                    
                        </Fab>
                    </div>

                </CardActions>               
                
            </Card>
        )
    }
}

export default withStyles(styles)(Task);

