import "./register.css";
import UserStore from "../../stores/UserStore";
import React from "react";

class InputFieldIname extends React.Component {
  render() {
    return (
      <div className="inputField">
        <input className="input3"
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)} />
      </div>
    );
  }
}

export default InputFieldIname;