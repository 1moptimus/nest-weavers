// Decorative places drawn on the Hyderabad map (not client-editable; projects come from the content collection).
// Coordinates checked against OpenStreetMap/Nominatim. dx/dy nudge a label in em units to avoid overlaps.

/**
 * Main areas: letter-spaced text labels. size "lg" is used for the big anchors of the city.
 * @type {{ name: string, lat: number, lng: number, size?: 'lg', dx?: number, dy?: number }[]}
 */
export const areas = [
  { name: 'Secunderabad', lat: 17.4337, lng: 78.5007, size: 'lg', dx: 2.5, dy: -1.2 },
  { name: 'Old City', lat: 17.3685, lng: 78.4860, size: 'lg' },
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
];

/**
 * Landmarks: small icon plus a label placed right, left, above or below.
 * @type {{ name: string, lat: number, lng: number, icon: 'charminar' | 'palace' | 'fort' | 'buddha' | 'temple' | 'bridge' | 'park', place: 'right' | 'left' | 'above' | 'below' }[]}
 */
export const landmarks = [
  { name: 'Charminar', lat: 17.3616, lng: 78.4746, icon: 'charminar', place: 'left' },
  { name: 'Falaknuma Palace', lat: 17.3318, lng: 78.4658, icon: 'palace', place: 'right' },
  { name: 'Golconda Fort', lat: 17.3834, lng: 78.4011, icon: 'fort', place: 'left' },
  { name: 'Hussain Sagar', lat: 17.4239, lng: 78.4738, icon: 'buddha', place: 'right' },
  { name: 'Birla Mandir', lat: 17.4057, lng: 78.4693, icon: 'temple', place: 'right' },
  { name: 'KBR Park', lat: 17.4202, lng: 78.4205, icon: 'park', place: 'left' },
];
