import Register from "./Register";
import "./Login.css"
import { Link } from "react-router-dom";


function RegisterAs()
{
    return(
        <div>
            <h4 style={{ marginBottom: "35px", marginTop: "35px" }}>
                Register as
            </h4>
            <div className="buttonsRegister">
                <Link to='/Register' state={{from: 'student'}}>
                    <button 
                    style={{ marginTop: "0px", marginBottom: "06px" }}
                    className="btn2">
                        Student
                    </button>

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