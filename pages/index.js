import { useState, useEffect } from "react";

export default function Home() {
  const [view, setView] = useState("login"); 
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setView("home");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const saveUser = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === username)) {
      setError("Username already taken.");
      return;
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    setError("");
    alert("Account created successfully! Please login.");
    setView("login");
    setFormData({ username: "", password: "" });
  };

  const handleLogin = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      saveUser({ username: foundUser.username });
      setError("");
      setView("home");
      setFormData({ username: "", password: "" });
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setView("login");
  };

  const projects = [
    {
      name: "Lyrics",
      url: "https://lyrics-liart.vercel.app/",
      color: "#FFD700",
    },
    {
      name: "Profile Guard",
      url: "https://profile-guard.vercel.app/",
      color: "#FF6347",
    },
    {
      name: "Token Getter (Cookie Method)",
      url: "https://getnew-xi.vercel.app/",
      color: "#40E0D0",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#8B0000",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        Welcome to My Projects
      </h1>
      <p style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
        {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
      </p>

      {!user ? (
        <div
          style={{
            backgroundColor: "#B22222",
            padding: "2rem",
            borderRadius: "10px",
            width: "320px",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
          }}
        >
          <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
            {view === "login" ? "Login" : "Sign Up"}
          </h2>

          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "0.8rem",
              borderRadius: "5px",
              border: "none",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "none",
              fontSize: "1rem",
            }}
          />

          {error && (
            <p style={{ color: "#FFD700", marginBottom: "1rem" }}>{error}</p>
          )}

          {view === "login" ? (
            <>
              <button
                type="button"
                onClick={handleLogin}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#FF4500",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                }}
              >
                Login
              </button>
              <p style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setView("signup");
                    setFormData({ username: "", password: "" });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#FFD700",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    padding: 0,
                  }}
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSignup}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#FF4500",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                }}
              >
                Create Account
              </button>
              <p style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setView("login");
                    setFormData({ username: "", password: "" });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#FFD700",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    padding: 0,
                  }}
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            maxWidth: "480px",
            width: "100%",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>
            Hello, <span style={{ color: "#FFD700" }}>{user.username}</span>
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {projects.map(({ name, url, color }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: color,
                  color: "#000",
                  padding: "1rem 1.5rem",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -3px 0 rgba(0,0,0,0.15)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {name}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              setView("login");
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF4500",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "2rem",
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Facebook Follow Button */}
      <a
        href="https://www.facebook.com/profile.php?id=61576992292379"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "#3b5998",
          fontWeight: "bold",
          textDecoration: "none",
          fontSize: "1.1rem",
          marginTop: "auto",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#3b5998"
          width="24px"
          height="24px"
        >
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .593 23.406 0 22.675 0z" />
        </svg>
        Follow Me on Facebook
      </a>
    </div>
  );
      }
