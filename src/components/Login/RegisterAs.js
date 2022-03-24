import Register from "./Register";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";


function RegisterAs()
{
    const navigate = useNavigate();

    function navToRegister()
    {
        navigate("/Register", { state: { role: "student" } });
        console.log("Hello");
    }

    return(
        <div>
            <h4 style={{ marginBottom: "35px", marginTop: "35px" }}>
                Register as
            </h4>
            <div className="buttonsRegister">
                <Link to="/Register" state={{role:"student"}}>
                    <button 
                    style={{ marginTop: "0px", marginBottom: "06px" }}
                    className="btn2">
                        Student
                    </button>
                </Link>
                <Link to="/Register" state={{role:"advisor"}}>
                    <button
                    style={{ marginTop: "6px", marginBottom: "06px" }}
                    className="btn2">
                        Advisor/Professor
                    </button>
                </Link>
            </div>
        </div>
  );
}

export default RegisterAs;