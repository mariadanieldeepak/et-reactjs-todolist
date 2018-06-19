import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Todolist extends Component {
    constructor(props) {
        super(props);
        // Bind `this` to bind processSubmit to bind to the context of Todolist.
        this.processSubmit = this.processSubmit.bind(this);
        this.processAddItem = this.processAddItem.bind(this);

        this.state = {currentItem: "", items: []}
    }

    processSubmit(e) {
        e.preventDefault();

        // Do not add empty tasks.
        if (! this.state.items.length && ! this.state.currentItem) {
            return;
        }

        this.setState((prevState, props) => ({
            items: prevState.items.concat([this.state.currentItem])
        }));
    }

    processAddItem(e) {
        this.setState({
            currentItem: e.target.value
        });
    }

    processRemove(index) {
        // Verify if `index` is received.
        console.log("Remove: " + index);

        let updatedItems = this.state.items.filter((item, itemIndex) => itemIndex !== index);
        this.setState({
            items: updatedItems
        })
    }

    // Every Component must render()
    render() {
        // Render() must return something or should return `null`;
        return (
            // Return must contain only one parent element.
            <div className="Todolist">
                <div className="Todolist-header">Hello! Check out the tasks you've added.</div>
                <div className="Todolist-body">
                    <div className="Todolist-add-item-container">
                        <form onSubmit={this.processSubmit}>
                            <input className="Todolist-add-item" type="text" onChange={this.processAddItem} />
                            <button type="submit">Submit</button>
                        </form>
                        {/*<span className="Todolist-current-item">{this.state.currentItem}</span>*/}
                    </div>
                    <ul className="Todolist-items">
                        {this.state.items.map((item, index) => (
                            // Keys help React identify which items have changed, are added, or are removed.
                            <li key={index}>{item} <a href="#">Edit</a> | <button type="button" onClick={this.processRemove.bind(this, index)}>Remove</button></li>
                        ))}
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
        <div className="App-intro">
          <Todolist/>
        </div>
      </div>
    );
  }
}

export default App;
