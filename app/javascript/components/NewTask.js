import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

const NewTask = (props) => {
    const classes = useStyles();
    let formFields = {}

    return (
        <form 
            className={classes.root}
            onSubmit={(event) => {props.handleFormSubmit(formFields.title.value, 
                    formFields.description.value); 
                    event.target.reset();}
            }
        >
            <TextField 
                id="standard-basic" 
                placeholder="Task Title" 
                inputRef={input => formFields.title = input}
            />

            <TextField 
                id="standard-basic" 
                placeholder="Task Description" 
                inputRef={input => formFields.description = input}
            />       

            <Fab size="small" color="primary" aria-label="add" type="submit">
                <AddIcon />            
            </Fab>

        </form>
      )
};

export default NewTask;
