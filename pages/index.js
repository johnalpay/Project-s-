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
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);

  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [avatarId, setAvatarId] = useState(() =>
    localStorage.getItem("avatarId") || Math.floor(Math.random() * 1000)
  );

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

  function changeAvatar() {
    const newId = Math.floor(Math.random() * 1000);
    setAvatarId(newId);
    localStorage.setItem("avatarId", newId);
  }

  const avatarUrl = "https://i.pravatar.cc/40?u=" + avatarId;

  return (
    <main style={styles.container}>
      <header style={styles.stickyHeader}>
        <h1 style={styles.title}>My Projects</h1>
        <nav style={styles.nav}>
          {!user ? (
            <>
              <button style={styles.navButton} onClick={() => { setView("login"); setMessage(""); }} disabled={loading}>
                Login
              </button>
              <button style={styles.navButton} onClick={() => { setView("signup"); setMessage(""); }} disabled={loading}>
                Sign Up
              </button>
            </>
          ) : (
            <div style={styles.userProfile}>
              <img src={avatarUrl} alt={`${user} avatar`} style={styles.avatar} draggable={false} />
              <button style={styles.smallButton} onClick={changeAvatar}>Change Avatar</button>
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
            {loading ? <span style={styles.spinner}></span> : view === "login" ? "Login" : "Sign Up"}
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
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.5);
        }

        .visit-button:hover {
          background-color: #ff4b45;
          box-shadow: 0 6px 15px rgba(255,75,69,0.7);
          transform: scale(1.05);
        }

        .follow-button:hover {
          background-color: #E94560;
          color: #fff;
          border-color: #b22222;
          box-shadow: 0 6px 15px rgba(233,69,96,0.7);
          transform: scale(1.07);
        }
      `}</style>
    </main>
  );
}

function FacebookIcon() {
  return (
    <svg style={{ marginRight: 8 }} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v2h3l-1 3h-2v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 860,
    margin: "0 auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#1a1a1a",
    color: "#eee",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#222",
    padding: "12px 20px",
    borderRadius: "0 0 12px 12px",
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 3px 8px rgba(0,0,0,0.8)",
  },
  title: { fontSize: 24, margin: 0 },
  nav: { display: "flex", alignItems: "center", gap: 12 },
  navButton: {
    backgroundColor: "#ff4b45",
    border: "none",
    borderRadius: 6,
    padding: "6px 14px",
    color: "#eee",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: 14,
  },
  smallButton: {
    backgroundColor: "#333",
    border: "1px solid #555",
    borderRadius: 6,
    padding: "4px 10px",
    color: "#aaa",
    fontSize: 12,
    cursor: "pointer",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "2px solid #fff",
  },
  welcomeText: { fontWeight: "bold" },
  dateTime: { marginTop: 20, textAlign: "center", fontSize: 16, opacity: 0.9 },
  description: { textAlign: "center", margin: "20px 0" },
  projectsContainer: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  projectCard: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 12,
    transition: "0.3s ease",
  },
  projectName: { fontSize: 20, marginBottom: 8 },
  projectDesc: { marginBottom: 12 },
  button: {
    backgroundColor: "#ff4b45",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s ease",
  },
  form: {
    marginTop: 30,
    backgroundColor: "#2c2c2c",
    padding: 20,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #555",
    backgroundColor: "#1a1a1a",
    color: "#fff",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#ff4b45",
    cursor: "pointer",
    textDecoration: "underline",
  },
  message: { color: "#ff4b45" },
  footer: {
    marginTop: "auto",
    paddingTop: 20,
    textAlign: "center",
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #888",
    borderRadius: 8,
    fontWeight: "bold",
    color: "#eee",
    transition: "0.3s ease",
    cursor: "pointer",
  },
};
    
