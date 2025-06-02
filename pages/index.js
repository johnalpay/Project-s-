import { useEffect, useState } from "react";

export default function Home() {
  const projects = [
    {
      name: "Lyrics",
      url: "https://lyrics-wheat.vercel.app/",
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
    {
      name: "Weather",
      url: "https://weather-five-dun.vercel.app/",
      description: "Check the latest Weather",
    },
  ];

  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
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

  async function handleSignup(e) {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

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

  async function handleLogin(e) {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

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

  const avatarUrl = "https://i.pravatar.cc/40?u=" + user;

  return (
    <>
      <style jsx global>{`
        /* Remove default body margin/padding for full screen */
        body, html, #__next {
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          overflow-x: hidden;
          background-color: #111;
          color: #eee;
          font-family: 'Segoe UI', sans-serif;
        }
      `}</style>
      <main style={styles.container}>
        <header style={styles.stickyHeader}>
          <h1 style={styles.title}>My Projects</h1>
          <nav style={styles.nav}>
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
              <div style={styles.userProfile}>
                <img
                  src={avatarUrl}
                  alt={`${user} avatar`}
                  style={styles.avatar}
                />
                <span style={styles.welcomeText}>Welcome, {user}!</span>
                <button
                  style={styles.navButton}
                  onClick={handleLogout}
                  disabled={loading}
                >
                  Logout
                </button>
              </div>
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
                    <button
                      style={styles.button}
                      className="visit-button"
                      disabled={loading}
                    >
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
            className="follow-button"
          >
            <FacebookIcon /> Follow me on Facebook
          </a>
        </footer>

        <style jsx>{`
          .project-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(255, 0, 0, 0.6);
          }
          .visit-button:hover {
            background-color: #b22222;
            box-shadow: 0 6px 15px rgba(178, 34, 34, 0.7);
            transform: scale(1.05);
          }
          .visit-button:active {
            transform: scale(0.98);
          }
          .follow-button:hover {
            background-color: #b22222;
            color: #fff;
            border-color: #7a1212;
            box-shadow: 0 6px 15px rgba(178, 34, 34, 0.7);
            transform: scale(1.07);
          }
          .follow-button:active {
            transform: scale(0.96);
          }
        `}</style>
      </main>
    </>
  );
}

const FacebookIcon = () => (
  <svg
    style={{ marginRight: 8 }}
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M22 12a10 10 0 10-11.5 9.87v-6.98h-2.3v-2.9h2.3v-2.2c0-2.27 1.35-3.53 3.42-3.53.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.41v1.92h2.5l-.4 2.9h-2.1v6.98A10 10 0 0022 12z" />
  </svg>
);

const styles = {
  container: {
    minHeight: "100vh",
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 16px 32px",
    display: "flex",
    flexDirection: "column",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#111",
    zIndex: 999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: "bold",
    color: "#eee",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  navButton: {
    backgroundColor: "transparent",
    border: "2px solid #eee",
    borderRadius: 6,
    color: "#eee",
    cursor: "pointer",
    padding: "6px 14px",
    fontWeight: "600",
    fontSize: 14,
    transition: "all 0.25s ease",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    borderRadius: "50%",
    width: 40,
    height: 40,
    objectFit: "cover",
  },
  welcomeText: {
    color: "#eee",
    fontWeight: "600",
  },
  dateTime: {
    marginTop: 12,
    fontSize: 14,
    color: "#bbb",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    marginTop: 24,
    textAlign: "center",
    color: "#ccc",
  },
  projectsContainer: {
    marginTop: 24,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 24,
  },
  projectCard: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  projectName: {
    margin: "0 0 12px",
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
  projectDesc: {
    flexGrow: 1,
    color: "#ddd",
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#d32f2f",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    padding: "10px 14px",
    fontWeight: "600",
    fontSize: 16,
    transition: "all 0.3s ease",
  },
  form: {
    marginTop: 48,
    maxWidth: 360,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 24,
    backgroundColor: "#222",
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.7)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1.5px solid #555",
    backgroundColor: "#111",
    color: "#eee",
    fontSize: 16,
  },
  message: {
    color: "#f44336",
    fontWeight: "600",
    fontSize: 14,
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#d32f2f",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 14,
    padding: 0,
    fontWeight: "600",
  },
  spinner: {
    display: "inline-block",
    width: 18,
    height: 18,
    border: "3px solid #f44336",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    marginTop: "auto",
    padding: 16,
    textAlign: "center",
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#d32f2f",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: "600",
    fontSize: 16,
    transition: "all 0.25s ease",
  },
};

/* Add spinner keyframes */
<style jsx global>{`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`}</style>;
  
