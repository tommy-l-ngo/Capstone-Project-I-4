import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

const authContext = createContext();

export const useAuth=()=>{
    const context =useContext(authContext);
    if(!context) throw new Error ("There is no Auth provider")
    return context;
}

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth, user=>{
            
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    },[]);
    return(
        <authContext.Provider
        value={{
            user
        }}
        >
            {!loading && children}
        </authContext.Provider>
    );
}

