import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CDN, COUNTRIES, FOOTER_COLUMNS, PILLARS, PILLAR_BG, SITE, WORK } from '../data/content';
import { Logo } from './Header';

/** Fades children in when they scroll into view. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`Reveal ${seen ? 'is-seen' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section className="Hero">
      <img className="Hero__img" src={`${CDN}/rff-header-hb.jpg`} alt="" />
      <div className="Hero__content">
        <h1 className="Display">rhode futures fund</h1>
        <p>
          From day one, rhode has supported organizations that empower women and dismantle the barriers that hold them back. We focus on
          initiatives that create positive impact for women of all backgrounds, especially those from marginalized communities, by providing
          essential resources to help them chart their own paths forward. As part of e.l.f. Beauty, we’re making an impact collectively and giving
          2% of net profits to meaningful causes.
        </p>
      </div>
    </section>
  );
}

export function Pillars() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return (
    <section className="Pillars">
      <h2 className="Display Display--md">our pillars over the years</h2>
      <div className="Pillars__track" ref={track}>
        {PILLARS.map((p) => (
          <article key={p.title} className="Pillar">
            <div className="Pillar__bg" style={{ backgroundImage: `url(${PILLAR_BG})` }} />
            <div className="Pillar__content">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="Pillars__nav">
        <button className="IconBtn" aria-label="Previous" onClick={() => scroll(-1)}>
          ←
        </button>
        <button className="IconBtn" aria-label="Next" onClick={() => scroll(1)}>
          →
        </button>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <>
      <section className="WorkTitle">
        <h2 className="Display Display--md">our recent work</h2>
      </section>
      {WORK.map((w) => (
        <section key={w.href} className={`Split Split--${w.side}`}>
          <Reveal className="Split__media">
            <img src={w.img} alt="" loading="lazy" />
          </Reveal>
          <Reveal className="Split__copy">
            <p>{w.text}</p>
            <a className="Button" href={`${SITE}${w.href}`}>
              <span className="Button__text">LEARN MORE</span>
            </a>
          </Reveal>
        </section>
      ))}
      <section className="Split Split--left Split--about">
        <Reveal className="Split__media">
          <img src={`${CDN}/rff-footer.jpg`} alt="" loading="lazy" />
        </Reveal>
        <Reveal className="Split__copy">
          <h2 className="Display Display--md">about RFF</h2>
          <p>
            rhode futures fund is designed to provide women with the resources they need to direct the future of their lives. Over the years, our
            initiatives have naturally evolved to reflect causes meaningful to rhode and Hailey—from uplifting female entrepreneurs to supporting
            mothers and caregivers to advancing women’s health research.
          </p>
          <p>
            We’re immensely grateful for everything we’ve been able to accomplish so far and thank each and every one of our partner organizations
            for their unwavering commitment to women &lt;3
          </p>
        </Reveal>
      </section>
      <section className="Disclaimer">
        <p>
          rhode futures foundation is a sponsored program of the Social Impact Fund, a 501(c)(3) charitable organization. Now we've become rhode
          futures fund as part of <a href="https://www.elfbeauty.com/impact">e.l.f. Beauty</a>. We’re making a positive impact collectively and
          donating 2% of net profits to meaningful causes, including initiatives that empower women.
        </p>
      </section>
    </>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <footer className="Footer">
      <div className="Footer__news">
        <h2>Join us on the rhode to an effortless glow.</h2>
        <p>Glaze your inbox with tips, tricks &amp; exclusive content from Hailey.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
        >
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          <button className="Button" type="submit">
            <span className="Button__text">{done ? 'THANK YOU' : 'SUBSCRIBE'}</span>
          </button>
        </form>
        <small>
          By signing up, you agree to our <a href={`${SITE}/pages/privacy-policy`}>Privacy Policy*</a>.
        </small>
      </div>

      <div className="Footer__cols">
        <Logo />
        {FOOTER_COLUMNS.map((c) => (
          <div key={c.title}>
            <h4>{c.title}</h4>
            <ul>
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href.startsWith('http') ? href : `${SITE}${href}`}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4>SUPPORT</h4>
          <p>We’re here M-F 9am - 5pm PST.</p>
          <p>
            <a href={`${SITE}/pages/contact-us`}>Drop us a note anytime.</a>
          </p>
        </div>
      </div>

      <div className="Footer__bottom">
        <span>© rhode 2026</span>
        <a href={`${SITE}/pages/do-not-sell-my-personal-information`}>Do Not Sell or Share My Personal Information</a>
        <a href="#cookies">Cookie Preferences</a>
        <label className="Country">
          <span className="sr-only">Country/region</span>
          <select defaultValue="United States (USD $)">
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <div className="Cookie" role="dialog" aria-label="Cookie Consent Banner" id="cookies">
      <p>
        This website utilizes technologies such as cookies to enable essential site functionality, as well as for analytics, personalization,
        and targeted advertising. You may change your settings at any time or accept the default settings. You may close this banner to continue
        with only essential cookies. <a href={`${SITE}/pages/cookie-policy`}>Cookie Policy</a> ·{' '}
        <a href={`${SITE}/pages/privacy-policy`}>Privacy Policy</a>
      </p>
      <div className="Cookie__btns">
        <button onClick={() => setShown(false)}>Reject Non-Essential</button>
        <button className="is-primary" onClick={() => setShown(false)}>
          Accept All
        </button>
      </div>
    </div>
  );
}
