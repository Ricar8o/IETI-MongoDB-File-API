import React from 'react';
import { UserForm } from './UserForm';
import { UserList } from './UserList';

export class UserApp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            nextId: 0
        };
    }

    render(){
        return(
            <div>
                <UserList userList={this.state.userList} />
                <UserForm actualId={this.state.nextId} />
            </div>
        );
    }
}