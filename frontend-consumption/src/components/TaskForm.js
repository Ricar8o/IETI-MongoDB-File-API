import React from 'react';
import axios from 'axios';
import { format, isValid } from 'date-fns';
import swal from 'sweetalert';
import './Style.css';

let today = formatDate(new Date());
export class TaskForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {description: '', dueDate: today, status: '', responsible: '', email: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.axios = axios.create({
            baseURL: 'http://localhost:8080/api/'
        });
    }
    
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value});    
    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });                
    }

    handleSubmit(event) {
        if (!this.state.description.length || !this.state.status.length || !this.state.responsible.length || !this.state.email.length){
            swal({
                title: "Wrong Data",
                icon: "error"
            })
        }else{
            let data = new FormData();
            data.append('file', this.state.file);
    
            this.axios.post('files', data)
                .then(function (response) {
                    console.log("file uploaded!", response.data);
                })
                .catch(function (error) {
                    console.log("failed file upload", error);
                });
            swal({
                title: "Upload!",
                icon: "success"
            })
        }
        event.preventDefault();
    }

    render(){
        return(
            <div className="taskForm">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Description:
                        <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />         
                    </label>
                    <br/>
                    <label>
                        Date:
                        <input
                            name="dueDate"
                            id="new-todo-date"
                            onChange={this.handleChange}
                            value={this.state.dueDate}
                            type = "date"
                            min= {today}
                        />         
                    </label>
                    <br/>

                    <label>
                        Status:  
                        <select name="status" value={this.state.status} onChange={this.handleChange}>      
                            <option ></option>      
                            <option value="Done">Done</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Ready">Ready</option>
                        </select>      
                    </label>
                    
                    
                    <label>
                        Responsible Name:
                        <input name="responsible" type="text" value={this.state.responsible} onChange={this.handleChange} />         
                    </label>

                    <label>
                        Responsible Email:
                        <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />         
                    </label>

                    <label>
                        File:
                        <input type="file" id="file" onChange={this.handleInputChange}/>        
                    </label>

                   

                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

function formatDate(date){
    const dateFormat = "yyyy-MM-dd";
    if (isValid(date)){
        return format(date,dateFormat);
    }
    return null;
}