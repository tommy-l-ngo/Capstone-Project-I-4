import "./Login.css";
import UserStore from "../../stores/UserStore";
import React from "react";

class InputField2 extends React.Component {
  render() {
    return (
      <div className="inputField2">
        <input className="input2"
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)} />
      </div>
    );
  }
}

export default InputField2;
