import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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

  render() {
      return (
          <div>
                <Router>
                    <div>
                        <Route path="/" component={this.TaskView}/>
                    </div>
                </Router>

          </div>
      );
  }
}

export default App;