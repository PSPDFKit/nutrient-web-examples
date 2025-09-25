<script lang="ts">
import { Link, Route, Router } from "svelte-routing";
import BasicViewerPage from "./pages/BasicViewerPage.svelte";

const examples = [
  {
    id: "basic-viewer",
    title: "Basic Viewer",
    description: "Simple PDF viewing with standard controls",
    component: BasicViewerPage,
  },
];
</script>

<main>
  <Router>
    <Route path="/">
      <div class="home">
        <header class="header">
          <h1>Nutrient Web SDK</h1>
          <p>Svelte TypeScript Examples</p>
        </header>

        <div class="examples-grid">
          {#each examples as example}
            <Link to="/{example.id}" class="example-card">
              <h3>{example.title}</h3>
              <p>{example.description}</p>
            </Link>
          {/each}
        </div>

        <footer class="footer">
          <p>
            Learn more about
            <a 
              href="https://www.nutrient.io/sdk/web/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Nutrient Web SDK
            </a>
          </p>
        </footer>
      </div>
    </Route>

    <Route path="/basic-viewer">
      <BasicViewerPage />
    </Route>
  </Router>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .home {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header h1 {
    color: #4A8FED;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .header p {
    color: #666;
    font-size: 1.2rem;
    margin: 0;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  :global(.example-card) {
    display: block;
    padding: 1.5rem;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
  }

  :global(.example-card:hover) {
    border-color: #4A8FED;
    box-shadow: 0 4px 12px rgba(74, 143, 237, 0.1);
    transform: translateY(-2px);
  }

  :global(.example-card h3) {
    margin: 0 0 0.5rem 0;
    color: #4A8FED;
    font-size: 1.25rem;
  }

  :global(.example-card p) {
    margin: 0;
    color: #666;
    line-height: 1.5;
  }

  .footer {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #e1e5e9;
  }

  .footer p {
    color: #666;
    margin: 0;
  }

  .footer a {
    color: #4A8FED;
    text-decoration: none;
  }

  .footer a:hover {
    text-decoration: underline;
  }
</style>