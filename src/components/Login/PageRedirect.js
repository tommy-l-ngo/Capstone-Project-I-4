import React from 'react';
import { useEffect, useState } from "react";
import { PasswordReset } from "./PasswordReset";





export function PageRedirect()
{
    const [redirectToResetPassPage, setRedirectToResetPassPage] = useState(false);
    
    console.log("PageRedirect");

    useEffect(() => {
        const url = window.location.href;
        const reg = /mode=(.+)&oob/;
        console.log("url = " + url);
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
                console.log("resetPassword");
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
        </>
    )
    
}