import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Task from "../components/Task";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
}));

const AllTasks = (props) => {
    const classes = useStyles();

    let tasks = props.tasks
                    .map((task, index) => (
                            <GridListTile key={index}>
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
        <GridList cellHeight="auto" cols={1} className={classes.root}>
            {tasks}
        </GridList>        
    )
};

export default AllTasks;
