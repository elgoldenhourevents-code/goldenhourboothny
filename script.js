// Mobile nav toggle
const toggle=document.querySelector('.nav-toggle'),links=document.getElementById('nav-links');
toggle.addEventListener('click',()=>{const o=links.classList.toggle('open');toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'Close menu':'Open menu');});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();
const form=document.getElementById('booking-form'),status=form.querySelector('.form-status');
// Package buttons pre-select package
document.querySelectorAll('[data-package]').forEach(b=>b.addEventListener('click',e=>{form.package.value=b.dataset.package;
  e.preventDefault();
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pkg=(b.dataset.package||'gold').toLowerCase();
  const flash=()=>{const cls='flash-glow-'+pkg;form.classList.remove('flash-glow','flash-glow-bronze','flash-glow-silver','flash-glow-gold');void form.offsetWidth;form.classList.add(cls);setTimeout(()=>form.classList.remove(cls),pkg==='gold'?1700:1900);};
  if(reduce){document.getElementById('book').scrollIntoView({behavior:'auto'});flash();return;}
  const pk=(b.dataset.package||'').toLowerCase();
  b.classList.remove('click-flash-bronze','click-flash-silver','click-flash-gold');void b.offsetWidth;
  b.classList.add('click-flash-'+pk);
  setTimeout(()=>b.classList.remove('click-flash-'+pk),pk==='gold'?900:600);
  const panel=document.querySelector('#book > .container');
  panel.classList.add('rise-prep');
  const release=()=>{panel.classList.add('rise-go');panel.classList.remove('rise-prep');setTimeout(()=>panel.classList.remove('rise-go'),900);};
  const rio=new IntersectionObserver((en)=>{if(en[0].isIntersecting){rio.disconnect();clearTimeout(rt);release();}},{threshold:[.2]});
  const rt=setTimeout(()=>{rio.disconnect();release();},2600);
  rio.observe(panel);
  setTimeout(()=>document.getElementById('book').scrollIntoView({behavior:'smooth'}),pk==='gold'?380:260);
  const io=new IntersectionObserver((en)=>{if(en[0].isIntersecting&&en[0].intersectionRatio>=.6){io.disconnect();clearTimeout(t);setTimeout(flash,250);}},{threshold:[.6]});
  const t=setTimeout(()=>{io.disconnect();flash();},2500);
  io.observe(form);}));
// Hero date check -> prefill booking form
document.getElementById('date-check').addEventListener('submit',e=>{e.preventDefault();
  form.event_date.value=document.getElementById('dc-date').value;form.event_type.value=document.getElementById('dc-type').value;
  document.getElementById('book').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  setTimeout(()=>form.name.focus({preventScroll:true}),500);});
// Form: Formspree (AJAX); mailto fallback if not configured or it fails
const FALLBACK_EMAIL='info@goldenhourboothny.com'; // business email
function mailto(){const d=new FormData(form);const body=[...d.entries()].map(([k,v])=>k+': '+v).join('\n');location.href='mailto:'+FALLBACK_EMAIL+'?subject='+encodeURIComponent('Photo Booth Booking Inquiry')+'&body='+encodeURIComponent(body);}
form.addEventListener('submit',async e=>{e.preventDefault();
  if(form.action.includes('YOUR_FORM_ID')){status.textContent='Opening your email app…';mailto();return;}
  status.textContent='Sending…';
  try{const r=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    if(r.ok){form.reset();status.textContent='Thanks! We’ll be in touch soon.';}else throw 0;}
  catch{status.textContent='Something went wrong — opening your email app instead.';mailto();}
});
// Scroll reveal (skipped when reduced motion is preferred)
const items=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('js-reveal');
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{rootMargin:'0px 0px -8% 0px'});
  items.forEach(i=>io.observe(i));
}
// Lightbox
const lb=document.getElementById('lightbox'),lbImg=lb.querySelector('img'),lbCap=lb.querySelector('.lb-cap'),gl=[...document.querySelectorAll('.gallery a')];let cur=0,last;
function show(i){cur=(i+gl.length)%gl.length;const im=gl[cur].querySelector('img');lbImg.src=gl[cur].href;lbImg.alt=im.alt;lbCap.textContent=im.alt+' ('+(cur+1)+'/'+gl.length+')';}
function open(i){last=document.activeElement;show(i);lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lb-close').focus();}
function close(){lb.hidden=true;document.body.style.overflow='';last&&last.focus();}
gl.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault();open(i);}));
lb.querySelector('.lb-close').onclick=close;lb.querySelector('.lb-prev').onclick=()=>show(cur-1);lb.querySelector('.lb-next').onclick=()=>show(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)close();});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});

// Extra animation: floating sparkles, staggered reveals, scroll progress bar
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var hero=document.querySelector('.hero');
  if(hero){
    var box=document.createElement('div');box.className='sparkles';box.setAttribute('aria-hidden','true');
    var cols=['#e8a33d','#ffd98a','#ff7a6b','#ffffff'];
    for(var n=0;n<22;n++){
      var p=document.createElement('i');
      if(n%3===0)p.className='star';
      p.style.cssText='left:'+(Math.random()*100)+'%;--s:'+(5+Math.random()*9)+'px;--c:'+cols[n%cols.length]+';--d:'+(9+Math.random()*9)+'s;--dl:-'+(Math.random()*16)+'s;--x:'+((Math.random()*120)-60)+'px';
      box.appendChild(p);
    }
    hero.insertBefore(box,hero.firstChild);
  }
  document.querySelectorAll('.events,.addons,.steps,.grid-3,.gallery').forEach(function(g){
    Array.prototype.forEach.call(g.children,function(c,i){c.style.setProperty('--i',i%6);c.addEventListener('transitionend',function(e){if(e.propertyName==='opacity')c.style.setProperty('--i',0)})});
  });
  var bar=document.createElement('div');bar.id='progress';document.body.appendChild(bar);
  addEventListener('scroll',function(){
    var h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  },{passive:true});
})();
