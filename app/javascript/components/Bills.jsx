import React from "react";
import { Link } from "react-router-dom";

class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: []
    };
    this.getBillsPromise = this.getBillsPromise.bind(this);
  }

  componentDidMount(){
    this.getBillsPromise();
  }

  getBillsPromise() {
    const url = "/api/v1/bills/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ bills: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { bills } = this.state;
    const allBills = bills.map((bill, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{bill.name}</h5>
            <Link to={`/bill/${bill.id}`} className="btn custom-button">
              View Bill
            </Link>
          </div>
        </div>
      </div>
    ));
    const noBill = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No bills yet. Why not <Link to="/bill">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Bills</h1>
            <p className="lead text-muted">
              Here's the bills you need to pay
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/bill" className="btn custom-button">
                Add New Bill
              </Link>
            </div>
            <div className="row">
              {bills.length > 0 ? allBills : noBill}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}
export default Bills;