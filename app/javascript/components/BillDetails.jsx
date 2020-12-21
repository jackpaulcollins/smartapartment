import React from "react";
import { Link } from "react-router-dom";

class BillDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bill: [] };
    this.deleteBill = this.deleteBill.bind(this);
  }

  componentDidMount() {
      const {
        match: {
          params: { id }
        }
      } = this.props;
  
      const url = `/api/v1/bills/show/${id}`;
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ bill: response }))
        .catch(() => this.props.history.push("/bills"));
    }

    deleteBill() {
      const {
        match: {
          params: { id }
        }
      } = this.props;
      const url = `/api/v1/bills/destroy/${id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
  
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(() => this.props.history.push("/bills"))
        .catch(error => console.log(error.message));
    }

    render() {
      const { bill} = this.state;
      console.log(bill.link)
  
      return (
        <div className="">
          <div className="hero position-relative d-flex align-items-center justify-content-center">
            <div className="overlay bg-dark position-absolute" />
            <h1 className="display-4 position-relative text-white">
              {bill.name}
            </h1>
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-12 col-lg-3">
                <ul className="list-group">
                  <h5 className="mb-2">Due Date</h5>
                  {bill.due}
                </ul>
              </div>
              <div className="col-sm-12 col-lg-7">
                <h5 className="mb-2">Amount</h5>
                {bill.amount}
              </div>
              <div className="col-sm-12 col-lg-7">
                <h5 className="mb-2">Owner</h5>
                {bill.owner}
              </div>
              <div className="col-sm-12 col-lg-7">
                <h5 className="mb-2">Link</h5>
                <a href={`http://${bill.link}`}>{bill.link}</a>
              </div>
              <div className="col-sm-12 col-lg-2">
                <button type="button" className="btn btn-danger" onClick={this.deleteBill}>
                  Delete bill
                </button>
              </div>
            </div>
            <Link to="/bills" className="btn btn-link">
              Back to bills
            </Link>
          </div>
        </div>
      );
    }
  
  }

export default BillDetails;