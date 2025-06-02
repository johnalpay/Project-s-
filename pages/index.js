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
  const [view, setView] = useState("home"); // "home", "login", "signup"
  const [user, setUser] = useState(null);

  // For form fields
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Login handler
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

  // Placeholder avatar URL (you can replace this with actual user avatars)
  const avatarUrl = "https://i.pravatar.cc/40?u=" + user;

  return (
    <main style={styles.container}>
      {/* Sticky Header */}
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
                draggable={false}
              />
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
              <div
                key={project.name}
                style={styles.projectCard}
                className="project-card"
              >
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
          aria-label="Follow on Facebook"
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: 8 }}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="#fff"
      aria-hidden="true"
    >
      <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.333v21.333C0 23.404.596 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.41c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.098 2.797.142v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.596 1.325-1.334V1.333C24 .596 23.404 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 860,
    margin: "0 auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#eee",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",

    // Angasin style: black background with realistic red gradients on sides
    backgroundColor: "#000",

    backgroundImage: `
      linear-gradient(to right, 
        #8B0000 0%, 
        transparent 50%, 
        transparent 50%, 
        #8B0000 100%)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "60px 100%",
    backgroundPosition: "left center, right center",
  },

  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#111",
    zIndex: 999,
    padding: 12,
    borderRadius: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(255, 0, 0, 0.5)",
  },

  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#ff4444",
    userSelect: "none",
  },

  nav: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },

  navButton: {
    backgroundColor: "#8B0000",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
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
    border: "2px solid #8B0000",
    objectFit: "cover",
  },

  welcomeText: {
    color: "#ff4444",
    fontWeight: "600",
    userSelect: "none",
  },

  dateTime: {
    marginTop: 8,
    fontWeight: "600",
    color: "#ff4444",
    textAlign: "center",
    fontSize: 14,
    userSelect: "none",
  },

  description: {
    marginTop: 12,
    fontWeight: "600",
    fontSize: 17,
    color: "#ccc",
    textAlign: "center",
  },

  projectsContainer: {
    marginTop: 20,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },

  projectCard: {
    backgroundColor: "#1a0000",
    padding: 18,
    borderRadius: 8,
    boxShadow: "0 6px 16px rgba(139,0,0,0.4)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  projectName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ff4444",
    marginBottom: 6,
    userSelect: "none",
  },

  projectDesc: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 12,
    minHeight: 38,
  },

  button: {
    backgroundColor: "#a52a2a",
    border: "none",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 5,
    fontWeight: "600",
    cursor: "pointer",
    userSelect: "none",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
  },

  form: {
    marginTop: 30,
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#220000",
    padding: 24,
    borderRadius: 8,
    boxShadow: "0 8px 24px rgba(178, 34, 34, 0.7)",
    display: "flex",
    flexDirection: "column",
  },

  input: {
    marginBottom: 16,
    padding: 12,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #8B0000",
    backgroundColor: "#330000",
    color: "#fff",
    outlineColor: "#ff4444",
  },

  message: {
    color: "#ff6666",
    marginBottom: 12,
    fontWeight: "600",
    userSelect: "none",
  },

  spinner: {
    display: "inline-block",
    width: 16,
    height: 16,
    border: "3px solid #fff",
    borderTop: "3px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  linkButton: {
    background: "none",
    border: "none",
    color: "#ff4444",
    cursor: "pointer",
    fontWeight: "600",
    padding: 0,
  },

  footer: {
    marginTop: "auto",
    padding: 18,
    textAlign: "center",
  },

  followButton: {
    backgroundColor: "#8B0000",
    color: "#fff",
    padding: "10px 22px",
    borderRadius: 8,
    fontWeight: "700",
    fontSize: 16,
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    border: "2px solid #5c0000",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};
    
