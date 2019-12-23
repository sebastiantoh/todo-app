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
    action: {
        padding: 16,
    },    
    button: {
        margin: 3,
    },
    tag: {
        margin: 3,
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
            let task = {id: this.props.task.id, 
                title: this.title.value, 
                description: this.description.value, 
                tag_list: this.props.task.tag_list}
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
                </CardContent>               
                
                    
                <CardActions disableSpacing className={classes.action}>
                    {this.props.task.tag_list.map((tag, index) =>
                        <Chip
                            label={tag}
                            key={index}
                            className={classes.tag}
                            // TODO: onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                        />
                    )}

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

