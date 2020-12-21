import React from "react";
import { Link } from "react-router-dom";

class ThingsWeNeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      things: []
    }
    this.getThingsPromise = this.getThingsPromise.bind(this);
    this.setPriority = this.setPriority.bind(this);

  }
  
  componentDidMount() {
    this.getThingsPromise();
  }

  getThingsPromise() {
    const url = `/api/v1/things/index`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ things: response }))
      .catch(() => this.props.history.push("/"));
  }

  setPriority(thing){
    if (thing.priority === 'High') {
      return 'bg-danger'
    }
    else if (thing.priority === 'Medium') {
      return 'bg-warning'
    }
    else return 'bg-success'
  }
 
  render () {
    const { things } = this.state;
    const allThings = things.map((thing, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className={`card mb-4 ${this.setPriority(thing)}`}>
          <div className="card-body">
            <h5 className="card-title">{thing.name}</h5>
            <Link to={`/thing/${thing.id}`} className="btn custom-button">
              View
            </Link>
          </div>
        </div>
      </div>
    ));
    const noThing = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No things to buy yet. Why not <Link to="/thing">create one?</Link>
        </h4>
      </div>
    );

    return (
        <div>
          <section className="jumbotron jumbotron-fluid text-center">
            <div className="container py-5">
              <h1 className="display-4">Things We Need to Buy</h1>
              <p className="lead text-muted">
                Here you'll find all the shit we need to buy. Paper Towels, soap, bratwurst? you
                name it, you'll find it here.
              </p>
            </div>
          </section>
          <div className="py-5">
            <main className="container">
              <div className="text-right mb-3">
                <Link to="/thing" className="btn custom-button">
                  Create New Thing
                </Link>
              </div>
              <div className="row">
                {things.length > 0 ? allThings : noThing}
              </div>
              <Link to="/" className="btn btn-link">
                Home
              </Link>
            </main>
          </div>
        </div>
      )
    }
  }
 
export default ThingsWeNeed;



