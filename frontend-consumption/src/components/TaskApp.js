import React from 'react';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import axios from 'axios';

export class TaskApp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
        this.axios = axios.create({
            baseURL: 'http://localhost:8080'
        });
    }

    componentDidMount(){
        this.loadDataFromServer();
    }

    loadDataFromServer() {
    
        let that = this;

        this.axios.get("/api/todo")
        .then(function (response) {
            console.log("This is my todolist:  ", response.data);
            that.setState({items: response.data})
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return(
            <div>
                <TaskList taskList={this.state.items} axios={this.axios}/>
                <TaskForm taskList={this.state.items} axios={this.axios}/>
            </div>
        );
    }
}