import React, { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Simple "login" function with alert for debug
  const handleLogin = () => {
    alert("Login button clicked!");
    if (username === "user" && password === "pass") {
      setIsLoggedIn(true);
      setMessage("");
      alert("Logged in successfully!");
    } else {
      setMessage("Invalid username or password");
    }
  };

  // Simple "signup" function with alert for debug
  const handleSignup = () => {
    alert("Sign Up button clicked!");
    if (username && password) {
      alert(`Account created for ${username}`);
      setMessage("Account created! You can now log in.");
      setUsername("");
      setPassword("");
    } else {
      setMessage("Please enter username and password");
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMessage("");
  };

  return (
    <div
      style={{
        backgroundColor: "#b71c1c",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>My Projects Portal</h1>
      <p>{new Date().toLocaleString()}</p>

      {!isLoggedIn ? (
        <div style={{ maxWidth: 300, width: "100%" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", marginBottom: 10, padding: 8, fontSize: 16 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 10, padding: 8, fontSize: 16 }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#f44336",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#d32f2f",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>

          {message && (
            <p
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "#b71c1c",
                borderRadius: 4,
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}
        </div>
      ) : (
        <>
          <h2>Welcome, {username}!</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              marginTop: 20,
              width: 300,
            }}
          >
            <a
              href="https://lyrics-liart.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: 10,
                backgroundColor: "#e53935",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                textAlign: "center",
                borderRadius: 4,
              }}
            >
              Lyrics
            </a>
            <a
              href="https://profile-guard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: 10,
                backgroundColor: "#e53935",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                textAlign: "center",
                borderRadius: 4,
              }}
            >
              Profile Guard
            </a>
            <a
              href="https://getnew-xi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: 10,
                backgroundColor: "#e53935",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                textAlign: "center",
                borderRadius: 4,
              }}
            >
              Token Getter (Cookie Method)
            </a>
          </div>

          <button
            onClick={handleLogout}
            style={{
              marginTop: 30,
              padding: 10,
              backgroundColor: "#b71c1c",
              border: "2px solid white",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            Logout
          </button>
        </>
      )}

      <div
        style={{
          marginTop: "auto",
          paddingTop: 30,
          paddingBottom: 10,
          textAlign: "center",
        }}
      >
        <a
          href="https://www.facebook.com/profile.php?id=61576992292379"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M22.675 0h-21.35C.6 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .593 23.406 0 22.675 0z" />
          </svg>
          Follow Me on Facebook
        </a>
      </div>
    </div>
  );
              }
              
