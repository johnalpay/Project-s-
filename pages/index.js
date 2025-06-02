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
    <main style={styles.container}>
      <header style={styles.stickyHeader}>
        <h1 style={styles.title}>My Projects</h1>
        <nav style={styles.nav}>
          {!user ? (
            <>
              <button style={styles.navButton} onClick={() => { setView("login"); setMessage(""); }} disabled={loading}>Login</button>
              <button style={styles.navButton} onClick={() => { setView("signup"); setMessage(""); }} disabled={loading}>Sign Up</button>
            </>
          ) : (
            <div style={styles.userProfile}>
              <img src={avatarUrl} alt={`${user} avatar`} style={styles.avatar} />
              <span style={styles.welcomeText}>Welcome, {user}!</span>
              <button style={styles.navButton} onClick={handleLogout} disabled={loading}>Logout</button>
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
          <input type="text" placeholder="Username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} style={styles.input} autoComplete="username" disabled={loading} />
          <input type="password" placeholder="Password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} style={styles.input} autoComplete={view === "login" ? "current-password" : "new-password"} disabled={loading} />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? <span style={styles.spinner} aria-label="loading"></span> : view === "login" ? "Login" : "Sign Up"}
          </button>
          <p style={{ marginTop: 12 }}>
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <button type="button" style={styles.linkButton} onClick={() => { setView("signup"); setMessage(""); }} disabled={loading}>Sign Up</button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" style={styles.linkButton} onClick={() => { setView("login"); setMessage(""); }} disabled={loading}>Login</button>
              </>
            )}
          </p>
        </form>
      )}

      <footer style={styles.footer}>
        <a href="https://www.facebook.com/profile.php?id=61576992292379" target="_blank" rel="noopener noreferrer" style={styles.followButton} className="follow-button">
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
    <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }} width="20" height="20" viewBox="0 0 24 24" fill="#fff">
      <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.333v21.333C0 23.404.596 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.41c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.098 2.797.142v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.596 1.325-1.334V1.333C24 .596 23.404 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    padding: 20,
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#111",
    color: "#eee",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    background: "#1a1a1a",
    width: "100%",
    padding: 10,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",
  },
  title: {
    fontSize: "1.8rem",
  },
  nav: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  navButton: {
    background: "#dc143c",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    borderRadius: "50%",
    width: 32,
    height: 32,
  },
  welcomeText: {
    fontWeight: "bold",
  },
  dateTime: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: "0.95rem",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: 12,
  },
  projectsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 16,
    width: "100%",
  },
  projectCard: {
    background: "#1f1f1f",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  projectName: {
    fontSize: "1.2rem",
    marginBottom: 8,
  },
  projectDesc: {
    fontSize: "0.95rem",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#dc143c",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
  form: {
    background: "#222",
    padding: 20,
    borderRadius: 10,
    maxWidth: 400,
    width: "100%",
    textAlign: "center",
    marginTop: 20,
  },
  message: {
    color: "crimson",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    borderRadius: 6,
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#dc143c",
    cursor: "pointer",
    textDecoration: "underline",
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    textAlign: "center",
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#dc143c",
    color: "#fff",
    borderRadius: 8,
    fontWeight: "bold",
    border: "2px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
  },
  spinner: {
    display: "inline-block",
    width: 16,
    height: 16,
    border: "2px solid #fff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};
    
