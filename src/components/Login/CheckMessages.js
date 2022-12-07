import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref } from "firebase/database";
import { useContext, useEffect } from "react";
import { MessageContext } from '../Login/App';

const db = getDatabase();
const user = getAuth().currentUser;

export function CheckMessages()
{
    const [messageAlert, setMessageAlert] = useContext(MessageContext);

    useEffect(() => {
        
        getAuth().onAuthStateChanged((user) => {
            const dbMessagesRef = ref(db, "messages");
            //window.addEventListener('onload', () => {
                get(dbMessagesRef)
                    .then((snapshot) => {
                        if (!snapshot.exists()) {
                            //console.log("empty");
                            return;
                        }
                        
                        snapshot.forEach(snapshot1 => {
                            if (!snapshot1.exists())
                                return;

                            const dbMessage = snapshot1.val();
                            if (dbMessage.to == user.displayName && dbMessage.seen == false)
                            {
                                setMessageAlert(true);
                            }
                            
                        });
                    })
            //})
        })

        
    }, [])

    return null;
    
}