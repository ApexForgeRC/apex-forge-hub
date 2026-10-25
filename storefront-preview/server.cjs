const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
// Serve only the preview's browser assets, never the surrounding repository.
const assets = new Map([['/','index.html'],['/index.html','index.html'],['/style.css','style.css'],['/app.js','app.js'],['/data.js','data.js']]);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const host = process.env.PREVIEW_HOST || '127.0.0.1';
const port = Number(process.env.PREVIEW_PORT || 4178);
http.createServer((req,res)=>{
  const asset=assets.get(new URL(req.url,'http://localhost').pathname);
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
  if(!asset){res.writeHead(404);return res.end('Not found');}
  res.writeHead(200,{'Content-Type':mime[path.extname(asset)],'X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store'});
  if(req.method==='HEAD')return res.end();
  fs.createReadStream(path.join(__dirname,asset)).pipe(res);
}).listen(port,host,()=>console.log(`ApexForge RC preview: http://${host}:${port}`));
