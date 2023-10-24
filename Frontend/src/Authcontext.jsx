import React, {useState, useRef, useEffect, useContext} from 'react';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const inputRef = useRef(null);

  const handleToken = (token) => {
    setFormData({ email: '', password: '' });
    setAuthToken(token);
  };

  const sharedState = {
    formData,
    setFormData,
    authToken,
    setAuthToken,
    handleToken,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

useEffect(() => {
  const token = localStorage.getItem('authToken')
  if (token && !authToken) {
    handleToken(token)
  }
}, [])

  return (
    <AuthContext.Provider value={sharedState}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
