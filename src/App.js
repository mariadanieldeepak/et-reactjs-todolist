import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Todolist extends Component {
    // Every Component must render()
    render() {
        // Render() must return something or should return `null`;
        return (
            <div className="Todolist-welcome">Hello! Check out the tasks you've added.</div>
        );
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">A Todolist app using ReactJS</h1>
        </header>
        <p className="App-intro">
          <Todolist/>
        </p>
      </div>
    );
  }
}

export default App;
