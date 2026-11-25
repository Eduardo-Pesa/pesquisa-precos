const C="ficha-precos-F1.4";const F=["./","./index.html","./manifest.json","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("ficha-precos-")&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(c=>{const f=fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(x=>x.put(e.request,cp))}return r}).catch(()=>c||caches.match("./index.html"));return c||f}))});
