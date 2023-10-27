
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
    const base_url = import.meta.env.VITE_BASE_URL
    e.preventDefault();
  
    try {
      const response = await fetch(`http://${base_url}/customers/get-token/`, {
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
              onChange={(e) => handleInputChange("email", e.target.value)} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)} 
            />
          </div>
          <Button type="submit" variant="primary" className="signin-button">
            Sign In
          </Button>
        </form>
        <div className="additional-content">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </Card>
    </div> 
    </>
  );
}