import React from "react";
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'; 

import AllTasks from "../components/AllTasks";
import NewTask from "../components/NewTask";
import Notification from "../components/Notification";

const TASKS_API_ENDPOINT = '/api/v1/tasks';
const TAGS_API_ENDPOINT = '/api/v1/tags';

const styles = {
    divider: {
        marginTop: 32,
        marginBottom: 32,
        height: 5,
    },
};

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
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
        this.setState({
            tasks: tasks
        });
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

        this.setState({
            tasks: tasks
        })
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
        this.setState({
            tasks: newTasks,
        });
        this.getAllTags(); 
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
          .then((data) => {this.setState({tasks: data })});
        
        this.getAllTags();        
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Box>
                    <NewTask 
                        allTags={this.state.allTags}
                        handleFormSubmit={this.handleFormSubmit}
                        handleNewNotification={this.handleNewNotification}
                    />
                </Box>
                <Divider className={classes.divider}/>

                <Box>
                    <AllTasks 
                        tasks={this.state.tasks} 
                        allTags={this.state.allTags}
                        handleUpdate={this.handleUpdate}
                        handleDelete={this.handleDelete}  
                        handleNewNotification={this.handleNewNotification}                      
                    />
                </Box>

                <Box>
                    <Notification 
                        notificationActive={this.state.notificationActive}
                        currNotification={this.state.currNotification}
                        handleNotificationClose={this.handleNotificationClose}
                        handleNotificationExited={this.handleNotificationExited}
                    />   
                </Box>  
                    
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Body);
