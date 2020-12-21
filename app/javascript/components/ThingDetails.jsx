import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "react";

class ThingDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      thing: {}
    };
    this.deleteThing = this.deleteThing.bind(this);
  }

  componentDidMount() {
    this.getThingPromise();
  }

  getThingPromise() {
  const id = this.props.match.params.id
  const url = `/api/v1//things/show/${id}`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => this.setState({ thing: response }))
    .catch(() => this.props.history.push("/"));
  }

  deleteThing() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/things/destroy/${id}`;
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
      .then(() => this.props.history.push("/things"))
      .catch(error => console.log(error.message));
  }



  render() {
    const name = this.state.thing.name;
    const quantity = this.state.thing.quantity;
    const priority = this.state.thing.priority;
    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Quantity Needed</h5>
                {quantity}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Priority</h5>
              <div>{priority}</div>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteThing}>
                Delete Thing
              </button>
            </div>
          </div>
          <Link to="/things" className="btn btn-link">
            Back to All the Things
          </Link>
        </div>
      </div>
    );
  }
}

export default ThingDetails;