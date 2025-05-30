export default function Home() {
  const projects = [
    {
      name: "Lyrics",
      url: "https://lyrics-liart.vercel.app/",
      description: "Lyrics Finder Website"
    },
    {
      name: "Profile Guard",
      url: "https://profile-guard.vercel.app/",
      description: "Facebook Profile Guard Tool"
    },
    {
      name: "Token Getter (Cokie Method)",
      url: "https://getnew-xi.vercel.app/",
      description: "Facebook Token Getter gamit ang Cookie Method"
    }
  ];

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>My Projects</h1>
      <p style={styles.description}>Dito makikita ang mga website na ginawa ko.</p>
      <div style={styles.projectsContainer}>
        {projects.map((project) => (
          <div key={project.name} style={styles.projectCard}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <button style={styles.button}>Bisitahin</button>
            </a>
          </div>
        ))}
      </div>
      <footer style={{ marginTop: 40 }}>
        <small>Made with Node.js & Next.js • Deployable sa Vercel</small>
      </footer>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center"
  },
  title: {
    fontSize: 36,
    marginBottom: 10
  },
  description: {
    fontSize: 18,
    marginBottom: 30
  },
  projectsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  projectCard: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 8,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  button: {
    marginTop: 10,
    padding: "8px 16px",
    fontSize: 16,
    cursor: "pointer",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 5
  }
};
