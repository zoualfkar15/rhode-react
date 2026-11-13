import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export interface CartLine {
  id: string;
  title: string;
  variant: string;
  price: number;
  img: string;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, 'qty'>) => void;
  setQty: (id: string, qty: number) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines,
      count,
      subtotal,
      open,
      setOpen,
      add: (line) => {
        setLines((prev) => {
          const found = prev.find((l) => l.id === line.id);
          if (found) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + 1 } : l));
          return [...prev, { ...line, qty: 1 }];
        });
        setOpen(true);
      },
      setQty: (id, qty) =>
        setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)))),
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart outside CartProvider');
  return c;
}
