import React, { Component } from 'react';
import './App.css';
import EasyABC from './EasyABC';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className = "easy-abc">
            EasyABC
          </h1>
        </div>
        <EasyABC/>
      </div>
    );
  }
}

export default App;
