import React from "react";
import { withStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { isEqual, sortBy, clone, drop } from "lodash-es";

import AllTasks from "../components/AllTasks";
import NewTask from "../components/NewTask";
import Notification from "../components/Notification";
import {
    TaskFilterSortForm,
    taskSortKey
} from "../components/TaskFilterSortForm";

const TASKS_API_ENDPOINT = "/api/v1/tasks";
const TAGS_API_ENDPOINT = "/api/v1/tags";

const styles = {
    divider: {
        marginTop: 24,
        marginBottom: 24,
        height: 5
    }
};

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            allTags: [],
            filteredAndSortedTasks: [],

            // Query and tags input from the search form
            filterQuery: "",
            filterTags: [],

            // Sort by date created (ascending), as default option
            sortQuery: "dateCreatedAsc",
            hideCompletedTasks: false,

            notificationActive: false,
            currNotification: {
                message: "",
                key: null
            },
            notificationQueue: []
        };

        // New task creation
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTask = this.addNewTask.bind(this);

        // Update task
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTask = this.updateTask.bind(this);

        // Delete task
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

        // Searching and filtering tasks
        this.handleFilterSortForm = this.handleFilterSortForm.bind(this);
        this.filterAndSortTasks = this.filterAndSortTasks.bind(this);

        this.getAllTags = this.getAllTags.bind(this);

        this.processNotificationQueue = this.processNotificationQueue.bind(
            this
        );
        this.handleNewNotification = this.handleNewNotification.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        this.handleNotificationExited = this.handleNotificationExited.bind(
            this
        );
    }

    // Retrieve tags data from backend
    getAllTags() {
        fetch(TAGS_API_ENDPOINT)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ allTags: data });
            });
    }

    // Sends new task created to backend, then updates state
    handleFormSubmit(title, description, tag_list, due_date) {
        let body = JSON.stringify({
            task: {
                title: title,
                description: description,
                tag_list: tag_list,
                due_date: due_date
            }
        });

        fetch(TASKS_API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        })
            .then(response => response.json())
            .then(task => {
                this.addNewTask(task);
            });
    }

    addNewTask(task) {
        // Create a copy of the tasks array
        const tasks = clone(this.state.tasks);
        tasks.push(task);

        // After updating state, filter and sort tasks.
        this.setState({ tasks: tasks }, this.filterAndSortTasks);

        // Only update allTags if new task has tags (optimization purposes)
        if (task.tag_list.length > 0) {
            this.getAllTags();
        }
    }

    // Sends updated task to backend, then updates state
    handleUpdate(task) {
        fetch(`${TASKS_API_ENDPOINT}/${task.id}`, {
            method: "PUT",
            body: JSON.stringify({ task: task }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(task => {
                this.updateTask(task);
            });
    }

    updateTask(updatedTask) {
        // Create a copy of the tasks array
        const tasks = clone(this.state.tasks);
        /* 
        Get the index of task to be updated, so that updated task will remain 
        in same position in list.
        */
        let idx = tasks.map(task => task.id).indexOf(updatedTask.id);

        let origTask = tasks[idx];
        tasks[idx] = updatedTask;

        // After updating state, filter and sort tasks.
        this.setState({ tasks: tasks }, this.filterAndSortTasks);

        // Update allTags only if tag_list changed (optimization purposes)
        if (!isEqual(sortBy(origTask.tag_list), sortBy(updatedTask.tag_list))) {
            this.getAllTags();
        }
    }

    // Sends id of task to be deleted to backend, then updates state
    handleDelete(id) {
        fetch(`${TASKS_API_ENDPOINT}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            this.deleteTask(id);
        });
    }

    deleteTask(id) {
        let newTasks = this.state.tasks.filter(task => task.id != id);

        // After updating state, filter and sort tasks.
        this.setState({ tasks: newTasks }, this.filterAndSortTasks);
        // Update all tags list to account for deleted task.
        this.getAllTags();
    }

    /*
    Updates state based on input of user in FilterSortForm, 
    then filters and sorts tasks. 
    */
    handleFilterSortForm(
        filterQuery,
        filterTags,
        hideCompletedTasks,
        sortQuery
    ) {
        this.setState(
            {
                filterQuery: filterQuery,
                filterTags: filterTags,
                hideCompletedTasks: hideCompletedTasks,
                sortQuery: sortQuery
            },
            this.filterAndSortTasks
        );
    }

    filterAndSortTasks() {
        // filterQuery: string, filterTags: array of string
        let filterQuery = this.state.filterQuery.toLowerCase();
        let filterTags = this.state.filterTags.map(tag => tag.toLowerCase());

        /*
        Lambda to filter based on query
        Returns an array of tasks. Each task in the array contains the query string
        in either the title OR description
        */
        const queryFilter = tasks =>
            tasks.filter(
                task =>
                    task.title.toLowerCase().includes(filterQuery) ||
                    task.description.toLowerCase().includes(filterQuery)
            );

        /*
        Lambda to filter based on tags.
        Returns an array of tasks. Each task in the array contains EVERY tag
        in filterTags
        */
        const tagsFilter = tasks =>
            tasks.filter(task =>
                filterTags.every(tag => task.tag_list.includes(tag))
            );

        /*
        Lambda to filter based on tasks which are not completed
        Returns an array of tasks. Each task in the array is not completed
        */
        const hideCompletedTaskFilter = tasks =>
            tasks.filter(task => !task.completed);

        let filteredTasks = this.state.tasks;

        if (this.state.hideCompletedTasks) {
            filteredTasks = hideCompletedTaskFilter(filteredTasks);
        }

        // If filterQuery is non-empty, filter based on filter query
        if (filterQuery) {
            filteredTasks = queryFilter(filteredTasks);
        }

        // If filterTags is non-empty, filter based on filter tags
        if (filterTags.length != 0) {
            filteredTasks = tagsFilter(filteredTasks);
        }

        /*
        After filtering tasks, sort them based on sortQuery.
        taskSortKey is an object with different sort lambdas based on sortQuery.
        Each lambda takes in an array of tasks and returns an array of tasks sorted accordingly
        */
        let filteredAndSortedTasks = taskSortKey[this.state.sortQuery](
            filteredTasks
        );

        // unwrap Lodash's wrapper around the array of tasks
        filteredAndSortedTasks = filteredAndSortedTasks.value();

        this.setState({ filteredAndSortedTasks: filteredAndSortedTasks });
    }

    processNotificationQueue() {
        if (this.state.notificationQueue.length > 0) {
            // Create a copy of the array, while dropping the first element
            let notificationQueue = drop(this.state.notificationQueue);
            let currNotification = this.state.notificationQueue[0];
            this.setState({
                notificationActive: true,
                currNotification: currNotification,
                notificationQueue: notificationQueue
            });
        }
    }

    handleNewNotification(message) {
        // Create a copy
        let notificationQueue = clone(this.state.notificationQueue);
        notificationQueue.push({
            message: message,
            key: new Date().getTime()
        });

        // Callback function executed only after state is updated
        this.setState({ notificationQueue: notificationQueue }, () => {
            if (this.state.notificationActive) {
                /*
                Immediately begin dismissing current message to start
                showing new one, which will call handleNotificationExited
                */
                this.setState({ notificationActive: false });
            } else {
                this.processNotificationQueue();
            }
        });
    }

    handleNotificationClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ notificationActive: false });
    }

    handleNotificationExited() {
        this.processNotificationQueue();
    }

    // Get tasks and tags data from backend
    componentDidMount() {
        fetch(TASKS_API_ENDPOINT)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ tasks: data, filteredAndSortedTasks: data });
            });

        this.getAllTags();
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Box mb={2}>
                    <NewTask
                        allTags={this.state.allTags}
                        handleFormSubmit={this.handleFormSubmit}
                        handleNewNotification={this.handleNewNotification}
                    />
                </Box>

                <Divider className={classes.divider} />

                <Box mb={2}>
                    <TaskFilterSortForm
                        allTags={this.state.allTags}
                        filterQuery={this.state.filterQuery}
                        filterTags={this.state.filterTags}
                        sortQuery={this.state.sortQuery}
                        handleFilterSortForm={this.handleFilterSortForm}
                        hideCompletedTasks={this.state.hideCompletedTasks}
                    />
                </Box>

                <Box mb={2}>
                    {/* check if there's any tasks created */}
                    {this.state.tasks.length == 0 ? (
                        <Typography variant="body1" component="p" gutterBottom>
                            No tasks created yet.
                        </Typography>
                    ) : (
                        <AllTasks
                            tasks={this.state.filteredAndSortedTasks}
                            allTags={this.state.allTags}
                            handleUpdate={this.handleUpdate}
                            handleDelete={this.handleDelete}
                            handleNewNotification={this.handleNewNotification}
                        />
                    )}
                </Box>

                <Notification
                    notificationActive={this.state.notificationActive}
                    currNotification={this.state.currNotification}
                    handleNotificationClose={this.handleNotificationClose}
                    handleNotificationExited={this.handleNotificationExited}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Body);
