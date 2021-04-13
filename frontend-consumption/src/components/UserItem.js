import React from 'react';

export class UserItem extends React.Component{

    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.fullname}</td>
                <td>{this.props.username}</td>
                <td>{this.props.email}</td>
                <td>{this.props.password}</td>
            </tr>
        );
    }
}