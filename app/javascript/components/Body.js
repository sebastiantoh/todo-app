import React from "react";
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'; 
import Typography from '@material-ui/core/Typography';

import AllTasks from "../components/AllTasks";
import NewTask from "../components/NewTask";
import Notification from "../components/Notification";
import TaskFilterForm from "../components/TaskFilterForm";

const TASKS_API_ENDPOINT = '/api/v1/tasks';
const TAGS_API_ENDPOINT = '/api/v1/tags';

const styles = {
    divider: {
        marginTop: 24,
        marginBottom: 24,
        height: 5,
    },
};

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            filteredTasks: [],
            filterQuery: "",
            filterTags: [],
            allTags: [],
            notificationActive: false,
            currNotification: "",
            notificationQueue: [],
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTask = this.addNewTask.bind(this);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTask = this.updateTask.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

        this.handleFilterForm = this.handleFilterForm.bind(this);
        this.filterTasks = this.filterTasks.bind(this)

        this.getAllTags = this.getAllTags.bind(this);

        this.processNotificationQueue = this.processNotificationQueue.bind(this);
        this.handleNewNotification = this.handleNewNotification.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        this.handleNotificationExited = this.handleNotificationExited.bind(this);
    }

    getAllTags() {
        fetch(TAGS_API_ENDPOINT)
          .then((response) => {return response.json()})
          .then((data) => {this.setState({allTags: data })});
    }

    handleFormSubmit(title, description, tag_list) {
        let body = JSON.stringify({task: {title: title, 
                                            description: description,
                                            tag_list: tag_list,}
                                    });

        fetch(TASKS_API_ENDPOINT, 
            {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body,}
        )
        .then((response) => {return response.json()})
        .then((task)=>{
            this.addNewTask(task)
        });
    }  

    addNewTask(task){
        // create a copy of the tasks array
        const tasks = this.state.tasks.slice();
        tasks.push(task);
        this.setState({tasks: tasks}, 
                () => () => this.filterTasks()
        );
        this.getAllTags(); 
    }

    handleUpdate(task){
        fetch(`${TASKS_API_ENDPOINT}/${task.id}`, 
            {method: 'PUT',
            body: JSON.stringify({task: task}),
            headers: {'Content-Type': 'application/json'}}
        )
        .then((response) => { 
            this.updateTask(task)})
    }  
    
    updateTask(updatedTask){
        // create a copy of the tasks array
        const tasks = this.state.tasks.slice();
        // index of task to be updated
        let idx = tasks.map((task) => task.id).indexOf(updatedTask.id)
        tasks[idx] = updatedTask;

        this.setState({tasks: tasks}, 
                () => this.filterTasks()
        )
        this.getAllTags(); 
    }

    handleDelete(id){
        fetch(`${TASKS_API_ENDPOINT}/${id}`,
            {method: 'DELETE', 
            headers: {'Content-Type': 'application/json'},}
        )
        .then((response) => { 
            this.deleteTask(id);
        })
    }

    deleteTask(id) {
        let newTasks = this.state.tasks.filter((task => task.id != id))
        this.setState({tasks: newTasks}, 
                () => this.filterTasks()
        );
        this.getAllTags(); 
    }

    handleFilterForm(filterQuery, filterTags) {
        this.setState({filterQuery: filterQuery, 
                filterTags: filterTags}, 
            () => this.filterTasks()
        );
    }

    // filterQuery: string, filterTags: array of string
    filterTasks() {
        let filterQuery = this.state.filterQuery.toLowerCase()
        let filterTags = this.state.filterTags.map(tag => tag.toLowerCase())

        console.log(filterQuery, filterTags)
        
        // lambda to filter based on query: checks title and description
        const queryFilter = (tasks) => tasks.filter(task => 
                task.title.toLowerCase().includes(filterQuery) 
                || task.description.toLowerCase().includes(filterQuery));
        
        // lambda to filter based on tags. Task must contain EVERY tag in filterTags
        const tagsFilter = (tasks) => tasks.filter(task =>
                filterTags.every(tag => task.tag_list.includes(tag)))

        let filteredTasks;

        // if filterQuery and filterTag is non-empty, filter based on both fields
        if (filterQuery && filterTags.length != 0) {        
            filteredTasks = tagsFilter(queryFilter(this.state.tasks));
        // if filterQuery is nonempty, filterTags is empty
        } else if (filterQuery && filterTags.length == 0) {
            filteredTasks = queryFilter(this.state.tasks)
        // if filterQuery is empty, filterTags is nonempty
        } else if (!filterQuery && filterTags.length != 0) {
            filteredTasks = tagsFilter(this.state.tasks)
        } else {
            filteredTasks = this.state.tasks;
        }
        this.setState({filteredTasks: filteredTasks})
    }

    processNotificationQueue() {
        if (this.state.notificationQueue.length > 0) {
            // create a copy, omitting the first element
            let notificationQueue = this.state.notificationQueue.slice(1);
            let currNotification = this.state.notificationQueue[0];
            this.setState({notificationActive: true,
                    currNotification: currNotification,
                    notificationQueue: notificationQueue,
            })
        }
    }
    
    handleNewNotification(message) {
        // create a copy
        let notificationQueue = this.state.notificationQueue.slice();
        notificationQueue.push({
                message: message, 
                key: new Date().getTime()
        });

        // callback function executed only after state is updated
        this.setState({notificationQueue: notificationQueue}, () => {
                if (this.state.notificationActive) {
                    // immediately begin dismissing current message to start
                    // showing new one, which will call handleNotificationExited
                    this.setState({notificationActive: false})
                } else {
                    this.processNotificationQueue();
                }  
        })
    }

    handleNotificationClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({notificationActive: false})
    };

    handleNotificationExited() {
        this.processNotificationQueue();
    }

    componentDidMount(){
        fetch(TASKS_API_ENDPOINT)
          .then((response) => {return response.json()})
          .then((data) => {this.setState({tasks: data, filteredTasks: data})});
        
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
                <Divider className={classes.divider}/>

                <Box mb={2}> 
                    <TaskFilterForm 
                        allTags={this.state.allTags}
                        filterQuery={this.state.filterQuery}
                        filterTags={this.state.filterTags}
                        handleFilterForm={this.handleFilterForm}
                    />
                </Box>

                <Box mb={2}>
                    {/* check if there's any tasks created */}
                    {this.state.tasks.length == 0 
                    ? <Typography variant="body1" component="p" gutterBottom>
                            No tasks created yet.
                        </Typography>
                    : <AllTasks 
                        tasks={this.state.filteredTasks} 
                        allTags={this.state.allTags}
                        handleUpdate={this.handleUpdate}
                        handleDelete={this.handleDelete}  
                        handleNewNotification={this.handleNewNotification}                      
                        />
                    }
                    
                </Box>

                <Notification 
                    notificationActive={this.state.notificationActive}
                    currNotification={this.state.currNotification}
                    handleNotificationClose={this.handleNotificationClose}
                    handleNotificationExited={this.handleNotificationExited}
                />   
                    
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Body);
