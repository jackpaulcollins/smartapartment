import React from "react";
import CustomModal from "./CustomModal";

class DaysSinceTacoBell extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      jack: null,
      pete: null,
      modalShowing: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.determineStreak = this.determineStreak.bind(this);
    this.parseStreak = this.parseStreak.bind(this);
    this.getJackPromise = this.getJackPromise.bind(this);
    this.getPetePromise = this.getPetePromise.bind(this);
  }

  componentDidMount() {
    this.getJackPromise();
    this.getPetePromise();
  }

  toggleModal(){
    if (this.state.modalShowing) {
      this.setState({
        modalShowing: false
      })
    } else {
      this.setState({
        modalShowing: true
      })
    }
  }

  getJackPromise() {
    const url = '/api/v1/users/jack';

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ jack: response }))
      .catch(() => this.props.history.push("/"));
  }

  getPetePromise() {
    const url = '/api/v1/users/pete';

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ pete: response }))
      .catch(() => this.props.history.push("/"));
  }


  determineStreak(date){
    const lastDate = new Date(date)
    let today = new Date();
    const streak = (today - lastDate)
    const diffInDays = Math.round(streak / (1000 * 3600 * 24))
    return diffInDays
  }

  parseStreak(user){
    if (user) {
      return this.determineStreak(user)
    } else {
      return 'Sorry, cannot determine streak'
    }
  }

  
  render() {
    console.log(this.state.jack)
    const jackStreak = this.state.jack ? this.parseStreak(this.state.jack[0].last_day_having_tacobell) : 'Loading'
    const peteStreak = this.state.pete ? this.parseStreak(this.state.pete[0].last_day_having_tacobell) : 'Loading'
    return (
      <div>
        <h1 className="display-4">Days Since Taco Bell</h1>
        <div className="lead">
          <p>Jack: {jackStreak} {(jackStreak === 1) ? 'Day' : 'Days'}</p>
          <p>Pete: {peteStreak} {(peteStreak === 1) ? 'Day' : 'Days'}</p>
        </div>
        <button type="button" className="btn btn-dark" onClick={this.toggleModal}>Reset you fat fuck</button>
        <div>
         <CustomModal toggleModal={this.toggleModal}
                      show={this.state.modalShowing}/>
        </div>
      </div>
    )
  }
}

export default DaysSinceTacoBell;