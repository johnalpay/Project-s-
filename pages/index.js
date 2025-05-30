import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = savedUsers.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
      setLoggedIn(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignup = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (savedUsers.find(u => u.email === email)) {
      setError('Email already exists');
    } else {
      const newUser = { email, password };
      localStorage.setItem('users', JSON.stringify([...savedUsers, newUser]));
      localStorage.setItem('authUser', JSON.stringify(newUser));
      setLoggedIn(true);
      setError('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="auth-container">
        <h2>Welcome to Project Vault</h2>
        <p>Sign in or create an account to access protected projects.</p>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="auth-buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>🔥 My Protected Projects</h1>
        <p>{date.toLocaleString()}</p>
        <button onClick={handleLogout} className="logout">Logout</button>
      </header>
      <main>
        <div className="project-list">
          <div className="project-card">
            <h2>Facebook Token Getter</h2>
            <p>Tool to extract tokens from cookies safely.</p>
          </div>
          <div className="project-card">
            <h2>Lyrics Finder</h2>
            <p>Find lyrics to any song using an API.</p>
          </div>
          <div className="project-card">
            <h2>Weather App</h2>
            <p>Get live weather data with simple UI.</p>
          </div>
        </div>
      </main>
      <footer>
        <a
          href="https://www.facebook.com/profile.php?id=61576992292379"
          target="_blank"
          rel="noopener noreferrer"
          className="follow-button"
        >
          Follow me on Facebook
        </a>
      </footer>
    </div>
  );
};

export default App;
      
