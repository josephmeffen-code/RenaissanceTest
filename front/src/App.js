import './App.css';
import axios from "axios";
import React from 'react';

const URL = "http://localhost:3001/tracker";  //update backend port here if it was changed
class Tablerow extends React.Component{ //single expense in table
  constructor(props){
    super(props);
    this.state = {
      name: props.Name,
      type: props.Type,
      value: props.Value,
      id: props.ID
    }
  }
}
class Table extends React.Component{  //container for expense entries
  constructor(props){
    super(props);
    this.state = {
      tableRows: [],
      selectedItems: []
    }  
    this.checkboxModified = this.checkboxModified.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
  }

  checkboxModified(event) { //update list of selected items when item is selected/unselected
    
    const target = event.target;
    if (target.checked){
      this.setState({
        selectedItems: this.state.selectedItems.concat({ID: target.value})
      })
    } else {
      this.setState({
        selectedItems: this.state.selectedItems.filter((element) => element.ID !== target.value)
      })
    }
  }

  deleteClicked(){  //if delete button pressed when at least one item is selected, request the deletion of all selected items
    if (this.state.selectedItems && this.state.selectedItems.length){
      if(window.confirm("Delete all selected expenses?")){
        const delRequest = this.state.selectedItems;
        console.log(delRequest);
        axios.delete(URL, { data : delRequest }).then(function(response){
            window.location.reload();
          });
      }
    }
  }

  componentDidMount = ()=> {  //get all expenses in database and store them in TableRow objects for display
    var table = this;
    axios.get(URL).then(function(response){

      var items = response.data;
      table.setState({
        tableRows: items.map((item) => new Tablerow(item)
      )
      });
    });
  }
  render(){
    const list = this.state.tableRows.map((row) => 
    <tr key={row.state.id}>
    <td>{row.state.name}</td>
    <td>{row.state.type}</td>
    <td>${row.state.value}</td>
    <td><input type="checkbox" value={row.state.id} onChange={this.checkboxModified}></input></td>
    </tr>
    );

    return( 
      <div>
          <h1>Expense List</h1>
          <button id="DeleteButton" onClick={this.deleteClicked}>Delete Selected Items</button><br /> <br /> 
          <table>
            <thead>
              <th>Name</th>
              <th>Type</th>
              <th>Value</th>
              <th>Select?</th>
            </thead>
            <tbody>
              {list}
            </tbody>
         </table>
    </div>
    );
  }
}

class AddForm extends React.Component { //container for expense adding form
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      value: ""
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) { //maintain state values, update color if necessary
    const target = event.target;
    const value = target.value;
    const name = target.id;
    this.setState({
      [name]: value   });
    document.getElementById(name).style.borderColor = 'white';
  }

  handleSubmit(event) { //if any fields are invalid, notify user and highlight fields. Otherwise, request new expense
    event.preventDefault();

    var errorFlag = false;

    if (!this.state.name){
      document.getElementById("name").style.borderColor = 'red';
      errorFlag = true;
    }

    if (!this.state.type){
      document.getElementById("type").style.borderColor = 'red';
      errorFlag = true;
    }

    if (!this.state.value || isNaN(this.state.value)){
      document.getElementById("value").style.borderColor = 'red';
      errorFlag = true;
    }

    if (errorFlag){
      alert("Error: Invalid value entered for one or more fields.")
    } else {
      const addRequest = {Name: this.state.name, Type: this.state.type, Value: parseFloat(this.state.value).toFixed(2)}
      axios.post(URL, addRequest).then(function(response){
        window.location.reload();
      });
    }
  }

  render() {
    return(
      <form onSubmit = {this.handleSubmit}>
              <label for="name">Expense Name:</label><br />
              <input type="text" id="name" name="name" value = {this.state.name} onChange={this.handleChange}></input><br />
              <label for="type">Expense Type:</label><br />
              <input type="text" id="type" name="type" value = {this.state.type} onChange={this.handleChange}></input><br />
              <label for="value">Expense Value:</label><br />
              <input type="text" id="value" name="value" value = {this.state.value} onChange={this.handleChange}></input><br />
              <input type="submit" value="Create"></input>
      </form>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Expense Tracker
      </header>
      <body>
        <div className="Expense-list">
          <div className="Expense-adder">
          <h2>Add New Expense</h2>
          <AddForm />
            
          </div>
          <Table />
        </div>
      </body>

    </div>
  );
}

export default App;
