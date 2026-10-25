// Deliberate allowlist: never ship historical prices, stock or inferred fitment.
const fs = require('node:fs');
const path = require('node:path');
const text = fs.readFileSync(path.join(__dirname, '../src/data/partsSource.js'), 'utf8');
const source = JSON.parse(text.slice(text.indexOf('[')).replace(/;\s*$/, ''));
const selections = [
  ['Motor', 'Senton 223S V4', 'Electronics', 'motor'],
  ['Differential', 'Senton 223S V4', 'Drivetrain', 'gear'],
  ['Shocks', 'Senton 223S V4', 'Chassis & suspension', 'shock'],
  ['Tires & Wheels', 'Senton 223S V4', 'Bodies & wheels', 'wheel'],
  ['Chassis', 'Granite 223S V4', 'Chassis & suspension', 'chassis'],
  ['Bevel Gears', 'Big Rock V3', 'Drivetrain', 'gear'],
  ['Motor', 'Big Rock V3', 'Electronics', 'motor'],
  ['Tires & Wheels', 'Typhon 223S V4', 'Bodies & wheels', 'wheel'],
  ['Shocks', 'Granite 223S V4', 'Chassis & suspension', 'shock'],
  ['Pinion Gear', 'Senton 223S V4', 'Drivetrain', 'gear'],
  ['Chassis', 'Senton 223S V4', 'Chassis & suspension', 'chassis'],
  ['Tires & Wheels', 'Big Rock V3', 'Bodies & wheels', 'wheel'],
];
const products = selections.map(([category,platform,group,art]) => {
  const p = source.find(p=>p.category===category && p.platform===platform);
  if (!p) throw new Error(`Missing source: ${category} / ${platform}`);
  const {id,part,url} = p;
  return {id,part,category,platform,url,group,art};
});
fs.writeFileSync(path.join(__dirname,'data.js'), '// Selected public reference entries. No inventory, prices, or fitment guarantees.\nconst PRODUCTS = '+JSON.stringify(products,null,2)+';\n');
console.log(`Prepared ${products.length} reference entries.`);
