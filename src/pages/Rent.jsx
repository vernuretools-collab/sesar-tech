import { useEffect, useId, useMemo, useRef, useState } from "react";
import { site } from "../data/site";
import { catalog, categories, durations, PRICE_MAX, PRICE_MIN } from "../data/catalog";

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, count) {
  const next = new Date(date);
  next.setDate(next.getDate() + count);
  return next;
}

function inclusiveDays(start, end) {
  const from = new Date(`${start}T00:00:00`);
  const to = new Date(`${end}T00:00:00`);
  const diff = Math.round((to - from) / 86400000);
  if (Number.isNaN(diff)) return null;
  return diff + 1;
}

function quoteFor(product, start, end) {
  const days = inclusiveDays(start, end);
  if (!start || !end || days === null) {
    return { error: "Choose a start date and an end date." };
  }
  if (days < 1) {
    return { error: "The end date needs to be on or after the start date." };
  }

  let plan = "Daily";
  let rate = product.daily;
  let rental = product.daily * days;
  let detail = `${money(product.daily)} / day × ${days} days`;

  if (days >= 90) {
    plan = "Long-term";
    rate = product.longTerm / 30;
    rental = Math.round(rate * days);
    detail = `${money(product.longTerm)} / month ÷ 30 × ${days} days`;
  } else if (days >= 30) {
    plan = "Monthly";
    rate = product.monthly / 30;
    rental = Math.round(rate * days);
    detail = `${money(product.monthly)} / month ÷ 30 × ${days} days`;
  }

  return {
    days,
    plan,
    rental,
    deposit: product.deposit,
    due: rental + product.deposit,
    detail,
  };
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function Rent() {
  const searchId = useId();
  const titleId = useId();
  const today = isoDate(new Date());
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState([]);
  const [duration, setDuration] = useState("");
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [active, setActive] = useState(null);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(isoDate(addDays(new Date(), 6)));

  useEffect(() => {
    document.title = "Rent | Sesar Technologies";
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    function onKey(event) {
      if (event.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return catalog.filter((item) => {
      const haystack = [item.title, item.brand, item.category, ...item.specs]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesCategory = category.length === 0 || category.includes(item.category);
      const belowMax = maxPrice >= PRICE_MAX || item.daily <= maxPrice;
      return matchesQuery && matchesCategory && belowMax;
    });
  }, [query, category, maxPrice]);

  const quote = active ? quoteFor(active, start, end) : null;
  const maxPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  function openQuote(product) {
    setActive(product);
    setStart(today);
    setEnd(isoDate(addDays(new Date(), duration === "Long-term" ? 89 : duration === "Monthly" ? 29 : 6)));
  }

  function requestMail() {
    if (!active || !quote || quote.error) return;
    const subject = encodeURIComponent(`Rent ${active.title}`);
    const body = encodeURIComponent(
      [
        `Machine: ${active.title}`,
        `Start: ${start}`,
        `End: ${end}`,
        `Days: ${quote.days}`,
        `Plan: ${quote.plan}`,
        `Rental: ${money(quote.rental)}`,
        `Refundable security deposit: ${money(quote.deposit)}`,
        `Due to start: ${money(quote.due)}`,
      ].join("\n"),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <article className="rent-page">
      <header className="rent-intro page-hero">
        <p className="eyebrow hero-kicker">Rent</p>
        <h1>
          {"Computers for as long as you need them".split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              style={{ animationDelay: `${0.12 + index * 0.06}s` }}
            >
              {word}
            </span>
          ))}
        </h1>
        <p className="hero-lead">
          Filter the sample catalogue, then price a window with the rental calculator. Rates are examples until a quote is confirmed.
        </p>
      </header>

      <div className="rent-toolbar">
        <label className="rent-search" htmlFor={searchId}>
          <span className="rent-sr">Search the catalogue</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l5 5" />
          </svg>
          <input
            id={searchId}
            type="search"
            value={query}
            placeholder="Search Laptops, MacBooks, Workstations..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <FilterMenu
          label="Category"
          options={categories}
          selected={category}
          onToggle={(value) => setCategory((current) => toggleValue(current, value))}
        />
        <FilterMenu
          label="Duration"
          options={durations}
          selected={duration ? [duration] : []}
          onToggle={(value) => setDuration((current) => (current === value ? "" : value))}
        />

        <div className="rent-price">
          <span>Price Range</span>
          <div className="rent-sliders" style={{ "--fill": maxPercent / 100 }}>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              value={maxPrice}
              aria-label="Maximum daily price"
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </div>
          <div className="rent-scale">
            <span>
              {money(PRICE_MIN)} – {money(maxPrice)}
            </span>
            <span>{money(PRICE_MAX)}+</span>
          </div>
        </div>
      </div>

      <p className="rent-count" aria-live="polite">
        {results.length} {results.length === 1 ? "machine" : "machines"}
      </p>

      {results.length === 0 ? (
        <p className="rent-empty">No machines match those filters. Clear a menu or raise the price range.</p>
      ) : (
        <div className="catalog-grid">
          {results.map((item) => (
            <article key={item.id} className="catalog-card">
              <div className="catalog-photo">
                <img src={item.image} alt={item.imageAlt} />
                {item.inStock ? <span className="stock-pill">In Stock</span> : <span className="stock-pill reserved">Reserved</span>}
              </div>
              <div className="catalog-body">
                <p className="catalog-brand">{item.brand}</p>
                <h2>{item.title}</h2>
                <ul className="spec-tags">
                  {item.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <div className="catalog-footer">
                  <div className="catalog-prices">
                    <strong className={duration === "Daily" ? "is-quiet" : undefined}>
                      {money(duration === "Long-term" ? item.longTerm : item.monthly)} / month
                    </strong>
                    <span className={duration === "Daily" ? "is-lead" : undefined}>
                      {money(item.daily)} / day
                    </span>
                  </div>
                  <button
                    type="button"
                    className="rent-now"
                    disabled={!item.inStock}
                    onClick={() => openQuote(item)}
                  >
                    {item.inStock ? "Rent Now" : "Unavailable"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {active ? (
        <div className="quote-layer" role="presentation" onClick={() => setActive(null)}>
          <aside
            className="quote-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="quote-head">
              <div>
                <p className="eyebrow">Rental calculator</p>
                <h2 id={titleId}>{active.title}</h2>
              </div>
              <button type="button" className="quote-close" onClick={() => setActive(null)}>
                Close
              </button>
            </div>
            <div className="quote-dates">
              <label>
                Start
                <input type="date" value={start} min={today} onChange={(event) => setStart(event.target.value)} />
              </label>
              <label>
                End
                <input type="date" value={end} min={start || today} onChange={(event) => setEnd(event.target.value)} />
              </label>
            </div>
            {quote?.error ? (
              <p className="quote-error">{quote.error}</p>
            ) : (
              <dl className="quote-lines">
                <div>
                  <dt>Inclusive days</dt>
                  <dd>{quote.days}</dd>
                </div>
                <div>
                  <dt>Plan applied</dt>
                  <dd>{quote.plan}</dd>
                </div>
                <div>
                  <dt>Rental</dt>
                  <dd>
                    {money(quote.rental)}
                    <small>{quote.detail}</small>
                  </dd>
                </div>
                <div>
                  <dt>Security deposit</dt>
                  <dd>
                    {money(quote.deposit)}
                    <small>Refundable when the machine comes back undamaged. This is not a rental fee.</small>
                  </dd>
                </div>
                <div className="quote-total">
                  <dt>Due to start</dt>
                  <dd>{money(quote.due)}</dd>
                </div>
              </dl>
            )}
            <button type="button" className="rent-now quote-send" disabled={Boolean(quote?.error)} onClick={requestMail}>
              Email this quote
            </button>
          </aside>
        </div>
      ) : null}
    </article>
  );
}

function FilterMenu({ label, options, selected, onToggle }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const summary = selected.length > 0 ? selected.join("  ") : options.join("  ");

  useEffect(() => {
    if (!open) return undefined;
    function onPointer(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={open ? "rent-menu open" : "rent-menu"} ref={rootRef}>
      <span className="rent-menu-label">{label}</span>
      <button
        type="button"
        className="rent-menu-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{summary}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open ? (
        <div className="rent-menu-panel" role="group" aria-label={label}>
          {options.map((option) => {
            const pressed = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={pressed}
                onClick={() => onToggle(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
