/* Cookie consent + Google Analytics (loads only after Accept) */
(function(){
  var GA_ID='G-HVCZEH6WE8'; // Google Analytics 4 Measurement ID, e.g. G-XXXXXXXXXX
  var KEY='gh_cookie_consent';
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function loadGA(){
    if(!GA_ID||window.__ghGA)return;window.__ghGA=1;
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};
    gtag('js',new Date());gtag('config',GA_ID,{anonymize_ip:true});
  }
  var c=get();
  if(c==='accepted'){loadGA();return}
  if(c==='declined')return;
  function show(){
    var b=document.createElement('div');b.className='cookie-banner';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookie consent');
    b.innerHTML='<p>We use cookies to understand how visitors find and use our site. See our <a href="/privacy">Privacy Policy</a>.</p><div class="cookie-actions"><button type="button" class="cookie-decline">Decline</button><button type="button" class="cookie-accept">Accept</button></div>';
    document.body.appendChild(b);
    requestAnimationFrame(function(){b.classList.add('show')});
    function close(v){set(v);b.classList.remove('show');setTimeout(function(){b.remove()},400);if(v==='accepted')loadGA();}
    b.querySelector('.cookie-accept').onclick=function(){close('accepted')};
    b.querySelector('.cookie-decline').onclick=function(){close('declined')};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',show);else show();
})();
