import React, {useEffect} from 'react';
import '../Dashboard.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Navbar from '../Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';








  const auth = getAuth();

  //import {useLocation} from 'react-router-dom';
  function _updateUserData() {
    var userNow = auth.currentUser;
    userNow
      .updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
      .then(
        function () {
          var displayName = userNow.displayName;
          var photoURL = userNow.photoURL;
          alert("we did it");
        },
        function (error) {
          alert("nooooo");
        }
      );
  }

  onAuthStateChanged(auth, (user2) => {
    if (user2) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user2.uid;
      // _updateUserData();
      // ...
    } else {
    //   alert("notsigned");
      // User is signed out
      // ...
    }
  });





function Home() {

      useEffect(() => {
        // Update the document title using the browser API
        document.body.style.overflowY = "scroll";
    });



    return (
        <>
            <Navbar />
            <HeroSection />
            <Cards />
        </>
    );
}

export default Home;