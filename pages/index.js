import { useEffect, useState } from "react";

export default function Home() {
  const projects = [
    {
      name: "Lyrics",
      url: "https://lyrics-liart.vercel.app/",
      description: "Lyrics Finder Website",
    },
    {
      name: "Profile Guard",
      url: "https://profile-guard.vercel.app/",
      description: "Facebook Profile Guard Tool",
    },
    {
      name: "Token Getter (Cookie Method)",
      url: "https://getnew-xi.vercel.app/",
      description: "Facebook Token Getter using Cookie Method",
    },
  ];

  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState("home"); // "home", "login", "signup"
  const [user, setUser] = useState(null);

  // For form fields
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // <- Loading state

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check localStorage for logged in user
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) setUser(savedUser);
  }, []);

  const formattedDate = dateTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString();

  // Signup handler
  async function handleSignup(e) {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // fake delay para makita ang loading

    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : {};

    if (users[formUsername]) {
      setMessage("Username already exists. Please login or choose another.");
      setLoading(false);
      return;
    }

    users[formUsername] = formPassword;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful! Please login now.");
    setFormUsername("");
    setFormPassword("");
    setView("login");
    setLoading(false);
  }

  // Login handler
  async function handleLogin(e) {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // fake delay para makita ang loading

    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : {};

    if (users[formUsername] && users[formUsername] === formPassword) {
      localStorage.setItem("loggedInUser", formUsername);
      setUser(formUsername);
      setMessage("");
      setFormUsername("");
      setFormPassword("");
      setView("home");
    } else {
      setMessage("Invalid username or password.");
    }
    setLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setView("home");
  }

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>My Projects</h1>
        <nav>
          {!user ? (
            <>
              <button
                style={styles.navButton}
                onClick={() => {
                  setView("login");
                  setMessage("");
                }}
                disabled={loading}
              >
                Login
              </button>
              <button
                style={styles.navButton}
                onClick={() => {
                  setView("signup");
                  setMessage("");
                }}
                disabled={loading}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span style={{ marginRight: 15, fontWeight: "600" }}>
                Welcome, {user}!
              </span>
              <button style={styles.navButton} onClick={handleLogout} disabled={loading}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <div style={styles.dateTime}>
        <span>{formattedDate}</span> | <span>{formattedTime}</span>
      </div>

      {view === "home" && (
        <>
          <p style={styles.description}>Here are the websites I have built.</p>

          <div style={styles.projectsContainer}>
            {projects.map((project) => (
              <div
                key={project.name}
                style={styles.projectCard}
                className="project-card"
              >
                <h2 style={styles.projectName}>{project.name}</h2>
                <p style={styles.projectDesc}>{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <button style={styles.button} className="visit-button" disabled={loading}>
                    Visit
                  </button>
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {(view === "login" || view === "signup") && (
        <form
          onSubmit={view === "login" ? handleLogin : handleSignup}
          style={styles.form}
        >
          <h2>{view === "login" ? "Login" : "Sign Up"}</h2>
          {message && <p style={styles.message}>{message}</p>}
          <input
            type="text"
            placeholder="Username"
            value={formUsername}
            onChange={(e) => setFormUsername(e.target.value)}
            style={styles.input}
            autoComplete="username"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
            style={styles.input}
            autoComplete={view === "login" ? "current-password" : "new-password"}
            disabled={loading}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              <span style={styles.spinner} aria-label="loading"></span>
            ) : view === "login" ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
          <p style={{ marginTop: 12 }}>
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  style={styles.linkButton}
                  onClick={() => {
                    setView("signup");
                    setMessage("");
                  }}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  style={styles.linkButton}
                  onClick={() => {
                    setView("login");
                    setMessage("");
                  }}
                  disabled={loading}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </form>
      )}

      <footer style={styles.footer}>
        <a
          href="https://www.facebook.com/profile.php?id=61576992292379"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.followButton}
          aria-label="Follow on Facebook"
          className="follow-button"
        >
          <FacebookIcon /> Follow me on Facebook
        </a>
      </footer>

      <style jsx>{`
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.5);
        }

        .visit-button:hover {
          background-color: #ff4b45;
          box-shadow: 0 6px 15px rgba(255,75,69,0.7);
          transform: scale(1.05);
        }

        .visit-button:active {
          transform: scale(0.98);
        }

        .follow-button:hover {
          background-color: #E94560;
          color: #fff;
          border-color: #b22222;
          box-shadow: 0 6px 15px rgba(233,69,96,0.7);
          transform: scale(1.07);
        }

        .follow-button:active {
          transform: scale(0.95);
        }

        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </main>
  );
}

function FacebookIcon() {
  return (
    <svg
      style={{ marginRight: 8 }}
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      fill="#E94560"
    >
      <path d="M22.675 0H1.325C.593 0 0 .592 0 1.323v21.354C0 23.407.593 24 1.325 24h11.497v-9.294H9.692v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 2.797.142v3.243l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.677V1.323C24 .592 23.407 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 640,
    margin: "auto",
    fontFamily: "'Inter', sans-serif",
    padding: 20,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  navButton: {
    cursor: "pointer",
    padding: "6px 14px",
    margin: "0 6px",
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 8,
    backgroundColor: "#E94560",
    border: "none",
    color: "#fff",
    transition: "all 0.2s ease-in-out",
  },
  dateTime: {
    marginTop: 12,
    fontWeight: "600",
    color: "#555",
    fontSize: 14,
  },
  description: {
    marginTop: 30,
    fontWeight: "500",
    fontSize: 16,
    color: "#444",
  },
  projectsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginTop: 16,
  },
  projectCard: {
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    cursor: "default",
  },
  projectName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  projectDesc: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 12,
    color: "#333",
  },
  button: {
    cursor: "pointer",
    padding: "10px 22px",
    backgroundColor: "#E94560",
    borderRadius: 8,
    color: "#fff",
    border: "none",
    fontWeight: "600",
    fontSize: 16,
    transition: "all 0.2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    maxWidth: 360,
    margin: "30px auto",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  },
  input: {
    width: "100%",
    padding: 12,
    margin: "12px 0",
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 16,
  },
  message: {
    color: "#b22222",
    fontWeight: "600",
    marginTop: 6,
  },
  linkButton: {
    border: "none",
    background: "none",
    color: "#E94560",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 15,
    textDecoration: "underline",
  },
  footer: {
    marginTop: 60,
    padding: 20,
    textAlign: "center",
  },
  followButton: {
    cursor: "pointer",
    padding: "12px 28px",
    fontWeight: "700",
    fontSize: 18,
    backgroundColor: "#f8f4f0",
    borderRadius: 8,
    border: "2px solid #E94560",
    color: "#E94560",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    userSelect: "none",
  },
  spinner: {
    display: "inline-block",
    width: 18,
    height: 18,
    border: "3px solid #fff",
    borderTop: "3px solid #E94560",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};
                  
