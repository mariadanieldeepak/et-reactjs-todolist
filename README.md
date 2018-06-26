This is a practice project developed using ReactJS for [ET](https://github.com/elegantthemes).  

## Changelog  

### v0.5.1 (26 June 2018)
**Check-in status**  
- Used ES6 shorthand assignment
- Used ES6 arrow function

### v0.5.0 (25 June 2018)
**Check-in status**  
- Filtering logic has been unified
- Identified the reason for link filters not working as expected: Tried to use cloned state objects rather than let React use State directly
- Link filters made to work

**Feedback**  
- Use ES6 shorthand assignment - `this.setState({currentItem});`
- Use ES6 arrow function - `let completedItems = this.state.items.filter((item, itemIndex) => ! item.isComplete ? item : false );`
- Refactor the app using Flux architecture

### v0.4.0 (22 June 2018)
**Check-in status**  
- Added checkbox for checking on/off the tasks
- Added filter to show all/completed/un-completed todos.
    - Approached two different methods: 1) Link filter 2) Dropdown filter
    - [Link filter](https://github.com/mariadanieldeepak/et-reactjs-todolist/releases/tag/0.4.0-alpha.1) didn't work as expected so switched to Dropdown (refer attached screencasts)

**Feedback**  
- Appreciated for finding a real world scenario
- Re-use the logic used in active state filter
- Fix the link filters

#### v0.3.0 (21 Jun 2018)
**Check-in status**  
- Learnt about Controlled & un-controlled inputs
- `<select>`, `<input>` & `<textarea>` can have `value` attribute to be controlled by React
- `<input>` with type `file` is read-only and hence it is always un-controlled
- Values from Uncontrolled input fields can be accessed using `ref` and these un-controlled fields can be used when introducing React on to legacy applications.

**Feedback**  
- Show/hide elements just by using `this.state.isEdit`
- Add a checkbox for task item being "complete" or not, and then add a filter to show: all/completed/un-completed todos.

#### v0.2.0 (20 Jun 2018)
**Check-in status**  
- Different components have been identified and split in to their own components and organized in to their own files
- Refactored the code to avoid jQuery and let ReactJS control the `<input>` elements
- Learnt how ReactJS uses `key` to manage lists - add/remove/edit
- Learnt that `key` cannot be used in props, rather we can introduce props such as `itemIndex` to port key to the child components

**Feedback**   
- Good understanding of `key` in ReactJS
- Good understanding on defining class methods based on Component logic

#### v0.1.0 (19 Jun 2018)
**Check-in status**  
Initial working demo.  

**Feedback**   
- Split this into multiple react components, i.e. The "App", the list, a list item, the buttons, the new task form etc
- Refactor to avoid all use of jQuery