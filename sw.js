self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",e=>{
 const r=e.request;
 if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r).catch(()=>caches.match(r)));
});
self.addEventListener("push",e=>{
 let d={};
 try{d=e.data.json()}catch(x){d={body:e.data?e.data.text():""}}
 e.waitUntil(self.registration.showNotification(d.title||"AFRIKA PULSE",{
  body:d.body||"Tu as un nouveau message.",tag:"ap-msg",renotify:true
 }));
});
self.addEventListener("notificationclick",e=>{
 e.notification.close();
 e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{
  for(const c of l){if("focus" in c)return c.focus()}
  return clients.openWindow("./#messages");
 }));
});
