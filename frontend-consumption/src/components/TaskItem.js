import React from 'react';

export class TaskItem extends React.Component{

    render(){
        return(
            <tr>
                <td>{this.props.description}</td>
                <td>{this.props.dueDate}</td>
                <td>{this.props.status}</td>
                <td>{this.props.responsible}</td>
                <td>{this.props.email}</td>
            </tr>
        );
    }
}