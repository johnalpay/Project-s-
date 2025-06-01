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

    if (users[formUsername] === formPassword) {
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
              <img src={avatarUrl} alt="avatar" style={styles.avatar} draggable={false} />
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
                  <button style={styles.button} className="visit-button" disabled={loading}>Visit</button>
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
          <input type="text" placeholder="Username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} style={styles.input} disabled={loading} />
          <input type="password" placeholder="Password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} style={styles.input} disabled={loading} />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Loading..." : view === "login" ? "Login" : "Sign Up"}
          </button>
          <p style={{ marginTop: 12 }}>
            {view === "login" ? (
              <>Don't have an account? <button type="button" style={styles.linkButton} onClick={() => { setView("signup"); setMessage(""); }} disabled={loading}>Sign Up</button></>
            ) : (
              <>Already have an account? <button type="button" style={styles.linkButton} onClick={() => { setView("login"); setMessage(""); }} disabled={loading}>Login</button></>
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
        html, body {
          margin: 0;
          padding: 0;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(255, 0, 0, 0.4);
        }

        .visit-button:hover {
          background-color: #b22222;
          box-shadow: 0 6px 15px rgba(178, 34, 34, 0.7);
        }

        .follow-button:hover {
          background-color: #b22222;
          color: #fff;
        }
      `}</style>
    </main>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }} width="20" height="20" fill="#fff" viewBox="0 0 24 24">
      <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.333v21.333C0 23.404.596 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.41c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.098 2.797.142v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.596 1.325-1.334V1.333C24 .596 23.404 0 22.675 0z"/>
    </svg>
  );
}

const styles = {
  container: {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#111",
    color: "#fff",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stickyHeader: {
    width: "100%",
    backgroundColor: "#222",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
  },
  nav: {
    display: "flex",
    gap: 10,
  },
  navButton: {
    padding: "6px 12px",
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    borderRadius: "50%",
    width: 32,
    height: 32,
  },
  welcomeText: {
    fontSize: 14,
  },
  dateTime: {
    margin: "1rem 0",
    fontSize: 16,
  },
  description: {
    marginBottom: 16,
    textAlign: "center",
  },
  projectsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    padding: "1rem",
  },
  projectCard: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 20,
    width: 260,
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  projectName: {
    fontSize: 18,
    marginBottom: 8,
  },
  projectDesc: {
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#d33",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  form: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 8,
    width: "100%",
    maxWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 30,
  },
  input: {
    padding: 10,
    borderRadius: 4,
    border: "1px solid #555",
    backgroundColor: "#111",
    color: "#fff",
  },
  message: {
    color: "tomato",
    fontSize: 14,
    textAlign: "center",
  },
  linkButton: {
    color: "#f66",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  footer: {
    marginTop: "auto",
    padding: "1rem",
    backgroundColor: "#111",
    width: "100%",
    textAlign: "center",
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#444",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 6,
    textDecoration: "none",
    border: "1px solid #333",
    cursor: "pointer",
  },
};
            
