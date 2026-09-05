export const VEHICLE_REGISTRY = [
  {
    id: 'arrma-senton-3s-v3',
    brand: 'ARRMA',
    family: 'Senton',
    name: 'SENTON 3S 4X4 BLX',
    shortName: 'Senton 3S V3',
    sku: 'ARA4303V3',
    generation: 'V3',
    source: 'Horizon Hobby',
    sourceUrl: 'https://www.horizonhobby.com/product/1-10-senton-3s-4x4-rtr-brushless-short-course-truck/ARA4303V3.html',
    explodedViewUrl: 'https://www.horizonhobby.com/interactive-exploded-view?pid=ARA4303V3',
    imageUrl: 'https://www.horizonhobby.com/on/demandware.static/-/Sites-horizon-master/default/dw2fec9645/Images/ARA/ARA4303V3_A7_YGOFKHV0.jpg',
    imageSource: 'Horizon Hobby',
    aliases: ['senton', 'senton 3s', 'senton v3', 'ara4303v3'],
  },
];

export const VEHICLE_OPTIONS = VEHICLE_REGISTRY.map((vehicle) => ({
  value: vehicle.id,
  label: `${vehicle.brand} ${vehicle.shortName} — ${vehicle.sku}`,
}));
