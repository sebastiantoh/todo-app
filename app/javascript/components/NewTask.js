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
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <form 
                className={classes.root}
                autoComplete="off"
                onSubmit={(event) => {
                        event.preventDefault();
                        event.persist();
                        this.props.handleFormSubmit(this.state.title, 
                            this.state.description, this.state.tag_list);   
                        this.setState({title: '', description: '', tag_list: []})     
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