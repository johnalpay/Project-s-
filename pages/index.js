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
  ];

  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState("home");
  const [sessionUser, setSessionUser] = useState(null);

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
    if (savedUser) setSessionUser(savedUser);
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
      setSessionUser(formUsername);
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
    setSessionUser(null);
    setView("home");
  }

  const avatarUrl = "https://i.pravatar.cc/40?u=" + sessionUser;

  return (
    <main style={styles.container}>
      <header style={styles.stickyHeader}>
        <h1 style={styles.title}>My Projects</h1>
        <nav style={styles.nav}>
          {!sessionUser ? (
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
                alt={`${sessionUser} avatar`}
                style={styles.avatar}
                draggable={false}
              />
              <span style={styles.welcomeText}>Welcome, {sessionUser}!</span>
              <button style={styles.navButton} onClick={handleLogout} disabled={loading}>
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
          {sessionUser && (
            <p style={{ textAlign: "center", marginBottom: 16 }}>
              You are logged in as <strong>{sessionUser}</strong>.
            </p>
          )}
          <p style={styles.description}>Here are the websites I have built.</p>
          <div style={styles.projectsContainer}>
            {projects.map((project) => (
              <div key={project.name} style={styles.projectCard} className="project-card">
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
        <form onSubmit={view === "login" ? handleLogin : handleSignup} style={styles.form}>
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

      {/* STICKER HERE */}
      <img
        src="/sticker.png"
        alt="Sticker"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 80,
          height: 80,
          zIndex: 999,
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      />
    </main>
  );
}

function FacebookIcon() {
  return (
    <svg
      fill="#1877F2"
      height="18"
      width="18"
      viewBox="0 0 24 24"
      style={{ marginRight: 6, verticalAlign: "middle" }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.466.099 2.797.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .593 23.406 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#f8f9fa",
    padding: "10px 0",
    marginBottom: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    borderBottom: "1px solid #ddd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  navButton: {
    backgroundColor: "#1877F2",
    border: "none",
    color: "white",
    padding: "6px 14px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 14,
    userSelect: "none",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
  welcomeText: {
    fontWeight: "600",
  },
  dateTime: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    color: "#666",
  },
  description: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 18,
  },
  projectsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  projectCard: {
    padding: 16,
    borderRadius: 6,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },
  projectName: {
    margin: 0,
    fontWeight: "bold",
    fontSize: 20,
  },
  projectDesc: {
    margin: "8px 0",
    fontSize: 16,
    color: "#555",
  },
  button: {
    backgroundColor: "#1877F2",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 14,
  },
  form: {
    maxWidth: 400,
    margin: "0 auto",
    padding: 20,
    borderRadius: 6,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  message: {
    color: "red",
    fontWeight: "600",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#1877F2",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "underline",
    padding: 0,
    fontSize: 14,
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    padding: 12,
    borderTop: "1px solid #ddd",
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1877F2",
    color: "white",
    padding: "8px 14px",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: "600",
  },
  spinner: {
    display: "inline-block",
    width: 16,
    height: 16,
    border: "2px solid rgba(255,255,255,0.6)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};
                  
