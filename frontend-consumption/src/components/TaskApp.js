import React from 'react';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';

export class TaskApp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
        };
    }

    render(){
        return(
            <div>
                <TaskList taskList={this.state.taskList}/>
                <TaskForm />
            </div>
        );
    }
}