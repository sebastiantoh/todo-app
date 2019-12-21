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


const styles = {
    card: {
        width: 350,
        height: 250,
    },
    title: {
        fontWeight: 500,
    },
    button: {
        marginLeft: 'auto',
    }
};

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    
    handleUpdate() {
        if (this.state.editable) {
            let title = this.title.value;
            let description = this.description.value;
            let id = this.props.task.id;
            let task = {id: id, title: title, description: description}
            this.props.handleUpdate(task)
        }
        this.setState({
            editable: !this.state.editable,
        })
    }

    render() {
        const { classes } = this.props;
        let title;
        let description;
        if (this.state.editable) {
            title = <input type='text' 
                        ref={input => this.title = input} 
                        defaultValue={this.props.task.title}
                    />
            description = <input type='text' 
                            ref={input => this.description = input} 
                            defaultValue={this.props.task.description}
                            />
        } else {
            title = <React.Fragment>{this.props.task.title}</React.Fragment>
            description = <React.Fragment>
                            {this.props.task.description}
                        </React.Fragment>
        }

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography 
                        className={classes.title} 
                        variant="h5" 
                        component="h2"
                    >
                        {title}
                    </Typography>

                    <Typography component="p">
                        {description}
                    </Typography>

                    <CardActions >
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
                    </CardActions>
                
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Task);

