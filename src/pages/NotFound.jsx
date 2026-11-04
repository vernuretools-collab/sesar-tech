import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found | Sesar Technologies";
  }, []);

  return (
    <article className="page">
      <header className="page-header">
        <h1>Page not found</h1>
        <p className="lead">That address is not part of this site.</p>
        <Link className="button" to="/">
          Back to home
        </Link>
      </header>
    </article>
  );
}
