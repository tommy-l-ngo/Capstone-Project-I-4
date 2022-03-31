import "./Login.css";
import UserStore from "../../stores/UserStore";
import React from "react";

class SubmitButton extends React.Component {
  render() {
    return (
      <div style={this.props.Style}>
        <button className="btnLogin" disabled={this.props.disabled} onClick={() => this.props.onClick()}>
        {this.props.text}   
        </button>
      </div>
    );
  }
}

export default SubmitButton;
