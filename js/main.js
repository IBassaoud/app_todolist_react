const header = document.getElementById('header');
const main = document.getElementById('main');
const footer = document.getElementById('footer');

class CreateTaskComponent extends React.Component {
    state = {
        inputTask: React.createRef(),
        inputTaskState: React.createRef(),
        tasks: [
            { name: "Rajouter des inputs pour définir le statut de la tâche créer", state: "status-doing", stateText: "Doing", key: 0 },
            { name: "Expert in REACT", state: "status-todo", stateText: "Todo", key: 1 },
            { name: "Rajouter la fonctionnalité du bouton supprimer", state: "status-done", stateText: "Done", key: 2 },
        ],
    }

    // Creation task handler
    handleCreationTask = event => {
        let newTask;
        if (this.state.tasks.length == 0) {
            newTask = {
                name: this.state.inputTask.current.value,
                state: "status-todo",
                stateText: "Todo",
                key: 0
            }
        } else {
            // React v18 might want to use the method UseId() to generate unique id for each element task
            let lastElement = this.state.tasks[this.state.tasks.length - 1]
            let lastElementKey = lastElement.key
            newTask = {
                name: this.state.inputTask.current.value,
                state: "status-todo",
                stateText: "Todo",
                key: lastElementKey + 1
            }
        }

        // Update the task list 
        if (this.state.inputTask.current.value != '') {
            this.setState({ tasks: this.state.tasks.concat(newTask) });
        }
        console.log(this.state.tasks);

        // Empty the input field
        this.state.inputTask.current.value = ""
    }

    // Delete task handler
    handleDeleteTask = (key) => () => {
        // Delete the task 
        this.setState({ tasks: this.state.tasks.filter(task => task.key != key) });
        console.log(this.state.tasks);
    }

    // Edit task handler
    handleEditTask = (key) => () => {
        // Edit the task 

        // this.setState({ tasks: this.state.tasks.filter(task => task.key != key) });
        console.log(this.state.tasks);
    }


    render() {
        const input = <input type="text" className="input_create" ref={this.state.inputTask} onKeyPress={event => { if (event.key === "Enter") this.handleCreationTask() }} />
        const button = <input type="button" className="button_create" value="Create" onClick={this.handleCreationTask} />
        return (
            <div className="container">
                {input}
                {button}
                <div className="task">
                    <table>
                        <thead>
                            <tr>
                                <th>Nom de la tâche</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // Map function for each task in the array generate a component 
                                this.state.tasks.map((task, index) =>
                                    <RenderCreatedTaskComponent key={index} task={task} deleteTheTask={this.handleDeleteTask} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
};

// Child component : generate a table row for each task 
function RenderCreatedTaskComponent(props) {
    return (
        <tr>
            <td className="text-center task-item__name">{props.task.name}</td>
            <td>
                <div className={props.task.state}>{props.task.stateText}</div>
            </td>
            <td>
                <div className="action">
                    <div className="action_item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <div className="action_item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                    <div className="action_item" onClick={props.deleteTheTask(props.task.key)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
            </td>
        </tr>
    )
}

/* ########## ALTERNATIVE SYNTAX ########## */

// class RenderCreatedTaskComponent extends React.Component {

//     render() {
//         return (

//             <tr>
//                 <td className="text-center task-item__name">{this.props.task.name}</td>
//                 <td>
//                     <div className={this.props.task.state}>{this.props.task.stateText}</div>
//                 </td>
//                 <td className="action">
//                     <div className="action">
//                         <div className="action_item">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                             </svg>
//                         </div>
//                         <div className="action_item">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                             </svg>
//                         </div>
//                         <div className="action_item" onClick={this.props.deleteTheTask(this.props.task.key)}>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                         </div>
//                     </div>
//                 </td>
//             </tr>

//         )
//     }
// }


ReactDOM.render(<CreateTaskComponent></CreateTaskComponent>, main)