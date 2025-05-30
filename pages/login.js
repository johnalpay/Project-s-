import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isAuthenticated, loginUser } from "../lib/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      loginUser(username);
      router.push("/");
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10, margin: 10 }}
        />
        <button type="submit" style={{ padding: 10 }}>Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
            }
