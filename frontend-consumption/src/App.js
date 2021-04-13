import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { TaskApp } from './components/TaskApp';
import { UserApp } from './components/UserApp';

class App extends Component {

  UserView = () => (
    <div className="userView">
       <UserApp/>
    </div>
  );
  
  TaskView = () => (
    <div className="taskView">
      <TaskApp/>
    </div>
  );

  MainView = () => (
    <div className="container">
         <ul>
            <li><Link to='/users'>Users</Link></li>
            <li><Link to='/tasks'>Tasks</Link></li>
        </ul> 
      
      <br/>
      
    </div>
  );

  render() {
      return (
          <div>
                <Router>
                    <div>
                        <Route path="/users" component={this.UserView}/>
                        <Route path="/tasks" component={this.TaskView}/>
                        <Route path="/" component={this.MainView}/>
                    </div>
                </Router>

          </div>
      );
  }
}

export default App;