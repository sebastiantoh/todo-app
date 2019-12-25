import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';


const styles = {
    root: {
        '& > *': {
          marginTop: 8,
          marginBottom: 8,
        },
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
    
    render() {
        const { classes } = this.props;

        return (
            <form 
                className={classes.root}
                autoComplete="off"
                onSubmit={(event) => {
                        event.preventDefault();

                        const errors = this.validateForm(this.state.title, 
                                this.state.description);
                        // check if there are any keys (which corresponds to errors)
                        if (Object.keys(errors).length > 0) {
                            this.setState({errors: errors})
                            return;
                        }

                        this.props.handleFormSubmit(this.state.title, 
                            this.state.description, this.state.tag_list);   
                        this.setState({title: '', 
                                description: '', 
                                tag_list: [],
                                errors: {}})
                }}
            >

                <TextField 
                    id="outlined-full-width" 
                    variant="outlined"
                    fullWidth 
                    label="Title"
                    margin="normal"
                    value={this.state.title}
                    onKeyPress={event => {
                        if (event.key === 'Enter') event.preventDefault();
                    }}
                    onChange={(event)=>{this.setState({title: event.target.value})}}
                    error={this.state.errors.title}
                    // render error message if there is, else render empty.
                    helperText={this.state.errors.title || ""}
                />
                
                <TextField 
                    id="outlined-full-width" 
                    variant="outlined"
                    fullWidth 
                    multiline
                    label="Description"
                    margin="normal"
                    value={this.state.description}
                    onKeyPress={event => {
                        if (event.key === 'Enter') event.preventDefault();
                    }}
                    onChange={(event)=>{this.setState({description: event.target.value})}}
                    error={this.state.errors.description}
                    // render error message if there is, else render empty.
                    helperText={this.state.errors.description || ""}
                />

                <Autocomplete
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
                    renderInput={params => <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Add tags"                        
                                                fullWidth                                            
                                            />
                    }
                />   

                <Fab size="small" color="primary" aria-label="add" type="submit">
                    <AddIcon />            
                </Fab>

            </form>
        )
    }
}
export default withStyles(styles)(NewTask);