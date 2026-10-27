// Mobile nav toggle
const toggle=document.querySelector('.nav-toggle'),links=document.getElementById('nav-links');
toggle.addEventListener('click',()=>{const o=links.classList.toggle('open');toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'Close menu':'Open menu');});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();
// Package buttons: flash the package color, then open the Book Your Date page with that package selected
document.querySelectorAll('[data-package]').forEach(b=>b.addEventListener('click',e=>{
  e.preventDefault();
  const pk=(b.dataset.package||'').toLowerCase();
  const go=()=>{location.href='/book?package='+encodeURIComponent(b.dataset.package);};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){go();return;}
  b.classList.remove('click-flash-bronze','click-flash-silver','click-flash-gold');void b.offsetWidth;
  b.classList.add('click-flash-'+pk);
  setTimeout(go,pk==='gold'?650:450);
}));
// Hero date check -> Book Your Date page with the date and event type filled in
document.getElementById('date-check').addEventListener('submit',e=>{e.preventDefault();
  const q=new URLSearchParams();const d=document.getElementById('dc-date').value;if(d)q.set('date',d);q.set('type',document.getElementById('dc-type').value);
  location.href='/book?'+q.toString();});
// Scroll reveal (skipped when reduced motion is preferred)
const items=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('js-reveal');
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{rootMargin:'0px 0px -8% 0px'});
  items.forEach(i=>io.observe(i));
}
// Lightbox
const WEBP=document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')===0;
const lb=document.getElementById('lightbox'),lbImg=lb.querySelector('img'),lbCap=lb.querySelector('.lb-cap'),gl=[...document.querySelectorAll('.gallery a')];let cur=0,last;
function show(i){cur=(i+gl.length)%gl.length;const im=gl[cur].querySelector('img');lbImg.src=(WEBP&&gl[cur].dataset.full)||gl[cur].href;lbImg.alt=im.alt;lbCap.textContent=im.alt+' ('+(cur+1)+'/'+gl.length+')';}
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

// Pause the looping logo animation while it is off-screen
(function(){const l=document.querySelector('.anim-logo');if(!l||!('IntersectionObserver' in window))return;new IntersectionObserver(e=>l.classList.toggle('is-off',!e[0].isIntersecting)).observe(l);})();
