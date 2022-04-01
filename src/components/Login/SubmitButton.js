import "./Login.css";
import UserStore from "../../stores/UserStore";
import React from "react";

class SubmitButton extends React.Component {
  render() {
    return (
      <div className="submitButton">
        <button className="btnLogin" disabled={this.props.disabled} onClick={() => this.props.onClick()} style={this.props.style}>
        {this.props.text}   
        </button>
      </div>
    );
  }
}

export default SubmitButton;
