import React from 'react'
import InputField2 from './InputField2';
import LoginForm from './LoginForm';
export const Forgot = () => {
      document.documentElement.style.setProperty("--loginFormHeight", "300px");
    
  return (
    <div className="forgotContainer">
      <h2>Forgot Password</h2>
      <div className='emailInput'>
        <InputField2 type="text" placeholder="Email" />
      </div>
    </div>
  );
}
