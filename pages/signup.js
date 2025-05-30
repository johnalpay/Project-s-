// pages/signup.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isAuthenticated, loginUser } from "../lib/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/");
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (username.trim()) {
      loginUser(username); // for demo, signup = login
      router.push("/");
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10, margin: 10 }}
        />
        <button type="submit" style={{ padding: 10 }}>Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
