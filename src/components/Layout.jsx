import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { site } from "../data/site";

export default function Layout() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="accent-bar" />
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={closeMenu}>
            <img src="/sesar-logo.png" alt="Sesar Technologies" />
          </NavLink>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <nav id="site-nav" className={open ? "site-nav open" : "site-nav"}>
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <img
              className="footer-logo"
              src="/sesar-logo.png"
              alt="Sesar Technologies"
            />
            <p className="tagline">{site.tagline}</p>
            <p className="footer-line">{site.footerLine}</p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul className="footer-links">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{site.stayConnected}</h2>
            <p>
              <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="photo-credits">
          Photos from Pexels:{" "}
          {site.photoCredits.map((credit, index) => (
            <a key={credit.href} href={credit.href} target="_blank" rel="noreferrer">{index > 0 ? `, ${credit.name}` : credit.name}</a>
          ))}
          .
        </p>
      </footer>
    </div>
  );
}
