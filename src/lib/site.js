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
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/nestweavers_interiors/',
    icon: 'instagram',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@nestweavers3377',
    icon: 'youtube',
  },
];

// Office address, hours and email are the client's.
export const CONTACT = {
  address: 'Nest Weavers office, F6HQ+FW Velmala, Telangana',
  // Pin position of the office on the home page map.
  coordinates: { lat: 17.47866713291561, lng: 78.23987305087319 },
  // Opens Google Maps on the exact office coordinates above (the short maps.app.goo.gl link did not resolve).
  // Used by the map pin, Contact page and footer.
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=17.47866713291561,78.23987305087319',
  // From the client's pitch deck.
  phones: ['+91-8919487650', '+91-9398676968'],
  email: 'nestweaversgroup@gmail.com',
  hours: 'Open 10:00 am to 7:00 pm',
};
