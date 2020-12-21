import React from "react";
import { Link } from "react-router-dom";

class NewBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      amount: null,
      due: "",
      owner: "",
      link: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/bills/create";
    const { name, amount, due, owner,link } = this.state;

    const body = {
      name,
      amount,
      due,
      owner,
      link,
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
      .then(response => this.props.history.push(`/bill/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new Bill.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="companyName">Company</label>
                <input
                  type="text"
                  name="name"
                  id="companyName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="priorityHelp" className="form-text text-muted">
                  Who do we owe?
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="billAmount">Amount</label>
                <input
                  type="text"
                  name="amount"
                  id="billAmount"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="quantityHelp" className="form-text text-muted">
                  How much do we owe?
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Due Date</label>
                <input
                  type="text"
                  name="due"
                  id="billDue"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="dueHelp" className="form-text text-muted">
                  When is it due?
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Link</label>
                <input
                  type="text"
                  name="link"
                  id="companyLink"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="linkHelp" className="form-text text-muted">
                  where can we pay it?
                </small>
              </div>
              <div>
              <label htmlFor="billOwner">Who is paying it?</label>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Owner
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#" onClick={()=>this.setState({owner: "Jack"})}>Jack</a>
                  <a className="dropdown-item" href="#" onClick={()=>this.setState({priority: "Pete"})}>Pete</a>
                </div>
              </div>
               <small id="ownerHelp" className="form-text text-muted">
                  Who owns the bill?
                </small>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Add a new bill?
              </button>
              <Link to="/bills" className="btn btn-link mt-3">
                Back to Bills
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NewBill;