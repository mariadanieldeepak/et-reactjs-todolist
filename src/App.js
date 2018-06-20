import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from './Components/Todolist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">A Todolist app using ReactJS</h1>
        </header>
        <div className="App-intro">
          <Todolist/>
        </div>
      </div>
    );
  }
}

export default App;
