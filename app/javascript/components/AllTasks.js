import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";

import Task from "../components/Task";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexGrow: 1,
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
    }
}));

const AllTasks = props => {
    const classes = useStyles();

    let tasks;

    if (props.tasks.length != 0) {
        tasks = props.tasks.map(task => (
            <GridListTile key={task.id}>
                <Task
                    task={task}
                    allTags={props.allTags}
                    handleUpdate={props.handleUpdate}
                    handleDelete={props.handleDelete}
                    handleNewNotification={props.handleNewNotification}
                />
            </GridListTile>
        ));
    } else {
        tasks = (
            <Typography variant="body1" component="p" gutterBottom>
                No matching results.
            </Typography>
        );
    }

    return (
        <GridList cellHeight="auto" cols={1} className={classes.root}>
            {tasks}
        </GridList>
    );
};

AllTasks.propTypes = {
    tasks: PropTypes.array, // array of Task objects
    allTags: PropTypes.array, // array of Tag objects
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func,
    handleNewNotification: PropTypes.func
};

export default AllTasks;
