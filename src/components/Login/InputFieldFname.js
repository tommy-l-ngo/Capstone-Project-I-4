import "./register.css";
import UserStore from "../../stores/UserStore";
import React from "react";

class InputFieldFname extends React.Component {
  render() {
    return (
      <div className="inputFieldfname">
        <input className="input4"
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)} />
      </div>
    );
  }
}

export default InputFieldFname;