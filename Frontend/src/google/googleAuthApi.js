
// const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client(CLIENT_ID);

// async function verifyIdToken(idToken) {
//   const ticket = await client.verifyIdToken({
//     idToken,
//     audience: CLIENT_ID,
//   });

//   const payload = ticket.getPayload();

//   const userId = payload['sub'];
// }


//     function onSignIn(googleUser) {
//         let profile = googleUser.getBasicProfile();
//         console.log('Name: ' + profile.getName());
//         console.log('Image URL: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail());
//     }
    
//     function signOut() {
//         let auth2 = gapi.auth2.getAuthInstance();
//         auth2.signOut().then(function () {
//         console.log('User Signed Out');
//         });
//     }


    // export async function loggedIn(context){
    //     const payload = {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(context)
    //     }
    //     const body = await basicFetch("", payload)
    //     return body.token
        
    // }

 