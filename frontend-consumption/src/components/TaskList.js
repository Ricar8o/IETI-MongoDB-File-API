import React from 'react';
import { TaskItem } from './TaskItem';

export class TaskList extends React.Component{
    render(){
        const taskList = this.props.taskList.map((task, i) => {
            return (
                <TaskItem key={i} description={task.description} priority={task.priority} dueDate={task.dueDate} status={task.status} responsible={task.responsible.name} email={task.responsible.email} fileUrl={this.props.axios.defaults.baseURL + task.fileUrl}/>
            );
        });
        return(
            <div className="container">
                <h1>TASKS</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Responsible name</th>
                        <th>Responsible email</th>
                        <th>File</th>
                    </tr>
                    </thead>
                    <tbody>
                        {taskList}
                    </tbody>
                </table>
            </div>
            
        );
    }
}