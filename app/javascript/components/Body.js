import React from "react"


import AllTasks from "../components/AllTasks";
import NewTask from "../components/NewTask";


const TASKS_API_ENDPOINT = '/api/v1/tasks';
const TAGS_API_ENDPOINT = '/api/v1/tags';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            allTags: [],
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTask = this.deleteTask.bind(this);   
        this.getAllTags = this.getAllTags.bind(this);
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

    componentDidMount(){
        fetch(TASKS_API_ENDPOINT)
          .then((response) => {return response.json()})
          .then((data) => {this.setState({tasks: data })});
        
        this.getAllTags();        
    }

    render() {
        return (
            <React.Fragment>
                <NewTask 
                    allTags={this.state.allTags}
                    handleFormSubmit={this.handleFormSubmit}
                />
                
                <AllTasks 
                    tasks={this.state.tasks} 
                    allTags={this.state.allTags}
                    handleUpdate={this.handleUpdate}
                    handleDelete={this.handleDelete}                        
                />
                    
            </React.Fragment>
        )
    }
}

export default Body;
