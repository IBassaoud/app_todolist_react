const header = document.getElementById('header');
const main = document.getElementById('main');
const footer = document.getElementById('footer');

const createTask = document.getElementById('create_task');
const allTasks = document.getElementById('all_tasks');

class CreateTaskComponent extends React.Component {
    state = {
        inputTask: React.createRef(),
        inputTaskState: React.createRef(),
        tasks: [
            { name: "AAAAH LA QUEULEULEU", state: "status-doing", stateText: "Doing", key: 0 },
            { name: "Expert in REACT", state: "status-done", stateText: "Done", key: 1 },
        ],
    }

    handleCreationTask = event => {
        let newTask = {
            name: this.state.inputTask.current.value,
            state: "status-todo",
            stateText: "Todo",
            key: this.state.tasks.length
        }
        
        // Update the task array 
        this.setState({tasks: this.state.tasks.concat(newTask)});
        console.log(this.state.tasks);

        // Empty the input field
        this.state.inputTask.current.value = ""
    }


    render() {
        const input = <input type="text" id="creation_task_input" name="creation_task" ref={this.state.inputTask} />
        const button = <input type="button" id="creation_task_button" value="Go" onClick={this.handleCreationTask} />
        return (
            <div id="create_task">
                {input}
                {button}
                <div id="all_tasks">
                    <table>
                        <thead>
                            <tr className="thead_row">
                                <th>Nom de la tâche</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.map((task) =>
                                <RenderCreatedTaskComponent key={task.name} task={task}></RenderCreatedTaskComponent>
                            )}
                        </tbody>


                    </table>
                </div>
            </div>
        )
    }
};


class RenderCreatedTaskComponent extends React.Component {

    render() {
        return (

            <tr>
                <td className="text-center task_name">{this.props.task.name}</td>
                <td>
                    <div className={this.props.task.state}>{this.props.task.stateText}</div>
                </td>
                <td className="actions">
                    <div className="actions_buttons">
                        <div className="actions_item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <div className="actions_item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <div className="actions_item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </div>
                </td>
            </tr>

        )
    }
}


ReactDOM.render(<CreateTaskComponent></CreateTaskComponent>, main)