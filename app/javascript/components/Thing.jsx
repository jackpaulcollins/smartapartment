import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "react";

class Thing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="thing">
        <Link to={`/thing/${this.props.id}`} params={this.props.id} >
          <h3>{this.props.name}</h3>
          <p>{this.props.quantity}</p>
          <p>{this.props.priority}</p>
        </Link>
      </div>
    )
  }
}

Thing.prototypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.number,
  priority: PropTypes.string
}

export default Thing;