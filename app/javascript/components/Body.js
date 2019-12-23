import React from "react"


import AllTasks from "../components/AllTasks";
import NewTask from "../components/NewTask";


const API_ENDPOINT = '/api/v1/tasks';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTask = this.deleteTask.bind(this);        
    }

    handleFormSubmit(title, description, tag_list) {
        // Split string of tags, which are separated by commas. 
        // model only permits tag_list to be an array
        tag_list = tag_list.split(',').map((tag) => tag.trim());
        let body = JSON.stringify({task: {title: title, 
                                            description: description,
                                            tag_list: tag_list,}
                                    });

        fetch(API_ENDPOINT, 
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
    }

    handleUpdate(task){
        fetch(`${API_ENDPOINT}/${task.id}`, 
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
    }

    handleDelete(id){
        fetch(`${API_ENDPOINT}/${id}`,
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
    }

    componentDidMount(){
        fetch(API_ENDPOINT)
          .then((response) => {return response.json()})
          .then((data) => {this.setState({tasks: data })});
    }

    render() {
        return (
            <React.Fragment>
                <NewTask handleFormSubmit={this.handleFormSubmit}/>

                
                <AllTasks 
                    tasks={this.state.tasks} 
                    handleUpdate={this.handleUpdate}
                    handleDelete={this.handleDelete}                        
                />
                    
            </React.Fragment>
        )
    }
}

export default Body;
