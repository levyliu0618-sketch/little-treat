// Local preview: no key is required to exercise the explicit demo fallback.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const handler=require('./api/chat.js');const root=__dirname;
http.createServer(async(req,res)=>{
 if(req.url.split('?')[0]==='/api/chat'){
  let body='';for await(const chunk of req){body+=chunk;if(body.length>45000){res.writeHead(413);return res.end('Request too large')}}
  req.body=body;res.status=n=>{res.statusCode=n;return res};res.json=data=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data))};return handler(req,res);
 }
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
 const file=path.join(root,pathname==='/'?'index.html':pathname);
 if(!file.startsWith(root+path.sep)||/(^|\/)\.|\/(lib|tests|api)\//.test(pathname)){res.writeHead(403);return res.end()}
 try{const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'})[ext]||'application/octet-stream');res.end(await fs.promises.readFile(file))}catch{res.writeHead(404);res.end('Not found')}
}).listen(8000,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8000'));
