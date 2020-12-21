import React from "react";
import { Link } from "react-router-dom";

class NewThing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      priority: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/things/create";
    const { name, quantity, priority } = this.state;

    if (name.length == 0 || quantity.length == 0 || priority.length == 0)
      return;

    const body = {
      name,
      quantity,
      priority: priority.replace(/\n/g, "<br> <br>")
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/thing/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new thing to buy.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="thingName">Thing</label>
                <input
                  type="text"
                  name="name"
                  id="thingName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="priorityHelp" className="form-text text-muted">
                  What do we need?
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="thingQuantity">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  id="thingQuantity"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="quantityHelp" className="form-text text-muted">
                  How many do we need?
                </small>
              </div>
              <div>
              <label htmlFor="thingPriority">Priority</label>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Priority
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#" onClick={()=>this.setState({priority: "High"})}>High</a>
                  <a className="dropdown-item" href="#" onClick={()=>this.setState({priority: "Medium"})}>Medium</a>
                  <a className="dropdown-item" href="#" onClick={()=>this.setState({priority: "Low"})}>Low</a>
                </div>
              </div>
               <small id="priorityHelp" className="form-text text-muted">
                  How important is this shit?
                </small>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create New Thing to Buy
              </button>
              <Link to="/things" className="btn btn-link mt-3">
                Back to Things
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}



export default NewThing;