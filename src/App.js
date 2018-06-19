import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Todolist extends Component {
    // Every Component must render()
    render() {
        // Render() must return something or should return `null`;
        return (
            // Return must contain only one parent element.
            <div className="Todolist">
                <div className="Todolist-header">Hello! Check out the tasks you've added.</div>
                <div className="Todolist-body">
                    <div className="Todolist-add-item-container">
                        <form>
                            <input className="Todolist-add-item" type="text" />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <ul className="Todolist-items">
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                    </ul>
                </div>
            </div>
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
