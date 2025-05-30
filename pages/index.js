import { useState, useEffect } from "react";
import Head from "next/head";
import { FaFacebook } from "react-icons/fa";

export default function Home() {
  const [currentView, setCurrentView] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(storedUser);
    }
  }, []);

  const handleLogin = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const matched = accounts.find(
      (acc) => acc.username === username && acc.password === password
    );
    if (matched) {
      localStorage.setItem("loggedInUser", username);
      setIsAuthenticated(true);
      setCurrentUser(username);
      alert("Login successful!");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleSignup = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const exists = accounts.find((acc) => acc.username === username);
    if (exists) {
      alert("Username already exists");
    } else {
      accounts.push({ username, password });
      localStorage.setItem("accounts", JSON.stringify(accounts));
      alert("Account created! Please log in.");
      setCurrentView("login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
    setCurrentUser("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-800 text-white p-4">
      <Head>
        <title>My Projects</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6">Welcome to My Projects</h1>

      {!isAuthenticated ? (
        <div className="bg-white text-black rounded-xl p-6 shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">
            {currentView === "login" ? "Login" : "Sign Up"}
          </h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border mb-3 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border mb-4 rounded"
          />
          <button
            onClick={currentView === "login" ? handleLogin : handleSignup}
            className="bg-red-700 text-white w-full py-2 rounded hover:bg-red-900"
          >
            {currentView === "login" ? "Login" : "Sign Up"}
          </button>
          <p
            onClick={() => setCurrentView(currentView === "login" ? "signup" : "login")}
            className="text-sm text-center mt-3 text-red-600 cursor-pointer"
          >
            {currentView === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-lg">Hello, <strong>{currentUser}</strong>! Here are your projects:</p>
          <div className="grid gap-4">
            <a
              href="https://lyrics-liart.vercel.app/"
              className="bg-white text-red-800 py-2 px-4 rounded shadow hover:bg-red-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎵 Lyrics Finder
            </a>
            <a
              href="https://profile-guard.vercel.app/"
              className="bg-white text-red-800 py-2 px-4 rounded shadow hover:bg-red-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              🛡️ Profile Guard
            </a>
            <a
              href="https://getnew-xi.vercel.app/"
              className="bg-white text-red-800 py-2 px-4 rounded shadow hover:bg-red-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔐 Token Getter (Cookie Method)
            </a>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-900"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <footer className="mt-10 text-sm flex items-center gap-2">
        <a
          href="https://www.facebook.com/profile.php?id=61576992292379"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white hover:text-blue-300"
        >
          <FaFacebook className="text-xl" /> Follow me on Facebook
        </a>
      </footer>
    </div>
  );
        }
              
