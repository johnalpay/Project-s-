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
              <img src={avatarUrl} alt={`${user} avatar`} style={styles.avatar} draggable={false} />
              <span style={styles.welcomeText}>Welcome, {user}!</span>
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
            {loading ? <span style={styles.spinner} aria-label="loading"></span> : view === "login" ? "Login" : "Sign Up"}
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
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
        }}
      />

      <style jsx>{`
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
        }
        .visit-button:hover {
          background-color: #ff4b45;
          box-shadow: 0 6px 15px rgba(255, 75, 69, 0.7);
          transform: scale(1.05);
        }
        .visit-button:active {
          transform: scale(0.98);
        }
        .follow-button:hover {
          background-color: #e94560;
          color: #fff;
          border-color: #b22222;
          box-shadow: 0 6px 15px rgba(233, 69, 96, 0.7);
          transform: scale(1.07);
        }
        .follow-button:active {
          transform: scale(0.95);
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}

function FacebookIcon() {
  return (
    <svg
      fill="currentColor"
      height="18"
      width="18"
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={{ marginRight: 8 }}
    >
      <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.49v-9.294H9.691v-3.622h3.126V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.466.099 2.796.143v3.24l-1.92.001c-1.505 0-1.797.715-1.797 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    backgroundColor: "#1a1a1a",
    color: "#eee",
    minHeight: "100vh",
    width: "100vw",
    maxWidth: "100vw",
    padding: "12px 24px",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: "hidden",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#111",
    zIndex: 999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid #333",
  },
  title: {
    fontSize: 22,
    margin: 0,
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  navButton: {
    backgroundColor: "#ff5645",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 14,
    transition: "background-color 0.3s",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    borderRadius: "50%",
    width: 40,
    height: 40,
    objectFit: "cover",
    userSelect: "none",
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  dateTime: {
    marginTop: 16,
    fontWeight: "600",
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    userSelect: "none",
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
  projectsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
    marginTop: 18,
  },
  projectCard: {
    backgroundColor: "#333",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
    userSelect: "none",
    transition: "all 0.3s ease",
  },
  projectName: {
    margin: "0 0 8px 0",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4b45",
  },
  projectDesc: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ff4b45",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 14,
    userSelect: "none",
    transition: "all 0.3s ease",
  },
  form: {
    backgroundColor: "#222",
    padding: 24,
    borderRadius: 12,
    maxWidth: 400,
    margin: "32px auto",
    color: "#ddd",
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    marginBottom: 16,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #555",
    backgroundColor: "#111",
    color: "#eee",
  },
  message: {
    color: "#ff6b6b",
    marginBottom: 16,
  },
  spinner: {
    display: "inline-block",
    width: 16,
    height: 16,
    border: "2px solid #eee",
    borderTop: "2px solid #ff4b45",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#ff5645",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 14,
    padding: 0,
  },
  footer: {
    marginTop: 48,
    textAlign: "center",
    paddingBottom: 40,
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ff4b45",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 22px",
    borderRadius: 12,
    textDecoration: "none",
    fontSize: 14,
    userSelect: "none",
    transition: "all 0.3s ease",
    border: "1px solid #ff1e0e",
  },
};
