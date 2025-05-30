import { useState, useEffect } from "react";

const projects = [
  {
    name: "Lyrics Finder",
    description: "Find lyrics to your favorite songs.",
    url: "https://lyrics-liart.vercel.app/",
  },
  {
    name: "Profile Guard",
    description: "Protect your Facebook profile picture.",
    url: "https://profile-guard.vercel.app/",
  },
  {
    name: "Token Getter (Cookie Method)",
    description: "Get your Facebook token safely.",
    url: "https://getnew-xi.vercel.app/",
  },
];

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#b71c1c", // dark red bg
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    fontSize: 42,
    fontWeight: "bold",
    margin: "20px 0 10px",
    textShadow: "2px 2px 6px #6b0000",
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 40,
    color: "#ffcdd2",
  },
  description: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  projectsContainer: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 900,
  },
  projectCard: {
    background:
      "linear-gradient(135deg, #ff5252 0%, #b71c1c 100%)",
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(255, 82, 82, 0.5)",
    padding: 25,
    width: 280,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.3s ease",
  },
  projectName: {
    fontSize: 26,
    marginBottom: 10,
  },
  projectDesc: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff1744",
    border: "none",
    borderRadius: 30,
    padding: "10px 22px",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    boxShadow: "0 6px 15px #ff1744cc",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#ff4569",
  },
  footer: {
    marginTop: 60,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  facebookButton: {
    backgroundColor: "#1877f2",
    border: "none",
    borderRadius: 30,
    padding: "8px 14px",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: "600",
    fontSize: 15,
    textDecoration: "none",
  },
  facebookIcon: {
    width: 20,
    height: 20,
    fill: "#fff",
  },
  formContainer: {
    backgroundColor: "#8b0000",
    padding: 30,
    borderRadius: 14,
    boxShadow: "0 4px 18px rgba(0,0,0,0.4)",
    width: 350,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    outline: "none",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#ffcdd2",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: 16,
  },
  errorText: {
    color: "#ff8080",
    fontWeight: "bold",
    fontSize: 14,
  },
};

export default function Home() {
  const [view, setView] = useState("home"); // home, login, signup
  const [user, setUser] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  // Form states
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save user to localStorage for persistence
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const saveUser = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  // Simple fake signup/login logic (no backend)
  const handleSignup = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    // Save user in localStorage as simple demo
    const newUser = { username, password };
    localStorage.setItem("users", JSON.stringify([...(JSON.parse(localStorage.getItem("users")) || []), newUser]));
    saveUser({ username });
    setError("");
    setView("home");
    setFormData({ username: "", password: "" });
  };

  const handleLogin = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      saveUser({ username });
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
    setView("home");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Projects Showcase</h1>
      <div style={styles.dateTime}>
        {dateTime.toLocaleDateString()} • {dateTime.toLocaleTimeString()}
      </div>

      {view === "home" && (
        <>
          {!user ? (
            <p style={{ fontSize: 18, color: "#ffb3b3", marginBottom: 40, textAlign: "center" }}>
              Please{" "}
              <button style={styles.linkButton} onClick={() => setView("login")}>
                login
              </button>{" "}
              or{" "}
              <button style={styles.linkButton} onClick={() => setView("signup")}>
                sign up
              </button>{" "}
              to access the projects.
            </p>
          ) : (
            <>
              <p style={styles.description}>Here are the websites I have built.</p>

              <div style={styles.projectsContainer}>
                {projects.map((project) => (
                  <div
                    key={project.name}
                    style={styles.projectCard}
                    className="project-card"
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <h2 style={styles.projectName}>{project.name}</h2>
                    <p style={styles.projectDesc}>{project.description}</p>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <button style={styles.button} className="visit-button">
                        Visit
                      </button>
                    </a>
                  </div>
                ))}
              </div>

              <button
                style={{ ...styles.button, marginTop: 40, backgroundColor: "#b71c1c" }}
                onClick={handleLogout}
              >
                Logout ({user.username})
              </button>
            </>
          )}
        </>
      )}

      {(view === "login" || view === "signup") && (
        <div style={styles.formContainer}>
          <h2 style={{ marginBottom: 10 }}>{view === "login" ? "Login" : "Sign Up"}</h2>

          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          />
          {error && <p style={styles.errorText}>{error}</p>}

          <button
            style={{ ...styles.button, marginTop: 10 }}
            onClick={view === "login" ? handleLogin : handleSignup}
          >
            {view === "login" ? "Login" : "Sign Up"}
          </button>

          <p style={{ marginTop: 15, fontSize: 14, color: "#ffcdd2" }}>
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <button style={styles.linkButton} onClick={() => setView("signup")}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button style={styles.linkButton} onClick={() => setView("login")}>
                  Login
                </button>
              </>
            )}
          </p>
          <button
            style={{ ...styles.button, backgroundColor: "#b71c1c", marginTop: 15 }}
            onClick={() => setView("home")}
          >
            Back to Home
          </button>
        </div>
      )}

      <footer style={styles.footer}>
        <a
          href="https://www.facebook.com/profile.php?id=61576992292379"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.facebookButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={styles.facebookIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M22.675 0h-21.35C.592 0 0 .593 0 1.326v21.348C0 23.406.592 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.098 2.797.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
          </svg>
          Follow
        </a>
      </footer>
    </div>
  );
  }
    
