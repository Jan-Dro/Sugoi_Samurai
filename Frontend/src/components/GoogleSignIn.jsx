import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button'

const GoogleSignInButton = () => {
  return (
    <div className='googlebtn'>
      <GoogleButton 
            width={240}
            height={50}
            theme="dark"
            text="Sign in with Google"/>
    </div>
  );
};

export default GoogleSignInButton;

