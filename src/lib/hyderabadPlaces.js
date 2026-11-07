// Decorative places drawn on the Hyderabad map (not client-editable; projects come from the content collection).
// Coordinates checked against OpenStreetMap/Nominatim. dx/dy nudge a label in em units to avoid overlaps.

/**
 * Main areas: letter-spaced text labels. size "lg" is used for the big anchors of the city.
 * @type {{ name: string, lat: number, lng: number, size?: 'lg', dx?: number, dy?: number }[]}
 */
export const areas = [
  {
    name: 'Secunderabad',
    lat: 17.4337,
    lng: 78.5007,
    size: 'lg',
    dx: 2.5,
    dy: -1.2,
  },
  { name: 'Old City', lat: 17.3685, lng: 78.486, size: 'lg' },
  { name: 'Hitech City', lat: 17.4435, lng: 78.3772, dy: 2.2 },
  { name: 'Gachibowli', lat: 17.4436, lng: 78.352, dx: -3.4, dy: 1.8 },
  { name: 'Madhapur', lat: 17.4409, lng: 78.3916, dx: 4.5 },
  { name: 'Kondapur', lat: 17.4588, lng: 78.3731 },
  { name: 'Miyapur', lat: 17.4982, lng: 78.3568 },
  { name: 'Kukatpally', lat: 17.4931, lng: 78.4054 },
  { name: 'Jubilee Hills', lat: 17.4308, lng: 78.4103, dy: 0.6 },
  { name: 'Banjara Hills', lat: 17.4177, lng: 78.4399, dx: 2.2, dy: 0.4 },
  { name: 'Begumpet', lat: 17.4462, lng: 78.463, dy: -0.8 },
  { name: 'Mehdipatnam', lat: 17.3943, lng: 78.4343 },
  { name: 'Manikonda', lat: 17.4, lng: 78.3862 },
  { name: 'Financial District', lat: 17.42, lng: 78.3287 },
  { name: 'Uppal', lat: 17.4025, lng: 78.5613 },
  { name: 'LB Nagar', lat: 17.3502, lng: 78.5511 },
  { name: 'Kompally', lat: 17.5355, lng: 78.5097 },
  // West side, around the Villa 14 project. Coordinates from OpenStreetMap place nodes.
  { name: 'Patancheru', lat: 17.5286, lng: 78.2674, dx: 3.2, dy: 0.4 },
  { name: 'Ramachandrapuram', lat: 17.5119, lng: 78.2759 },
  { name: 'Pocharam', lat: 17.5452, lng: 78.2429 },
  { name: 'Isnapur', lat: 17.5441, lng: 78.1979 },
  { name: 'Kollur', lat: 17.4445, lng: 78.2516, dx: -2.2 },
  { name: 'Osman Nagar', lat: 17.4418, lng: 78.2782, dx: 2.8 },
];

/**
 * Landmarks: small icon plus a label placed right, left, above or below.
 * @type {{ name: string, lat: number, lng: number, icon: 'charminar' | 'palace' | 'fort' | 'buddha' | 'temple' | 'bridge' | 'park' | 'lake' | 'industry' | 'school' | 'hospital' | 'restaurant', place: 'right' | 'left' | 'above' | 'below' }[]}
 */
export const landmarks = [
  {
    name: 'Charminar',
    lat: 17.3616,
    lng: 78.4746,
    icon: 'charminar',
    place: 'left',
  },
  {
    name: 'Falaknuma Palace',
    lat: 17.3318,
    lng: 78.4658,
    icon: 'palace',
    place: 'right',
  },
  {
    name: 'Golconda Fort',
    lat: 17.3834,
    lng: 78.4011,
    icon: 'fort',
    place: 'left',
  },
  {
    name: 'Hussain Sagar',
    lat: 17.4239,
    lng: 78.4738,
    icon: 'buddha',
    place: 'right',
  },
  {
    name: 'Birla Mandir',
    lat: 17.4057,
    lng: 78.4693,
    icon: 'temple',
    place: 'right',
  },
  { name: 'KBR Park', lat: 17.4202, lng: 78.4205, icon: 'park', place: 'left' },
  {
    name: 'BHEL Township',
    lat: 17.4911,
    lng: 78.3056,
    icon: 'industry',
    place: 'below',
  },
  {
    name: 'Patancheru Lake',
    lat: 17.5238,
    lng: 78.2633,
    icon: 'lake',
    place: 'left',
  },
  // A sprinkle of everyday places around Villa 14 (OpenStreetMap).
  {
    name: 'The Gaudium School',
    lat: 17.4846,
    lng: 78.2426,
    icon: 'school',
    place: 'right',
  },
  {
    name: 'DPS Kollur',
    lat: 17.4485,
    lng: 78.2419,
    icon: 'school',
    place: 'right',
  },
  {
    name: 'Area Hospital',
    lat: 17.5303,
    lng: 78.2664,
    icon: 'hospital',
    place: 'right',
  },
  {
    name: 'ESI Hospital',
    lat: 17.5064,
    lng: 78.2839,
    icon: 'hospital',
    place: 'right',
  },
  {
    name: 'Silver Bawarchi',
    lat: 17.5401,
    lng: 78.2321,
    icon: 'restaurant',
    place: 'right',
  },
  {
    name: 'Ameenpur Lake',
    lat: 17.5236,
    lng: 78.3334,
    icon: 'lake',
    place: 'above',
  },
];
