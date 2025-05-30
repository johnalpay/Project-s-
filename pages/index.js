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

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>My Projects</h1>
      <p style={styles.description}>Here are the websites I have built.</p>
      
      <div style={styles.dateTime}>
        <span>{formattedDate}</span> | <span>{formattedTime}</span>
      </div>

      <div style={styles.projectsContainer}>
        {projects.map((project) => (
          <div key={project.name} style={styles.projectCard}>
            <h2 style={styles.projectName}>{project.name}</h2>
            <p style={styles.projectDesc}>{project.description}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <button style={styles.button}>Visit</button>
            </a>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        <a
          href="https://www.facebook.com/profile.php?id=61576992292379"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.followButton}
          aria-label="Follow on Facebook"
        >
          <FacebookIcon /> Follow me on Facebook
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
      fill="#1877F2"
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "50px auto",
    padding: "0 25px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    color: "#222",
  },
  title: {
    fontSize: 42,
    marginBottom: 12,
    fontWeight: "700",
  },
  description: {
    fontSize: 20,
    marginBottom: 30,
    color: "#555",
  },
  dateTime: {
    fontSize: 14,
    color: "#888",
    marginBottom: 30,
  },
  projectsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 25,
  },
  projectCard: {
    padding: 25,
    borderRadius: 12,
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
    transition: "transform 0.2s ease",
    backgroundColor: "#fff",
  },
  projectName: {
    fontSize: 24,
    marginBottom: 8,
    color: "#0070f3",
  },
  projectDesc: {
    fontSize: 16,
    marginBottom: 15,
    color: "#444",
  },
  button: {
    padding: "10px 22px",
    fontSize: 16,
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    transition: "background-color 0.3s ease",
  },
  footer: {
    marginTop: 50,
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "600",
    textDecoration: "none",
    color: "#1877F2",
    border: "2px solid #1877F2",
    padding: "8px 20px",
    borderRadius: 30,
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};

    
