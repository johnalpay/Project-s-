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
          <div key={project.name} style={styles.projectCard} className="project-card">
            <h2 style={styles.projectName}>{project.name}</h2>
            <p style={styles.projectDesc}>{project.description}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <button style={styles.button} className="visit-button">Visit</button>
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
          className="follow-button"
        >
          <FacebookIcon /> Follow me on Facebook
        </a>
      </footer>

      {/* Inline CSS for hover animations */}
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

        main {
          transition: background-color 0.3s ease;
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
    backgroundColor: "#b22222", // firebrick red
    minHeight: "100vh",
    color: "#fff",
    boxSizing: "border-box",
    borderRadius: 12,
  },
  title: {
    fontSize: 44,
    marginBottom: 14,
    fontWeight: "700",
    textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
  },
  description: {
    fontSize: 20,
    marginBottom: 35,
    color: "#ffdede",
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  },
  dateTime: {
    fontSize: 15,
    color: "#ffb3b3",
    marginBottom: 35,
    fontWeight: "600",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  },
  projectsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 28,
  },
  projectCard: {
    padding: 24,
    borderRadius: 16,
    boxShadow:
      "0 4px 18px rgba(0,0,0,0.3), 0 1px 6px rgba(0,0,0,0.25)",
    backgroundColor: "#8b0000", // dark red
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  },
  projectName: {
    fontSize: 26,
    marginBottom: 8,
    color: "#ff6f61", // pastel red-ish
    textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
  },
  projectDesc: {
    fontSize: 17,
    marginBottom: 18,
    color: "#ffb3b3",
  },
  button: {
    padding: "10px 26px",
    fontSize: 16,
    fontWeight: "700",
    cursor: "pointer",
    backgroundColor: "#ff6f61",
    border: "none",
    borderRadius: 10,
    color: "#4b0000",
    boxShadow: "0 2px 10px rgba(255,111,97,0.6)",
    transition: "background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
  },
  footer: {
    marginTop: 50,
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 19,
    fontWeight: "700",
    textDecoration: "none",
    color: "#E94560",
    border: "2px solid #E94560",
    padding: "10px 24px",
    borderRadius: 35,
    transition: "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
  },
};
  
