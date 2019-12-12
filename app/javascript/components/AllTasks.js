import React from "react"

import Task from "../components/Task";

const AllTasks = (props) => {
    let tasks = props.tasks
                    .map((task) => (
                            <tr key={task.id}>
                                <Task 
                                    task={task} 
                                    handleUpdate={props.handleUpdate}
                                    handleDelete={props.handleDelete}
                                />  
                            </tr>                        
                        )
                    );

    return (
        <tbody>
            {tasks}
        </tbody>
    )
};

export default AllTasks;
