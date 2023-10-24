import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import Login from './Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Appbar from './NavBar.jsx';
import Body from './Body.jsx';
import Pages from './Pagination.jsx';
import SignUpForm from './components/SignInForm.jsx';
import { AuthProvider, useAuth } from './Authcontext.jsx';
import NewItems from './pages/NewItems.jsx';
import Cart from './pages/Cart.jsx';
import Stickers from './pages/Stickers.jsx';
import Apparel from './pages/Apperal.jsx';
import ProductPage from './pages/ProductPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <main className="dark text-foreground bg-background">
          <Router>
            <div>
              <Routes>
                <Route path="/login" element={<Login />} /> 
                <Route path="/signup" element={<SignUpForm />} />
                <Route path='/' element={<App />} />
                <Route path='/newitems' element={<NewItems />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/stickers' element={<Stickers />} />
                <Route path='/apperal' element={<Apparel />} />
                <Route path='/productPage' element={<ProductPage />} />
              </Routes>
            </div>
          </Router>
        </main>
      </AuthProvider>
    </NextUIProvider>
  </React.StrictMode>
);
