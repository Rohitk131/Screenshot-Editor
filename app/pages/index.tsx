import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <h1>Screenshot Editor</h1>
        <nav>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </nav>
      </header>
      <main>
        <section>
          <h2>Welcome to the Screenshot Editor</h2>
          <p>Capture, edit, and share your screenshots easily.</p>
        </section>
        <section>
          <h2>Features</h2>
          <ul>
            <li>Upload Images</li>
            <li>Capture Screenshots</li>
            <li>Edit and Annotate</li>
            <li>Download Edited Images</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Screenshot Editor</p>
      </footer>
    </div>
  );
}