import React, { Component } from 'react';
import { getDatabase, get, ref, child} from "firebase/database";

const dbRef = ref(getDatabase());

get(child(dbRef, "users/" + "test0123")).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

class Login extends Component {
    
    render() { 
        return (
        <>
        <h1>Log In</h1>
        </>
        );
    }
}
 
export default Login;