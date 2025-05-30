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
  function handleSignup(e) {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : {};

    if (users[formUsername]) {
      setMessage("Username already exists. Please login or choose another.");
      return;
    }

    users[formUsername] = formPassword;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful! Please login now.");
    setFormUsername("");
    setFormPassword("");
    setView("login");
  }

  // Login handler
  function handleLogin(e) {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

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
              >
                Login
              </button>
              <button
                style={styles.navButton}
                onClick={() => {
                  setView("signup");
                  setMessage("");
                }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span style={{ marginRight: 15, fontWeight: "600" }}>
                Welcome, {user}!
              </span>
              <button style={styles.navButton} onClick={handleLogout}>
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
                  <button style={styles.button} className="visit-button">
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
          />
          <input
            type="password"
            placeholder="Password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
            style={styles.input}
            autoComplete={view === "login" ? "current-password" : "new-password"}
          />
          <button type="submit" style={styles.button}>
            {view === "login" ? "Login" : "Sign Up"}
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
        /* Remove white margin and make full background */
        :global(html, body) {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #1e3a8a;
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Make sure main fills vertical height and centers */
        main {
          min-height: 100vh;
          padding: 50px 25px 60px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
        }

        .visit-button:hover {
          background-color: #3b82f6; /* blue-500 */
          box-shadow: 0 6px 15px rgba(59, 130, 246, 0.7);
          transform: scale(1.05);
        }

        .visit-button:active {
          transform: scale(0.98);
        }

        .follow-button:hover {
          background-color: #2563eb; /* blue-600 */
          color: #fff;
          border-color: #1e40af; /* blue-900 */
          box-shadow: 0 6px 15px rgba(37, 99, 235, 0.7);
          transform: scale(1.07);
        }

        .follow-button:active {
          transform: scale(0.95);
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
      fill="#3b82f6" // blue fill
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: 0, // remove margin so it sticks full width horizontally
    padding: "50px 25px 60px",
    textAlign: "center",
    backgroundColor: "#1E3A8A",
    minHeight: "100vh",
    color: "#fff",
    boxSizing: "border-box",
    borderRadius: 12,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottom: "2px solid #2563eb",
  },

  title: {
    fontWeight: "bold",
    fontSize: 34,
    margin: 0,
    color: "#bfdbfe",
  },

  navButton: {
    marginLeft: 15,
    padding: "8px 14px",
    fontSize: 14,
    cursor: "pointer",
    borderRadius: 6,
    border: "2px solid #bfdbfe",
    backgroundColor: "transparent",
    color: "#bfdbfe",
    fontWeight: "600",
    transition: "all 0.25s ease",
  },

  dateTime: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    color: "#a5b4fc",
  },

  description: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 35,
    marginBottom: 25,
    color: "#bfdbfe",
  },

  projectsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },

  projectCard: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 6px 15px rgba(37, 99, 235, 0.5)",
    color: "#e0e7ff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    maxWidth: 700,
    margin: "0 auto",
  },

  projectName: {
    fontSize: 22,
    fontWeight: "700",
    margin: "0 0 8px 0",
  },

  projectDesc: {
    fontSize: 15,
    fontWeight: "500",
    margin: "0 0 15px 0",
    color: "#c7d2fe",
  },

  button: {
    cursor: "pointer",
    borderRadius: 7,
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "700",
    padding: "10px 22px",
    fontSize: 16,
    transition: "all 0.3s ease",
  },

  form: {
    maxWidth: 380,
    margin: "35px auto 0",
    padding: 25,
    backgroundColor: "#1e40af",
    borderRadius: 12,
    boxShadow: "0 8px 22px rgba(29, 78, 216, 0.6)",
  },

  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: 18,
    borderRadius: 8,
    border: "none",
    fontSize: 15,
    boxSizing: "border-box",
  },

  message: {
    fontSize: 14,
    marginBottom: 15,
    fontWeight: "600",
    color: "#fca5a5",
  },

  linkButton: {
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#bfdbfe",
    fontWeight: "700",
    textDecoration: "underline",
    padding: 0,
    fontSize: 15,
  },

  footer: {
    marginTop: 55,
    borderTop: "2px solid #2563eb",
    paddingTop: 20,
  },

  followButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    borderRadius: 8,
    border: "2px solid #3b82f6",
    backgroundColor: "transparent",
    padding: "10px 22px",
    fontWeight: "700",
    fontSize: 16,
    color: "#3b82f6",
    transition: "all 0.3s ease",
    textDecoration: "none",
    userSelect: "none",
  },
};
                  
