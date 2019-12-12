import React from "react"

class AllTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount(){
        fetch('/api/v1/tasks.json')
          .then((response) => {return response.json()})
          .then((data) => {this.setState({ tasks: data }) });
    }

    render() {
        let tasks = this.state.tasks
                        .map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                </tr>
                            )
                        );
        return (
            <table>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Tags</th>
                </tr>
                {tasks}
            </table>
        )
    }
}

export default AllTasks
