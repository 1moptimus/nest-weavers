// Site-wide constants: navigation, social links and contact placeholders.
// Routes mirror the existing nestweavers.com URLs (see AGENTS.md: preserve URLs or add redirects).

export const SITE = {
  name: 'Nest Weavers Interiors',
  tagline: "Let's Bring Life to your Spaces.",
};

/** @type {{ label: string, href: string }[]} */
export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact-us' },
];

/** @type {{ name: string, href: string, icon: 'instagram' | 'youtube' }[]} */
export const SOCIAL = [
  { name: 'Instagram', href: 'https://www.instagram.com/nestweavers_interiors/', icon: 'instagram' },
  { name: 'YouTube', href: 'https://www.youtube.com/@nestweavers3377', icon: 'youtube' },
];

// Address, email and hours are PLACEHOLDERS: replace with the client's real details before launch.
export const CONTACT = {
  address: '[Placeholder: studio address], Hyderabad',
  // From the client's pitch deck.
  phones: ['+91-8919487650', '+91-9398676968'],
  email: '[Placeholder: email address]',
  hours: '[Placeholder: opening hours]',
};
