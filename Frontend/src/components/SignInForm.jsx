// import React, { useState } from 'react';
// import { Card, CardBody, Button } from '@nextui-org/react';

// export default function SignUpForm(props) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });  

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // You can access the form data from the formData object.
//     console.log('Form Data:', formData);
//     // Perform your submission logic here.
//   }

//   return (
//     <div className="card-container">
//       <Card title="Sign Up" shadow style={{ width: '80%', maxWidth: '300px' }}>
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
//             Sign Up
//           </Button>
//         </form>
//         <p className="small-text">
//           Already have an account?{' '}
//           <a href="/login" style={{ marginLeft: '5px' }}>
//             Sign In
//           </a>
//         </p>
//       </Card>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { signup } from '../api/authApi';
import Appbar from '../NavBar';

export default function SignUpForm(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const context = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    const response = await signup(context);

    if (response.success) {
      // User was successfully created.
      console.log('User created successfully.');
    } else {
      // There was an error creating the user.
      console.log('Error creating user:', response.error);
    }
  }

  return (
    <>
    <Appbar />
    <h1 className='coname'>Sugoi Samurai</h1>
   <h2 className='face'></h2>
    <div className="card-container">
      <Card title="Sign Up" shadow style={{ width: '80%', maxWidth: '300px' }}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" variant="primary" className="signin-button">
            Sign Up
          </Button>
        </form>
        <p className="small-text">
          Already have an account?{' '}
          <a href="/login" style={{ marginLeft: '5px' }}>
            Sign In
          </a>
        </p>
      </Card>
    </div>
    </>
  );
}