import React from "react";

const styles = {
  container: {
    minHeight: "100vh",
    padding: 20,
    backgroundColor: "#f3f4f6",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
    color: "#1e40af",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#3b82f6",
  },
  projectsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    maxWidth: 700,
    margin: "0 auto",
  },
  projectCard: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 6px 15px rgba(37, 99, 235, 0.5)",
    color: "#e0e7ff",
    transition: "transform 0.3s ease, boxShadow 0.3s ease",
    cursor: "pointer",
    width: "100%",
    height: 140,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 1.3,
    flexGrow: 1,
  },
  followButton: {
    marginTop: 10,
    backgroundColor: "#1e40af",
    color: "#e0e7ff",
    border: "none",
    borderRadius: 5,
    padding: "8px 12px",
    fontWeight: "600",
    cursor: "pointer",
    alignSelf: "flex-start",
    textDecoration: "none",
  },
};

const projects = [
  {
    title: "Facebook Profile Guard",
    description:
      "A simple and stylish web app to enable or disable Facebook Profile Guard easily.",
    link: "https://facebook-profile-guard.example.com",
  },
  {
    title: "Facebook Token Getter",
    description:
      "An app to safely get your Facebook token using Node.js and Puppeteer automation.",
    link: "https://facebook-token-getter.example.com",
  },
  {
    title: "Lyrics Finder",
    description:
      "Find lyrics for any song title using a public API in a neat UI.",
    link: "https://lyrics-finder.example.com",
  },
];

export default function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>My Projects</h1>
        <p style={styles.subtitle}>Check out my latest web apps</p>
      </header>

      <main style={styles.projectsContainer}>
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.projectCard}
          >
            <h2 style={styles.projectTitle}>{project.title}</h2>
            <p style={styles.projectDescription}>{project.description}</p>
            <span style={styles.followButton}>Visit Website</span>
          </a>
        ))}
      </main>
    </div>
  );
              }
