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
              <button style={styles.navButton} onClick={() => { setView("login"); setMessage(""); }}>
                Login
              </button>
              <button style={styles.navButton} onClick={() => { setView("signup"); setMessage(""); }}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span style={{ marginRight: 15, fontWeight: "600" }}>Welcome, {user}!</span>
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

      {user && view === "home" && (
        <>
          <p style={styles.description}>Here are the websites I have built.</p>
          <div style={styles.projectsContainer}>
            {projects.map((project) => (
              <div key={project.name} style={styles.projectCard} className="project-card">
                <h2 style={styles.projectName}>{project.name}</h2>
                <p style={styles.projectDesc}>{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <button style={styles.button} className="visit-button">Visit</button>
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {!user && view === "home" && (
        <p style={{ color: "#fff", marginTop: 40 }}>Please login or sign up to view the projects.</p>
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
                <button type="button" style={styles.linkButton} onClick={() => { setView("signup"); setMessage(""); }}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" style={styles.linkButton} onClick={() => { setView("login"); setMessage(""); }}>
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
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "50px auto",
    padding: "0 25px 60px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    backgroundColor: "#b22222",
    minHeight: "100vh",
    color: "#fff",
    boxSizing: "border-box",
    borderRadius: 12,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 44,
    margin: 0,
    fontWeight: "700",
    textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
  },
  navButton: {
    marginLeft: 12,
    backgroundColor: "#ff6f61",
    border: "none",
    borderRadius: 10,
    padding: "8px 16px",
    color: "#4b0000",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: 15,
    boxShadow: "0 2px 10px rgba(255,111,97,0.6)",
    transition: "background-color 0.3s ease",
  },
  dateTime: {
    fontSize: 15,
    color: "#ffb3b3",
    marginBottom: 35,
    fontWeight: "600",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  },
  description: {
    fontSize: 20,
    marginBottom: 35,
    color: "#ffdede",
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  },
  projectsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 28,
  },
  projectCard: {
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 4px 18px rgba(0,0,0,0.3), 0 1px 6px rgba(0,0,0,0.2)",
    backgroundColor: "#fff0f0",
    color: "#4b0000",
    transition: "all 0.3s ease",
  },
  projectName: {
    fontSize: 24,
    fontWeight: "700",
  },
  projectDesc: {
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#E94560",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  form: {
    backgroundColor: "#fff0f0",
    color: "#4b0000",
    padding: 30,
    borderRadius: 16,
    maxWidth: 400,
    margin: "40px auto",
    textAlign: "left",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  message: {
    color: "#b22222",
    fontWeight: "600",
  },
  linkButton: {
    background: "none",
    color: "#b22222",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "underline",
  },
  footer: {
    marginTop: 40,
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#fff0f0",
    color: "#b22222",
    fontWeight: "700",
    padding: "10px 18px",
    borderRadius: 12,
    textDecoration: "none",
    border: "2px solid #b22222",
    transition: "all 0.3s ease",
  },
};
    
