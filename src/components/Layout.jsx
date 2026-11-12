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
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={closeMenu}>
            <span className="logo-plate">
              <img src="/sesar-logo.png" alt="Sesar Technologies" />
            </span>
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
        <div className="footer-panel">
          <div className="footer-brand">
            <span className="logo-plate">
              <img
                className="footer-logo"
                src="/sesar-logo.png"
                alt="Sesar Technologies"
              />
            </span>
            <p className="tagline">{site.tagline}</p>
            <p className="footer-line">{site.footerLine}</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <p className="footer-kicker">Explore</p>
            <ul className="footer-links">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-contact">
            <p className="footer-kicker">Contact</p>
            <a className="footer-chip" href={`tel:${site.phoneTel}`}>
              <span>Call</span>
              {site.phoneDisplay}
            </a>
            <a className="footer-chip" href={`mailto:${site.email}`}>
              <span>Email</span>
              {site.email}
            </a>
          </div>
        </div>
        <div className="footer-bar">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Sales, service, and rental</p>
        </div>
      </footer>
    </div>
  );
}
