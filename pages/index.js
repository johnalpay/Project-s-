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

      {/* STICKER */}
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
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="facebook"
      className="svg-inline--fa fa-facebook fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="20"
      height="20"
      style={{ marginRight: 8, verticalAlign: "middle", fill: "#1877F2" }}
    >
      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209 245v-173h-63v-72h63v-55.2c0-62.15 37-96.8 93.67-96.8 27.14 0 55.55 4.84 55.55 4.84v61h-31.28c-30.83 0-40.44 19.16-40.44 38.8V256h69l-11 72h-58v173c118.31-18.62 209-121.22 209-245z"></path>
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
    padding: "12px 0", // <-- Removed left/right padding to fix white space on left
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: "hidden",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#222",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    borderRadius: 6,
    boxShadow: "0 0 8px rgba(0,0,0,0.8)",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 0,
    userSelect: "none",
  },
  nav: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  navButton: {
    cursor: "pointer",
    padding: "8px 16px",
    backgroundColor: "#333",
    border: "none",
    borderRadius: 6,
    color: "#eee",
    fontWeight: "600",
    transition: "background-color 0.25s ease",
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
  },
  welcomeText: {
    fontWeight: "600",
  },
  dateTime: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 14,
    textAlign: "center",
    userSelect: "none",
    color: "#ccc",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
  },
  projectsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "center",
  },
  projectCard: {
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    padding: 24,
    width: 300,
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    transition: "all 0.3s ease",
    userSelect: "none",
  },
  projectName: {
    marginTop: 0,
    marginBottom: 8,
    fontWeight: "700",
  },
  projectDesc: {
    marginTop: 0,
    marginBottom: 16,
    color: "#bbb",
  },
  button: {
    cursor: "pointer",
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    backgroundColor: "#444",
    color: "#eee",
    fontWeight: "600",
    transition: "all 0.25s ease",
  },
  form: {
    maxWidth: 400,
    margin: "32px auto",
    backgroundColor: "#2c2c2c",
    padding: 24,
    borderRadius: 8,
    boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
    color: "#eee",
    userSelect: "none",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 16,
    borderRadius: 6,
    border: "none",
    outline: "none",
    fontSize: 16,
  },
  message: {
    marginBottom: 12,
    color: "#ff5555",
    fontWeight: "600",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#57aaff",
    cursor: "pointer",
    fontWeight: "600",
    padding: 0,
    userSelect: "none",
  },
  footer: {
    marginTop: 48,
    textAlign: "center",
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1877F2",
    color: "#fff",
    fontWeight: "700",
    padding: "12px 24px",
    borderRadius: 12,
    textDecoration: "none",
    boxShadow: "0 8px 24px rgba(24, 119, 242, 0.4)",
    userSelect: "none",
    transition: "all 0.3s ease",
  },
  spinner: {
    display: "inline-block",
    width: 18,
    height: 18,
    border: "3px solid #eee",
    borderTop: "3px solid #666",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};
    
