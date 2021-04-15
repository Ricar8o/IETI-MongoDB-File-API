import React from 'react';
import { format, isValid } from 'date-fns';
import swal from 'sweetalert';
import './Style.css';

let today = formatDate(new Date());
export class TaskForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {description: '', dueDate: today, status: '', responsible: '', email: '', priority:0};
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.axios = this.props.axios;
    }
    
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value});    
    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });                
    }

    makeSwal(message,icon){
        swal({
            title: message,
            icon: icon
        })
    }

    async postTodo(){
        let data = new FormData();
        data.append('file', this.state.file);
        var link = null;
        if (this.state.file!=null){
            await this.axios.post('/api/files', data)
            .then(function (response) {
                console.log("file uploaded!", response.status);
                link = response.data;
            })
            .catch(function (error) {
                console.log("failed file upload", error);
                this.makeSwal("Wrong Data","error");
            });
        }

        let body = {
            "description": this.state.description,
            "dueDate": this.state.dueDate,
            "priority": this.state.priority,
            "responsible": {
                "name": this.state.responsible,
                "email": this.state.email
            },
            "status": this.state.status,
            "fileUrl": link
        }

        let message = "Wrong Data";
        let icon = "error";
        await this.axios.post('/api/todo', body)
        .then(function (response) {
            console.log("Todo uploaded!", response.data);
            message = "Post Request Done :)";
            icon = "success";
        })
        .catch(function (error) {
            console.log("failed file upload", error);
        });

        this.makeSwal(message,icon);

        if (icon==="success"){
            this.props.addTodo(body);
        }
    }

    handleSubmit(event) {
        if (!this.state.description.length || !this.state.status.length || !this.state.responsible.length || !this.state.email.length){
            this.makeSwal("Wrong Data","error");
        }else{
            this.postTodo();
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
                        Priority:
                        <input name="priority" type="number" value={this.state.priority} onChange={this.handleChange} min="0" max="5"/>         
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