import "./Login.css";
import UserStore from "../../stores/UserStore";
import React from "react";

class InputField3 extends React.Component {
  render() {
    return (

      <div className="inputField3">
        <div className="form__group field">
          <input
            name="name"
            id="name"
            className="form__field"
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)}
          />
          <label for="name" class="form__label">
            {this.props.placeholder}
          </label>
        </div>
      </div>
    );
  }
}

export default InputField3;
