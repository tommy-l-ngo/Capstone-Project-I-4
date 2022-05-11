import { checkActionCode, getAuth, OperationType } from '@firebase/auth';
import React from 'react';
import { useEffect, useState } from "react";
import { EmailVerified } from './EmailVerified';
import { PasswordReset } from "./PasswordReset";
import { parseActionCodeURL } from "@firebase/auth";




//This basically acts as a hub page for password resetting and email verification
export function PageRedirect()
{
    const [redirectToResetPassPage, setRedirectToResetPassPage] = useState(false);
    const [redirectToEmailVerified, setRedirectToEmailVerified] = useState(false);
    
    //console.log("PageRedirect");

    const [validUrl, setValidUrl] = useState(false);
    const [error, setError] = useState("");
    const [actionCode, setActionCode] = useState("");

    useEffect( () => {
        //console.log("window.location.href = " + window.location.href);
        const actionUrl = parseActionCodeURL(window.location.href);
        try{
            if(actionUrl == null){
                throw Error();
            }

            const auth = getAuth()
            checkActionCode(auth, actionUrl.code).then( () => {
                //valid code
                setValidUrl(true);
                setError("");
                const action = actionUrl.operation;
                
                //determines what to redirect to based in action mode
                if(action == "PASSWORD_RESET")
                {
                    setRedirectToResetPassPage(true);
                }
                else if(action == "VERIFY_EMAIL")
                {
                    setRedirectToEmailVerified(true);
                }
                setActionCode(actionUrl.code);
            }).catch( (err) => {
                err.message = "Invalid url link code.";
                console.log(err.message);
                setValidUrl(false);
                setRedirectToEmailVerified(false);
                setRedirectToResetPassPage(false);
                setError(err.message);
            })
            
        }
        catch(err)
        {
            err.message = "Invalid url link.";
            console.log(err.message);
            setValidUrl(false);
            setRedirectToEmailVerified(false);
            setRedirectToResetPassPage(false);
            setError(err.message);
        }
    })

    return(
        <>
            {!validUrl &&
                <div className="loginFormContainer">
                    <p
                        style={{
                        fontSize: "20px",
                        color: "Red",
                        }}
                    >
                        {error}
                    </p>
                </div>
            }
            
            {redirectToResetPassPage && 
                <PasswordReset code={actionCode}/>
            }
            {redirectToEmailVerified && 
                <EmailVerified code={actionCode}/>
            }
        </>
    )
    
}