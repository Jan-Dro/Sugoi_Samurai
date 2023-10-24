
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleSignInButton from '../components/GoogleSignIn';
import GoogleLoginButton from '../google/GoogleOAuth2';
import GoogleSignInButton1 from '../google/Signin';

function navigate(url){
  window.location.href = url;
}

async function auth(){
  const response =await fetch('http://127.0.0.1:8000/oauth/',{method:'get'});

  const data = await response.json();
  console.log(data);
  navigate(data.url);

}


function Test() {


  return (
    <>
    <GoogleOAuthProvider clientId='179335452382-p4ch727ri2cal4sfdosunt6p0qa4nsip.apps.googleusercontent.com'>
    <button className='btn-auth' type='button' onClick={() => auth()}>
        <GoogleSignInButton1 />
        {/* <GoogleLoginButton /> */}
    </button>
    </GoogleOAuthProvider>
    </>
  )
}

export default Test