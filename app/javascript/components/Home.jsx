import React from "react";
import { Link } from "react-router-dom";
import DaysSinceTacoBell from './DaysSinceTacoBell';
import MessageBoard from './MessageBoard'

const Home = () => {
 return (
   <div>
    <div className='home-tiles'>
      <div className="vw-50 vh-50 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Things We Need</h1>
            <p className="lead">
              A curated list of shit we need to buy.
            </p>
            <hr className="my-4" />
            <Link
              to="/things"
              className="btn btn-lg custom-button"
              role="button"
            >
              View Things We Need
          </Link>
        </div>
      </div>
    </div>
    <div className="vw-50 vh-50 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Bills</h1>
          <p className="lead">
            All of the fucking money we owe.
          </p>
          <hr className="my-4" />
          <Link
            to="/bills"
            className="btn btn-lg custom-button"
            role="button"
          >
            View Bills we Need to pay
          </Link>
        </div>
       </div>
      </div>
    </div>
    <div className="days-since-tb"><DaysSinceTacoBell/></div>
  </div>    
    )
 }

export default Home;