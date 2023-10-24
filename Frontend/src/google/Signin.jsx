// import React from "react";
// import GoogleSignInButton from "../components/GoogleSignIn";


// const clientId = '179335452382-p4ch727ri2cal4sfdosunt6p0qa4nsip.apps.googleusercontent.com';
// let auth2;

// gapi.load('auth2', function() {
//     auth2 = gapi.auth2.init({
//       client_id: clientId,
//     });
//   });

// function signIn() {
//   auth2.signIn().then(function(googleUser) {
//     const profile = googleUser.getBasicProfile();
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail());
//   });
// }

// const GoogleSignInButton1 = () => {
//   return (
//     <button onClick={signIn}>
//       <GoogleSignInButton />
//     </button>
//   );
// };

// export default GoogleSignInButton1;



import React, { useEffect } from "react";
import GoogleSignInButton from "../components/GoogleSignIn";


const clientId = '179335452382-p4ch727ri2cal4sfdosunt6p0qa4nsip.apps.googleusercontent.com';
let auth2;

function GoogleSignInButton1() {
  const signIn = () => {
    auth2.signIn().then(function(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());

      onSignIn(googleUser);
    });
  }

  useEffect(() => {
    gapi.load('auth2', function() {
      auth2 = gapi.auth2.init({
        client_id: clientId,
      });
    });
  }, []);

  async function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();
    console.log('Processing user data:', id_token, profile);

    try {
      const response = await fetch("http://127.0.0.1:8000/oauth/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from backend:', data);
      } else {
        console.error('Error in response from backend:', response.status);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }

  return (
    <button onClick={signIn}>
      <GoogleSignInButton />
    </button>
  );
}

export default GoogleSignInButton1;