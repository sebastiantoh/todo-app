import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Task from "../components/Task";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
}));

const AllTasks = (props) => {
    const classes = useStyles();

    let tasks = props.tasks
                    .map((task) => (
                            <GridListTile key={task.id}>
                                <Task 
                                    task={task} 
                                    allTags={props.allTags}
                                    handleUpdate={props.handleUpdate}
                                    handleDelete={props.handleDelete}
                                />  
                            </GridListTile>
                                                                              
                        )
                    );

    return (
        <div className={classes.root}>
            <GridList cellHeight="auto" cols={1}>
                {tasks}
            </GridList>
        </div>
        
    )
};

export default AllTasks;
