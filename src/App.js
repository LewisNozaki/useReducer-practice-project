import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect
  useEffect(() => {
    // Checking local storage for the isLoggedIn key-value pair.
    const LSisLoggedIn = localStorage.getItem("isLoggedIn");
    
    // Check if LSisLoggedIn returns "1" or true
    if (LSisLoggedIn) {
      setIsLoggedIn(true);
    };
    
  }, [])
  
  const loginHandler = (email, password) => {
    // Saves a key-value pair to local storage when an user logs in successfully. 
    localStorage.setItem("isLoggedIn", "1");

    setIsLoggedIn(true);
  };
  
  const logoutHandler = () => {
    // Removed the key-value pair of isLoggedIn if they press the log out button.
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
  };
  
  return (
    <>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </>
  );
}

export default App;
