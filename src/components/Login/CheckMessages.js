import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref, onValue } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from '../Login/App';

const db = getDatabase();


export function CheckMessages()
{
    const [messageAlert, setMessageAlert] = useContext(MessageContext);
    //const [unseenMessage, setUnseenMessage] = useState(false);

    useEffect(() => {
        const user = getAuth().currentUser;
            const dbMessagesRef = ref(db, "messages");
            //window.addEventListener('onload', () => {
            onValue(dbMessagesRef, (snapshot) => {
                if (!snapshot.exists()) {
                    //console.log("empty");
                    return;
                }
                            
                snapshot.forEach(snapshot1 => {
                    if (!snapshot1.exists())
                        return;

                    const dbMessage = snapshot1.val();
                    if (dbMessage.to == user.displayName && dbMessage.seen == false) {
                        setMessageAlert(true);
                        //console.log(messageAlert);
                    }
                                
                });
            });
            //})
        
    }, [])


    return null;
    
}