import React from 'react';
import { useEffect, useState } from "react";
import { EmailVerified } from './EmailVerified';
import { PasswordReset } from "./PasswordReset";





export function PageRedirect()
{
    const [redirectToResetPassPage, setRedirectToResetPassPage] = useState(false);
    const [redirectToEmailVerified, setRedirectToEmailVerified] = useState(false);
    
    //console.log("PageRedirect");

    useEffect(() => {
        const url = window.location.href;
        const reg = /mode=(.+)&oob/;
        //console.log("url = " + url);
        try{
            const m = url.match(reg);
            if(m == null){
                throw Error("Regex match failed.");
            }
            const mode = m[1];
            console.log("mode = " + mode);
            if(mode == "resetPassword")
            {
                setRedirectToResetPassPage(true);
                //console.log("resetPassword");
            }
            else if(mode == "verifyEmail")
            {
                setRedirectToEmailVerified(true);
            }
        }
        catch(err)
        {
            console.log(err.message);
        }

    })


    return(
        <>
            {redirectToResetPassPage && 
                <PasswordReset url={window.location.href}/>
            }
            {redirectToEmailVerified && 
                <EmailVerified url={window.location.href}/>
            }
        </>
    )
    
}