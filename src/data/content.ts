export const SITE = 'https://www.rhodeskin.com';
export const CDN = `${SITE}/cdn/shop/files`;

export const NAV = [
  { label: 'SHOP', href: '/collections/shop', mega: true },
  { label: 'ABOUT', href: '/pages/about-us' },
  { label: 'FUTURES', href: '/pages/philanthropy' },
];

export const TOP_BANNER = 'free US shipping on orders over $45';

export const COLLECTION_LINKS: Record<string, { label: string; href: string }> = {
  Featured: { label: 'Shop rhode', href: '/collections/featured' },
  Skin: { label: 'Shop Skin', href: '/collections/skincare' },
  'Lip+Cheek': { label: 'Shop Lip + Cheek', href: '/collections/lip-cheek' },
  Sets: { label: 'Shop Sets', href: '/collections/sets' },
  'On The Go': { label: 'Shop On The Go', href: '/collections/on-the-go' },
  'Award Winners': { label: 'Shop Award Winners', href: '/collections/award-winners' },
};

export const PILLARS = [
  { title: 'care for women', text: 'Give women access to a wide variety of health services for full autonomy over their bodies to make empowered choices.' },
  { title: 'support for moms', text: 'Invest in resources for moms, mother-like figures, and caregivers that alleviate financial stress as they raise and support their families.' },
  { title: 'women in business', text: 'Provide access to capital and coaching for women-owned and non-binary-owned businesses.' },
  { title: 'emergency response', text: 'Support organizations on the frontlines in times of crisis or urgent need, especially when women are disproportionately impacted.' },
];

export const PILLAR_BG = `${CDN}/futures_BG_65417dee-fe90-4474-b6e3-53e886fbe641.png`;

export const WORK = [
  {
    side: 'right',
    img: `${CDN}/rff-women-health-1.jpg`,
    text: 'A new partnership between rhode futures fund and Foundation for Women’s Health designed to advance women’s health research and innovation. Over the next 3 years, our $5 million grant will fuel medical research and support new initiatives that promote women’s health research, education, and care.',
    href: '/pages/foundation-for-womens-health',
  },
  {
    side: 'left',
    img: `${CDN}/rff-mom-fund-1.jpg`,
    text: 'Between 2025 and 2026, our Support for Moms Fund invested in impactful organizations that deliver guaranteed income and resources to new mothers, mother-like figures, and caregivers across the U.S. A $2 million contribution supported a national network of 10 organizations providing much-needed support to moms and, in turn, strengthening families and empowering communities.',
    href: '/pages/support-for-moms-fund',
  },
  {
    side: 'right',
    img: `${CDN}/rff-la-wildfire-1.jpg`,
    text: 'In response to the devastating wildfires in 2025 in our hometown of Los Angeles, we committed $1 million to support local organizations providing emergency cash payments to relieve mothers, caregivers, and families displaced or deeply affected. Throughout January and February, we built on this commitment with an additional 1% of all online and LA pop-up sales going directly to these efforts.',
    href: '/pages/la-wildfire-relief',
  },
];

export const FOOTER_COLUMNS = [
  {
    title: 'NAVIGATE',
    links: [
      ['Shop', '/collections/shop'],
      ['Our Story', '/pages/about-us'],
      ['Rhode Futures', '/pages/philanthropy'],
      ['Impact', '/pages/sustainability'],
      ['VLOG', '/blogs/vlog'],
      ['Where to Find Us', '/pages/store-locator'],
    ],
  },
  {
    title: 'SOCIAL',
    links: [
      ['Instagram', 'https://instagram.com/rhode'],
      ['Youtube', 'https://www.youtube.com/c/HaileyRhodeBieber'],
      ['TikTok', 'https://www.tiktok.com/@rhode'],
      ['Pinterest', 'https://www.pinterest.com/rhode/'],
    ],
  },
  {
    title: 'OFFICIAL',
    links: [
      ['Privacy', '/pages/privacy-policy'],
      ['Terms', '/pages/terms-of-service'],
      ['Accessibility Statement', '/pages/accessibility-statement'],
      ['FAQ', '/pages/faq'],
      ['Contact', '/pages/contact-us'],
      ['Events', '/pages/events'],
    ],
  },
] as const;

export const COUNTRIES = [
  'Australia (AUD $)', 'Austria (EUR €)', 'Belgium (EUR €)', 'Bulgaria (EUR €)', 'Canada (CAD $)', 'Croatia (EUR €)',
  'Czechia (CZK Kč)', 'Denmark (DKK kr.)', 'Finland (EUR €)', 'France (EUR €)', 'Germany (EUR €)', 'Greece (EUR €)',
  'Ireland (EUR €)', 'Italy (EUR €)', 'Mexico (MXN $)', 'Netherlands (EUR €)', 'New Zealand (NZD $)', 'Poland (PLN zł)',
  'Portugal (EUR €)', 'Romania (RON Lei)', 'Spain (EUR €)', 'Sweden (SEK kr)', 'Switzerland (CHF CHF)',
  'United Kingdom (GBP £)', 'United States (USD $)',
];

export const SEARCH_SUGGESTIONS = [
  ['Pocket Pearl', '/products/pocket-pearl-monet'],
  ['Peptide Lip Tint', '/products/peptide-lip-tint-salty-tan-unscented'],
  ['Highlight Milk', '/products/highlight-milk-03'],
  ['Pocket Bronze', '/products/pocket-bronze-sunbed'],
  ['Glazing Mist', '/products/glazing-mist'],
  ['Spotwear', '/products/spotwear-daisy'],
  ['Peptide Lip Boost', '/products/the-peptide-lip-boost-set'],
  ['Glazing Milk', '/products/glazing-milk'],
  ['Snap-on Lip Case', '/products/snap-on-lip-case'],
] as const;

export const SEARCH_CATALOG: { title: string; slug: string; img: string }[] = [
  ['glazing milk', 'glazing-milk', 'glazing-milk-sq.png'],
  ['the rhode kit', 'full-rhode-kit', 'rhodekitmainimage_1.png'],
  ['pocket blush sleepy girl', 'pocket-blush-sleepy-girl', 'mainimage-SQ-sleepygirl.png'],
  ['peptide lip tint scented salty tan', 'peptide-lip-tint-salty-tan', 'mainimage-saltytan-SQ.png'],
  ['the on-the-go set', 'the-on-the-go-set', 'on-the-go-set-r-icon-main-png-2000x2000.png'],
  ['spotwear strawberry', 'spotwear-strawberry', 'spotwear-strawberry-main-png-2000x2000.png'],
  ['spot case', 'spot-case', 'spot-case-main-png-2000x2000.png'],
  ['peptide lip shape bend', 'peptide-lip-shape-bend', 'BEND-pls-main-png-sq.png'],
  ['pocket pearl monaco', 'pocket-pearl-monaco', 'monaco-main.png'],
  ['highlight milk 03', 'highlight-milk-03', 'highlight-milk-3-main.png'],
  ['pocket brush', 'pocket-brush', 'brush-main.png'],
  ['the soft glam set', 'the-soft-glam-set', 'soft-glam-set-main.png'],
  ['pocket bronze sunbed', 'pocket-bronze-sunbed', 'sunbed-main.png'],
  ['the sun-kissed set', 'the-sun-kissed-set', 'sun-kissed-set-main.png'],
  ['the travel set', 'the-travel-set', 'travel-set-mist-main.png'],
  ['snap-on lip case', 'snap-on-lip-case', 'snap-on-grey-main.png'],
  ['peptide lip treatment rhode vanilla', 'peptide-lip-treatment-rhode-vanilla', 'vanilla-plt-main.png'],
  ['peptide lip boost unscented', 'peptide-lip-boost-unscented', 'main-png-plb-unscented.png'],
  ['caffeine reset', 'caffeine-reset', 'main-png-caffeine-reset.png'],
  ['peptide eye prep r icon', 'peptide-eye-prep-r-icon', 'eyeprep-r-icon-main-png-2000x2000.png'],
  ['pineapple refresh', 'pineapple-refresh-cleanser', 'cleanser-main-png-2000x2000-revision.png'],
  ['lip case', 'lip-case', 'lip-case-bronze-main-png-2000x2000.png'],
].map(([title, slug, img]) => ({ title, slug, img: `${CDN}/${img}` }));

export const UPSELL = {
  title: 'GLAZING MILK',
  slug: 'glazing-milk',
  img: `${CDN}/glazing-milk-sq.png`,
  description:
    'The essential prep step for your skincare routine. Glazing Milk is a potent, nutrient-rich complex with a milky texture that leaves skin feeling hydrated and glowy while boosting the skin barrier over time.',
  sizes: ['big (4.2 oz)', 'little (1.7 oz)'],
  price: 32,
};

export const FREE_SHIPPING_THRESHOLD = 45;
