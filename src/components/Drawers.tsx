import { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../cart';
import { FREE_SHIPPING_THRESHOLD, SEARCH_CATALOG, SEARCH_SUGGESTIONS, SITE, UPSELL } from '../data/content';

const money = (n: number) => `$${n.toFixed(2)}`;

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, add } = useCart();
  const [size, setSize] = useState(UPSELL.sizes[0]);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div className={`Overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`Drawer Drawer--right ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label="Cart">
        <div className="Drawer__head">
          <span>CART</span>
          <button className="IconBtn" aria-label="Close cart" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <div className="Drawer__body">
          <div className="Shipping">
            <p>{remaining > 0 ? `${money(remaining)} more for FREE shipping` : 'You’ve unlocked FREE shipping'}</p>
            <div className="Shipping__bar">
              <span style={{ width: `${pct}%` }} />
            </div>
          </div>

          {lines.length === 0 ? (
            <p className="Cart__empty">Your cart is currently empty</p>
          ) : (
            <ul className="Cart__lines">
              {lines.map((l) => (
                <li key={l.id}>
                  <img src={l.img} alt={l.title} />
                  <div>
                    <p className="Cart__title">{l.title}</p>
                    <p className="Cart__variant">{l.variant}</p>
                    <div className="Qty">
                      <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">
                        −
                      </button>
                      <span>{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">
                        +
                      </button>
                    </div>
                  </div>
                  <span className="Cart__price">{money(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="Upsell">
            <p className="Upsell__heading">Complete your rhode ROUTINE</p>
            <div className="Upsell__card">
              <img src={UPSELL.img} alt={UPSELL.title} />
              <div>
                <p className="Upsell__title">{UPSELL.title}</p>
                <p className="Upsell__text">{UPSELL.description}</p>
                <select value={size} onChange={(e) => setSize(e.target.value)} aria-label="Size">
                  {UPSELL.sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <button
                  className="Button Button--small"
                  onClick={() => add({ id: `${UPSELL.slug}-${size}`, title: UPSELL.title, variant: size, price: UPSELL.price, img: UPSELL.img })}
                >
                  <span className="Button__text">Add - {money(UPSELL.price)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Drawer__foot">
          <div className="Subtotal">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <p className="Drawer__note">*shipping, taxes, and discounts calculated at checkout.</p>
          <a className={`Button Button--block ${lines.length ? '' : 'is-disabled'}`} href={`${SITE}/cart`}>
            <span className="Button__text">Checkout</span>
          </a>
        </div>
      </aside>
    </>
  );
}

export function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 250);
    else setQ('');
  }, [open]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? SEARCH_CATALOG.filter((p) => p.title.includes(t)) : [];
  }, [q]);

  return (
    <>
      <div className={`Overlay ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`Drawer Drawer--search ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label="Search">
        <div className="Drawer__head">
          <span>SEARCH</span>
          <button className="IconBtn" aria-label="Close search" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="Drawer__body">
          <input
            ref={input}
            className="Search__input"
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
          />
          {q.trim() === '' ? (
            <>
              <p className="Search__label">suggestions:</p>
              <ul className="Search__suggestions">
                {SEARCH_SUGGESTIONS.map(([t, h]) => (
                  <li key={t}>
                    <a href={`${SITE}${h}`}>{t}</a>
                  </li>
                ))}
              </ul>
              <p className="Search__label">
                <a href={`${SITE}/pages/contact`}>Contact Us</a> · <a href={`${SITE}/pages/faq`}>FAQ</a>
              </p>
            </>
          ) : results.length ? (
            <ul className="Search__results">
              {results.map((r) => (
                <li key={r.slug}>
                  <a href={`${SITE}/products/${r.slug}`}>
                    <img src={r.img} alt="" />
                    <span>{r.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="Search__label">No results for “{q}”</p>
          )}
        </div>
      </aside>
    </>
  );
}
