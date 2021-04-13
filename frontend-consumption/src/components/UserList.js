import React from 'react';
import { UserItem } from './UserItem';

export class UserList extends React.Component{

    render(){
        const usersList = this.props.userList.map((user, i) => {
            return (
                <UserItem key={i} id={user.id} fullname={user.firstname + ' ' + user.lastname} username={user.username} email={user.email} password={user.password}/>
            );
        });
        return(
            <div className="container">
                <h1>USERS</h1>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                    </thead>
                    <tbody>
                        {usersList}
                    </tbody>
                </table>
            </div>
            
        );
    }
}