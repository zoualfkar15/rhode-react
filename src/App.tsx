import { useState } from 'react';
import { CartProvider } from './cart';
import Header, { TopBanner } from './components/Header';
import { CartDrawer, SearchDrawer } from './components/Drawers';
import { CookieBanner, Footer, Hero, Pillars, Work } from './components/Sections';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <CartProvider>
      <TopBanner />
      <Header onSearch={() => setSearchOpen(true)} />
      <main>
        <Hero />
        <Pillars />
        <Work />
      </main>
      <Footer />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
      <CookieBanner />
    </CartProvider>
  );
}
