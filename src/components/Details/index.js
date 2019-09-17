import React from "react";

import "./details.css";

class MyDetails extends React.Component {
  render() {
    console.log(this.props.history);
    return (
      <div className="im">
        <img
          src={this.props.history.location.state.imageURL}
          alt="url"
          className="imURL"
        />
      
      <div className="text">
        <p>Downloads: {this.props.history.location.state.down}</p>
        <p>Views: {this.props.history.location.state.vivi}</p>
      </div>
      </div>
    );
  }
}

export default MyDetails;
