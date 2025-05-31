import { useEffect, useState } from "react";

export default function Home() {
  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const formattedTime = dateTime.toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const avatarUrl = `https://i.pravatar.cc/40?u=${user}`;

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[formUsername]) {
      setMessage("Username already exists.");
      setLoading(false);
      return;
    }

    users[formUsername] = formPassword;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful! Please login.");
    setView("login");
    setFormUsername("");
    setFormPassword("");
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[formUsername] === formPassword) {
      localStorage.setItem("loggedInUser", formUsername);
      setUser(formUsername);
      setFormUsername("");
      setFormPassword("");
      setMessage("");
      setView("home");
    } else {
      setMessage("Invalid username or password.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setView("home");
  };

  return (
    <main style={styles.container}>
      <header style={styles.stickyHeader}>
        <h1 style={styles.title}>My Projects</h1>
        <nav style={styles.nav}>
          {!user ? (
            <>
              <button style={styles.navButton} onClick={() => setView("login")} disabled={loading}>
                Login
              </button>
              <button style={styles.navButton} onClick={() => setView("signup")} disabled={loading}>
                Sign Up
              </button>
            </>
          ) : (
            <div style={styles.userProfile}>
              <img src={avatarUrl} alt="avatar" style={styles.avatar} />
              <span style={styles.welcomeText}>Hi, {user}</span>
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
          <p style={styles.description}>Here are the websites I have built:</p>
          <div style={styles.projectsContainer}>
            {projects.map((project) => (
              <div key={project.name} style={styles.projectCard}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <button style={styles.button}>Visit</button>
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
            {loading ? "Please wait..." : view === "login" ? "Login" : "Sign Up"}
          </button>
          <p style={{ marginTop: 12 }}>
            {view === "login" ? (
              <>
                No account yet?{" "}
                <button type="button" style={styles.linkButton} onClick={() => setView("signup")} disabled={loading}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already signed up?{" "}
                <button type="button" style={styles.linkButton} onClick={() => setView("login")} disabled={loading}>
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
        >
          <FacebookIcon />
          Follow me on Facebook
        </a>
      </footer>
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
      fill="currentColor"
    >
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v2h3l-1 3h-2v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 860,
    margin: "0 auto",
    padding: 20,
    fontFamily: "'Segoe UI', sans-serif",
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
  title: { fontSize: 24 },
  nav: { display: "flex", gap: 10 },
  navButton: {
    backgroundColor: "#ff4b45",
    border: "none",
    borderRadius: 6,
    padding: "6px 14px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  userProfile: { display: "flex", alignItems: "center", gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: "50%" },
  welcomeText: { fontSize: 14 },
  dateTime: { textAlign: "center", margin: "16px 0", fontSize: 16 },
  description: { textAlign: "center", fontSize: 16, marginBottom: 16 },
  projectsContainer: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  projectCard: {
    backgroundColor: "#292929",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff4b45",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  form: {
    backgroundColor: "#292929",
    padding: 20,
    borderRadius: 12,
    maxWidth: 360,
    margin: "auto",
    marginTop: 30,
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
    borderRadius: 6,
    border: "1px solid #444",
    backgroundColor: "#1f1f1f",
    color: "#eee",
  },
  linkButton: {
    background: "none",
    color: "#ff4b45",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  message: { color: "#ffb347", fontWeight: "bold", marginBottom: 10 },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 10,
  },
  followButton: {
    color: "#fff",
    border: "1px solid #ff4b45",
    padding: "10px 20px",
    borderRadius: 8,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
};
            
