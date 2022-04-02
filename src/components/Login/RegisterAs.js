import Register from "./Register";
import { useEffect } from "react";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import { Navi } from "./Navi";



function RegisterAs()
{
    const navigate = useNavigate();

    function navToRegister()
    {
        navigate("/Register", { state: { role: "student" } });
        console.log("Hello");
    }



  useEffect(() => {
    // Update the document title using the browser API
    document.documentElement.style.setProperty("--loginFormHeight", "245px");
    document.documentElement.style.setProperty("--loginFormWidth", "350px");
  });


    return (
      <>
        <div className="titleBar">
          <Navi destination="/Login" />
          <div className="titleText">Register as</div>
        </div>{" "}
        {/* <h4 style={{ marginBottom: "35px", marginTop: "35px" }}></h4> */}
        <div className="buttonsRegister">
          <Link to="/Register" state={{ role: "student" }}>
            <button
              style={{ marginTop: "0px", marginBottom: "06px" }}
              className="btnLogin"
            >
              Student
            </button>
          </Link>
          <Link to="/Register" state={{ role: "staff" }}>
            <button
              style={{ marginTop: "6px", marginBottom: "06px" }}
              className="btnLogin"
            >
              Advisor/Professor
            </button>
          </Link>
        </div>
        </>
    );
}

export default RegisterAs;