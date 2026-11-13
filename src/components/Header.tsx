import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import mega from '../data/mega.json';
import { CDN, COLLECTION_LINKS, NAV, SITE, TOP_BANNER } from '../data/content';
import { LOGO_PATHS } from '../data/logo';
import { useCart } from '../cart';

interface MegaItem {
  slug: string;
  title: string;
  subtitle: string;
  badge: string | null;
  img: string;
}
interface MegaCat {
  key: string;
  label: string;
  items: MegaItem[];
}
const CATS = mega as MegaCat[];

export function Logo({ color = 'currentColor' }: { color?: string }) {
  return (
    <a className="Logo" href={`${SITE}/`} aria-label="Rhode Skin Homepage">
      <svg width="100" height="26" viewBox="0 0 100 26" fill="none" aria-hidden="true">
        {LOGO_PATHS.map((d, i) => (
          <path key={i} d={d} fill={color} />
        ))}
      </svg>
    </a>
  );
}

export function TopBanner() {
  return (
    <div className="TopBanner">
      <a href={`${SITE}/collections/shop`}>{TOP_BANNER}</a>
    </div>
  );
}

function ProductCard({ item, index }: { item: MegaItem; index: number }) {
  return (
    <a
      className="ProductCard"
      href={`${SITE}/products/${item.slug}`}
      style={{ ['--i' as string]: index }}
      tabIndex={0}
    >
      <div className="ProductCard__image">
        <img src={`${CDN}/${item.img}`} alt={item.title} onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.retry) {
              img.dataset.retry = '1';
              img.src = `${SITE}/cdn/shop/products/${item.img}`;
            } else img.style.visibility = 'hidden';
          }} />
        {item.badge && <span className="ProductCard__badge">{item.badge}</span>}
      </div>
      <p className="ProductCard__title">{item.title}</p>
      <p className="ProductCard__subtitle">{item.subtitle}</p>
    </a>
  );
}

function MegaMenu({ open }: { open: boolean }) {
  const [cat, setCat] = useState(CATS[0].key);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [animKey, setAnimKey] = useState(0);

  useLayoutEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-category="${cat}"]`);
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [cat, open]);

  useEffect(() => {
    if (open) setAnimKey((k) => k + 1);
  }, [open]);

  const current = CATS.find((c) => c.key === cat)!;
  const cta = COLLECTION_LINKS[cat];

  return (
    <div className={`MegaMenu ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label="Shop menu">
      <div className="MegaMenu__inner">
        <div className="MegaMenu__tabs" ref={tabsRef}>
          {CATS.map((c) => (
            <button
              key={c.key}
              type="button"
              data-category={c.key}
              className={`MegaMenu__tab ${c.key === cat ? 'is-current' : ''}`}
              onMouseEnter={() => setCat(c.key)}
              onFocus={() => setCat(c.key)}
              onClick={() => setCat(c.key)}
              tabIndex={open ? 0 : -1}
            >
              {c.label}
            </button>
          ))}
          <span className="MegaMenu__indicator" style={{ left: indicator.left, width: indicator.width }} />
        </div>
        <div className="MegaMenu__products" key={`${cat}-${animKey}`}>
          {current.items.map((item, i) => (
            <ProductCard key={item.slug + i} item={item} index={i} />
          ))}
          <div className="MegaMenu__cta" style={{ ['--i' as string]: current.items.length }}>
            <a className="Button" href={`${SITE}${cta.href}`} tabIndex={open ? 0 : -1}>
              <span className="Button__text">{cta.label}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [cat, setCat] = useState(CATS[0].key);
  const current = CATS.find((c) => c.key === cat)!;
  const cta = COLLECTION_LINKS[cat];
  return (
    <div className={`MobileMenu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="MobileMenu__bar">
        <button type="button" className="IconBtn" aria-label="Close menu" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="MobileMenu__tabs">
        {CATS.map((c) => (
          <button key={c.key} type="button" className={`MobileMenu__tab ${c.key === cat ? 'is-current' : ''}`} onClick={() => setCat(c.key)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="MobileMenu__grid" key={cat}>
        {current.items.map((item, i) => (
          <ProductCard key={item.slug + i} item={item} index={i} />
        ))}
      </div>
      <div className="MobileMenu__cta">
        <a className="Button" href={`${SITE}${cta.href}`}>
          <span className="Button__text">{cta.label}</span>
        </a>
      </div>
      <nav className="MobileMenu__links">
        {NAV.filter((n) => !n.mega).map((n) => (
          <a key={n.label} href={`${SITE}${n.href}`}>
            {n.label}
          </a>
        ))}
        <a href={`${SITE}/account`}>ACCOUNT</a>
      </nav>
    </div>
  );
}

const CartIcon = () => (
  <svg viewBox="0 0 21.3 19.3" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.4,0.2c-0.5-0.1-1.1,0.2-1.2,0.7l-2.9,11.2h-7l-2.5-12H1.1c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.1l2.5,12  h10.2l3.3-12.8C21.3,0.8,20.9,0.3,20.4,0.2z M10.1,17.6c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5  C9.5,16.1,10.1,16.8,10.1,17.6z M16.6,19.1c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5c-0.8,0-1.5,0.7-1.5,1.5S15.8,19.1,16.6,19.1z"
    />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 17.6 18.9" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.2,7.1c0-2.7,2.2-4.9,4.9-4.9c2.7,0,4.9,2.2,4.9,4.9C12,9.8,9.8,12,7.1,12C4.4,12,2.2,9.8,2.2,7.1z M7.1,0.2  c-3.8,0-6.9,3.1-6.9,6.9c0,3.8,3.1,6.9,6.9,6.9c1.2,0,2.3-0.3,3.3-0.9l5.3,5.3c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4L12,11.9  c1.2-1.2,2-2.9,2-4.8C14,3.3,10.9,0.2,7.1,0.2z"
    />
  </svg>
);

export default function Header({ onSearch }: { onSearch: () => void }) {
  const { count, setOpen: openCart } = useCart();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number>();
  const lastY = useRef(0);

  const openMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const closeMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (!megaOpen) setHidden(y > lastY.current && y > 160);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [megaOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setMegaOpen(false), setMobileOpen(false));
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 900 && setMobileOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`Header ${hidden ? 'is-hidden' : ''} ${scrolled || megaOpen ? 'is-solid' : ''} ${megaOpen ? 'is-mega' : ''}`}
        onMouseLeave={closeMega}
      >
        <nav aria-label="Main Navigation" className="Header__nav">
          <div className="Header__left">
            <button type="button" className="IconBtn Header__burger" aria-label="Toggle mobile navigation" onClick={() => setMobileOpen(true)}>
              <svg width="25" height="18" viewBox="0 0 22 14" aria-hidden="true">
                <rect y="6" width="22" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="22" height="2" rx="1" fill="currentColor" />
                <rect width="22" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
            {NAV.map((n) => (
              <a
                key={n.label}
                href={`${SITE}${n.href}`}
                className={`Header__link ${n.mega && megaOpen ? 'is-active' : ''}`}
                onMouseEnter={n.mega ? openMega : () => (window.clearTimeout(closeTimer.current), setMegaOpen(false))}
                onFocus={n.mega ? openMega : undefined}
              >
                {n.label}
              </a>
            ))}
          </div>
          <Logo />
          <div className="Header__right">
            <button type="button" className="Header__link Header__link--btn" onMouseEnter={() => setMegaOpen(false)} onClick={onSearch}>
              <span className="u-showMd">SEARCH</span>
              <span className="Header__icon u-hideMd">
                <SearchIcon />
              </span>
            </button>
            <a className="Header__link u-showMd" href={`${SITE}/account`} onMouseEnter={() => setMegaOpen(false)}>
              ACCOUNT
            </a>
            <button type="button" className="Header__link Header__link--btn" onMouseEnter={() => setMegaOpen(false)} onClick={() => openCart(true)}>
              <span className="u-showMd">CART ({count})</span>
              <span className="Header__icon Header__cart u-hideMd">
                <CartIcon />
                <span className="Header__cartCount">{count}</span>
              </span>
            </button>
          </div>
        </nav>
        <div onMouseEnter={openMega}>
          <MegaMenu open={megaOpen} />
        </div>
      </header>
      <div className={`MegaBackdrop ${megaOpen ? 'is-open' : ''}`} onMouseEnter={closeMega} onClick={() => setMegaOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
