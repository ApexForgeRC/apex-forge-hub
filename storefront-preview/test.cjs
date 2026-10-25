const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,file),'utf8');
function harness(hash='#/') {
  const nodes=new Map();
  const node=key=>{if(!nodes.has(key))nodes.set(key,{innerHTML:'',textContent:'',value:'',attrs:{},events:{},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},addEventListener(k,f){this.events[k]=f;},focus(){},classList:{remove(){},contains(){return false;},toggle(){return true;}}});return nodes.get(key);};
  const ctx=vm.createContext({URLSearchParams,location:{hash},history:{replaceState(a,b,url){ctx.location.hash=url;}},document:{querySelector:node,querySelectorAll(){return [];},addEventListener(){}},window:{scrollTo(){},addEventListener(){}},console});
  vm.runInContext(read('data.js')+'\n'+read('app.js'),ctx);
  return {ctx,node,run:code=>vm.runInContext(code,ctx)};
}
test('catalog omits transaction and inventory data',()=>{
  const {run}=harness();
  assert.equal(run('PRODUCTS.length'),12);
  assert.equal(run('new Set(PRODUCTS.map(p=>p.id)).size'),12);
  assert.equal(run('PRODUCTS.some(p=>["price","stock","cost","sellPrice","fits"].some(k=>k in p))'),false);
  assert.equal(run('PRODUCTS.every(p=>new RegExp("^https://").test(p.url))'),true);
});
test('search combines category and platform; empty results recover',()=>{
  const {run,node}=harness('#/catalog');
  run('state.query="senton"; state.category="Electronics"; updateProducts()');
  assert.equal(run('filteredProducts().length'),1);
  assert.match(node('#products').innerHTML,/Motor, 3100KV/);
  run('state.query="no-such-part";updateProducts()');
  assert.match(node('#products').innerHTML,/No parts match/);
  node('#reset').events.click();
  assert.equal(run('filteredProducts().length'),12);
});
test('query URL restores filters and sort',()=>{
  const {run,node}=harness('#/catalog?category=Drivetrain&q=gear&sort=za');
  assert.equal(run('state.category'),'Drivetrain');
  assert.match(node('#main').innerHTML,/value="gear"/);
  assert.equal(run('state.query'),'gear');
  assert.equal(run('state.sort'),'za');
  assert.equal(run('filteredProducts().every(p=>p.group==="Drivetrain")'),true);
});
test('all product and build detail URLs render and invalid URLs recover',()=>{
  const {run,node}=harness();
  const ids=run('PRODUCTS.map(p=>p.id)');
  for(const id of ids){
    run(`product(${JSON.stringify(id)})`);
    assert.match(node('#main').innerHTML,/Price and availability are not confirmed/);
    assert.doesNotMatch(node('#main').innerHTML,/Page not found/);
  }
  run('build("senton-reforged")');assert.match(node('#main').innerHTML,/Senton Reforged/);
  run('build("halfraction")');assert.match(node('#main').innerHTML,/1\/2Faction 3S/);
  run('product("missing")');assert.match(node('#main').innerHTML,/Page not found/);
  run('location.hash="#/unknown";route()');assert.match(node('#main').innerHTML,/Page not found/);
});
test('user search is escaped and unknown categories fall back',()=>{
  const {node,run}=harness('#/catalog?q=%3Cimg%20src=x%20onerror=alert(1)%3E&category=invalid');
  assert.equal(run('state.category'),'All parts');
  assert.ok(!node('#main').innerHTML.includes('<img src=x'));
  assert.ok(node('#main').innerHTML.includes('&lt;img'));
});
test('preview does not call payment, storage or network APIs',()=>{
  assert.doesNotMatch(read('app.js'),/\b(fetch|XMLHttpRequest|localStorage|sessionStorage)\s*[.(]/);
  assert.match(read('index.html'),/name="robots" content="noindex,nofollow"/);
  const config=JSON.parse(fs.readFileSync(path.join(__dirname,'../vercel.json'),'utf8'));
  assert.equal(config.git.deploymentEnabled['codex/storefront-preview'],false);
});
test('sort direction works and does not reorder the source catalog',()=>{
  const {run}=harness('#/catalog');
  const original=run('JSON.stringify(PRODUCTS.map(p=>p.id))');
  const ascending=run('state.sort="az";JSON.stringify(filteredProducts().map(p=>p.part))');
  const descending=run('state.sort="za";JSON.stringify(filteredProducts().map(p=>p.part))');
  assert.deepEqual(JSON.parse(ascending).reverse(),JSON.parse(descending));
  assert.equal(run('JSON.stringify(PRODUCTS.map(p=>p.id))'),original);
});
