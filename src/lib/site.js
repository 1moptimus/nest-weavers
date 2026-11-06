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
  { name: 'Instagram', href: 'https://www.instagram.com/nestweaversgroup', icon: 'instagram' },
  { name: 'YouTube', href: 'https://www.youtube.com/@nestweavers3377', icon: 'youtube' },
];

// PLACEHOLDERS: replace with the client's real details before launch.
export const CONTACT = {
  address: '[Placeholder: studio address], Hyderabad',
  phone: '[Placeholder: phone number]',
  email: '[Placeholder: email address]',
  hours: '[Placeholder: opening hours]',
};
