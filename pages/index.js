import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#fff">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H8.9v-2.89h1.54V9.82c0-1.52.9-2.36 2.27-2.36.66 0 1.35.12 1.35.12v1.49h-.76c-.75 0-.98.46-.98.93v1.11h1.66l-.27 2.89h-1.39v6.99C18.34 21.13 22 17 22 12z" />
  </svg>
);

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const projects = [
    {
      name: "Lyrics Finder",
      description: "Search lyrics by song title or artist",
      link: "https://lyrics-finder-nine.vercel.app/",
    },
    {
      name: "Profile Guard",
      description: "Enable/Disable Facebook Profile Guard",
      link: "https://fb-profile-guard.vercel.app/",
    },
    {
      name: "Token Getter",
      description: "Get Facebook Token by Cookie",
      link: "https://fb-token-getter.vercel.app/",
    },
    {
      name: "AppState Checker",
      description: "Check if Facebook AppState is valid",
      link: "https://appstate-checker.vercel.app/",
    },
    {
      name: "AppState Getter",
      description: "Generate Facebook AppState from credentials",
      link: "https://appstate-getter.vercel.app/",
    },
    {
      name: "Weather App",
      description: "Get real-time weather updates",
      link: "https://weather-checker-eta.vercel.app/",
    },
    {
      name: "ShareBoost",
      description: "Auto Facebook Share tool",
      link: "https://share-boost.vercel.app/",
    },
  ];

  return (
    <>
      <Head>
        <title>Sxe Ci Portfolio</title>
      </Head>
      <main style={styles.container}>
        <header style={styles.stickyHeader}>
          <div style={styles.title}>Sxe Ci Portfolio</div>
          {user && (
            <div style={styles.nav}>
              <button style={styles.navButton} onClick={logout}>
                Logout
              </button>
              <div style={styles.userProfile}>
                <img src={user.avatar} alt="avatar" style={styles.avatar} />
                <span style={styles.welcomeText}>Welcome, {user.username}</span>
              </div>
            </div>
          )}
        </header>

        {!user ? (
          <div style={styles.form}>
            <h2>Welcome!</h2>
            <p>Please login or signup to view the portfolio.</p>
            <Link href="/login"><button style={styles.button}>Login</button></Link>
            <p>or</p>
            <Link href="/signup"><button style={styles.button}>Sign Up</button></Link>
          </div>
        ) : (
          <>
            <div style={styles.dateTime}>
              {time.toLocaleString()}
            </div>
            <p style={styles.description}>Explore my collection of web-based tools and projects!</p>
            <div style={styles.projectsContainer}>
              {projects.map((project, idx) => (
                <div key={idx} style={styles.projectCard}>
                  <h3 style={styles.projectName}>{project.name}</h3>
                  <p style={styles.projectDesc}>{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <button style={styles.button}>Visit</button>
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        <footer style={styles.footer}>
          <a
            href="https://www.facebook.com/profile.php?id=61576992292379"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.followButton}
          >
            <FacebookIcon /> <span style={{ marginLeft: 8 }}>Follow Me</span>
          </a>
        </footer>
      </main>

      <style jsx>{`
        button:hover {
          opacity: 0.9;
          transform: scale(1.03);
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
    </>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
    maxWidth: 860,
    margin: "0 auto",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 100,
    padding: "12px 0",
    borderBottom: "2px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  navButton: {
    padding: "6px 12px",
    fontSize: 14,
    border: "1px solid #ccc",
    borderRadius: 6,
    cursor: "pointer",
    background: "#f44336",
    color: "#fff",
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
    fontWeight: 500,
  },
  dateTime: {
    marginBottom: 12,
    fontSize: 14,
    color: "#555",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  projectsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 16,
  },
  projectCard: {
    border: "1px solid #ddd",
    padding: 16,
    borderRadius: 12,
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  projectDesc: {
    fontSize: 14,
    marginBottom: 12,
    color: "#444",
  },
  button: {
    padding: "8px 16px",
    fontSize: 14,
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#f44336",
    color: "#fff",
    transition: "all 0.3s ease",
  },
  form: {
    maxWidth: 360,
    margin: "0 auto",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 14,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  linkButton: {
    color: "#f44336",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 14,
  },
  message: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  spinner: {
    width: 16,
    height: 16,
    border: "2px solid #fff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    display: "inline-block",
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: "1px solid #eee",
    textAlign: "center",
  },
  followButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "#fff",
    textDecoration: "none",
    borderRadius: 6,
    fontWeight: "bold",
    border: "1px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
};
            
