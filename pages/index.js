import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setSuccessMsg('Login successful!');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleSignup = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccessMsg('Signup successful. You can now log in.');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div style={{ backgroundColor: '#7c0a02', minHeight: '100vh', padding: 20, color: '#fff' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>📌 My Projects</h1>

      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          <div style={{ marginTop: 20 }}>
            <a href="https://lyrics-liart.vercel.app/" target="_blank">🎵 Lyrics</a><br />
            <a href="https://profile-guard.vercel.app/" target="_blank">🛡️ Profile Guard</a><br />
            <a href="https://getnew-xi.vercel.app/" target="_blank">🔑 Token Getter</a>
          </div>
        </>
      ) : (
        <div>
          <h2>Login or Sign up to access your projects</h2>

          {errorMsg && <div style={{ background: '#ff4d4d', padding: 10 }}>{errorMsg}</div>}
          {successMsg && <div style={{ background: '#4CAF50', padding: 10 }}>{successMsg}</div>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /><br />

          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      )}

      <footer style={{ marginTop: 40 }}>
        <a
          href="https://www.facebook.com/profile.php?id=61576992292379"
          target="_blank"
          style={{
            background: '#1877f2',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 10,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>Follow me</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.17 8.44 9.93v-7.03h-2.54v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v7.03C18.34 21.24 22 17.09 22 12.07z"/></svg>
        </a>
      </footer>
    </div>
  );
        }
            
