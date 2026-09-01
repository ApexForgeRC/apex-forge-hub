/**
 * 3D Printed Work — shown in the homepage gallery.
 *
 * TO ADD A NEW ITEM: copy one of the objects below and change the values.
 * That's it — no other code needs to change, the gallery renders whatever's in this array.
 *
 *   id          — unique, lowercase-with-dashes (used internally, never shown)
 *   title       — short name shown on the card
 *   category    — small label above the title (e.g. "Display Stand", "Wall Art")
 *   description — one sentence, shown under the title
 *   image       — path to a photo in /public (e.g. '/prints/my-item.jpg'), or null to
 *                 show a placeholder until you have a real photo
 *   link        — where "Shop This" points to (usually your Etsy shop, or a specific listing URL)
 *
 * Photos: drop the image file in the /public/prints/ folder, then set `image` to
 * '/prints/filename.jpg'. Any aspect ratio works — the card crops it to a consistent
 * square automatically, so don't worry about pre-cropping.
 */
export const PRINTS = [
  {
    id: 'diecast-display-stands',
    title: 'Diecast Display Stands',
    category: 'Display Stand',
    description: 'Custom-fit stands for 1/18 and 1/24 diecast models — no more cars sliding off the shelf.',
    image: null,
    link: 'https://apexforgemotorsports.etsy.com',
  },
  {
    id: 'motorsport-wall-art',
    title: 'Motorsport Wall Art',
    category: 'Wall Art',
    description: 'Layered and lithophane-style prints of iconic liveries and race cars, ready to hang.',
    image: null,
    link: 'https://apexforgemotorsports.etsy.com',
  },
  {
    id: 'lightbox-signs',
    title: 'Lightbox Signs',
    category: 'Lightbox',
    description: 'Backlit logo and livery signs for the garage, shop, or man cave.',
    image: null,
    link: 'https://apexforgemotorsports.etsy.com',
  },
];
