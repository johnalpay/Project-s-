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
  rel="noopener noreferrer"
  className="text-white flex items-center justify-center gap-2 hover:underline"
>
  <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
  Follow me on Facebook
</a>
      </footer>
    </div>
  );
        }
            
