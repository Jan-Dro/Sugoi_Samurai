
// WORKS
// import React, { useContext, useState } from 'react';
// import { AuthContext } from './api/authContext'
// import { login } from './api/authApi'
// import SignUpForm  from './components/Forms'

// export default function Login({ handleInputChange, handleToken }) {

//   const sharedState = useContext(AuthContext)
//   const { formData } = sharedState

//   const [responseMessage, setResponseMsg] = useState('')
//   const [shouldRedirect, setShouldRedirect] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const context = {email: formData.email, username: formData.email, password: formData.password}
//     const token = await login(context);

//     if(!token) {
//       setResponseMsg("One or more of your entries are incorrect")
//     }else {
//       localStorage.setItem("authToken", token)
//       handleToken(token)
//       setShouldRedirect(true)
//     }
//   }

//   if (shouldRedirect) {
//     return <Navigate to='/home'/>
//   }else {
//     return <SignUpForm handleInputChange={handleInputChange} handleToken={handleToken} />
//   }
// }

// import React, { useContext, useState } from 'react';
// import { AuthContext } from './api/authContext';
// import { login } from './api/authApi';
// import LoginForm from './components/LoginForm'
// import SignUpForm from './components/Forms';
// import { Card, CardBody, Button } from '@nextui-org/react';
// import GoogleSignInButton from './components/GoogleSignIn';
// import { Navigate, useNavigate } from 'react-router-dom'
// import GoogleSignInButton1 from './google/Signin';
// import GoogleLoginButton from './google/GoogleOAuth2';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Testing from './TEST/testfile';
// import Appbar from './NavBar';
import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import { Card } from '@nextui-org/react';
import { login } from './api/authApi';
import Appbar from './NavBar';


export default function LoginPage() {

  const navigateToHome = () => {
    window.location.href = "/";
  };


  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/customers/get-token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful. Token:', data.token);
        navigateToHome()
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <>
   <Appbar />
   <h1 className='coname'>Sugoi Samurai</h1>
   <h2 className='face'></h2>
    <div className="login-container">
      <Card
        title="Sign In"
        shadow
        style={{ width: '80%', maxWidth: '300px' }}
      >
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)} // Add an onChange handler
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)} // Add an onChange handler
            />
          </div>
          <Button type="submit" variant="primary" className="signin-button">
            Sign In
          </Button>
        </form>
        {/* You can add additional components, links, or text below the form */}
        <div className="additional-content">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </Card>
    </div> 
    </>
  );
}









{/* // import React, { useContext, useState } from 'react';
// import { AuthContext } from './api/authContext';
// import { login } from './api/authApi'; // Assuming you have an `login` function in your authApi
// import { Card, Button } from '@nextui-org/react';

// export default function Login({ handleInputChange, handleToken }) {
//   const sharedState = useContext(AuthContext);
//   const { formData } = sharedState;

//   const [responseMessage, setResponseMsg] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const context = {
//       email: formData.username,
//       password: formData.password,
//     };

//     try {
//       const token = await login(context); // Send a request to your login API endpoint

//       if (token) {
//         localStorage.setItem('authToken', token);
//         handleToken(token);
//         setResponseMsg('');
//       } else {
//         setResponseMsg('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setResponseMsg('An error occurred during login');
//     }
//   };

//   return (
//     <div className="card-container">
//       <Card
//         title="Sign In"
//         shadow
//         style={{ width: '80%', maxWidth: '300px' }}
//       >
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <Button type="submit" variant="primary" className="signin-button">
//             Sign In
//           </Button>
//         </form>
//         <p className="small-text">
//           Don't have an account?{' '}
//           <a href="/signup" style={{ marginLeft: '5px' }}>
//             Sign Up
//           </a>
//         </p>
//       </Card>
//     </div>
//   );
// } */}
