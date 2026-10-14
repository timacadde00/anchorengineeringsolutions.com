document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu-toggle');
  const mobile = document.getElementById('mobile-navigation');
  function closeMenu() { if (!menu||!mobile) return; menu.setAttribute('aria-expanded','false'); mobile.hidden=true; menu.setAttribute('aria-label','Open navigation'); }
  menu?.addEventListener('click', () => { const opening = menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(opening)); mobile.hidden=!opening; menu.setAttribute('aria-label',opening?'Close navigation':'Open navigation'); });
  mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  function setLang(lang){
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-en]').forEach(el=>{
      if (el.tagName==='TITLE') { document.title=el.getAttribute('data-'+lang)||el.getAttribute('data-en'); return; }
      if (el.tagName==='META') { el.setAttribute('content',el.getAttribute('data-'+lang)||el.getAttribute('data-en')); return; }
      el.textContent=el.getAttribute('data-'+lang)||el.getAttribute('data-en');
    });
    document.querySelectorAll('[data-en-html]').forEach(el=>{el.innerHTML=el.getAttribute('data-'+lang+'-html')||el.getAttribute('data-en-html')});
    document.querySelectorAll('[data-en-placeholder]').forEach(el=>{el.setAttribute('placeholder',el.getAttribute('data-'+lang+'-placeholder')||el.getAttribute('data-en-placeholder'))});
    document.querySelectorAll('[data-lang]').forEach(b=>{let selected=b.dataset.lang===lang;b.setAttribute('aria-pressed',String(selected));b.classList.toggle('selected',selected)});
  }
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLang(button.dataset.lang)));
  const yearEl=document.getElementById('year'); if(yearEl) yearEl.textContent=new Date().getFullYear();
  document.getElementById('back-top')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  // Optional slideshow: static initial photo for screenshot and reduced-motion users.
  const slides=Array.from(document.querySelectorAll('.hero-photo'));
  if (slides.length>1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let i=0; setInterval(()=>{slides[i].classList.remove('current');i=(i+1)%slides.length;slides[i].classList.add('current')},8500);
  }
});// Page-level interactions. No backend requests are made.
document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.filter-control');
  if (filters.length) {
    const projectCards = document.querySelectorAll('.portfolio-card');
    filters.forEach(btn => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filters.forEach(el => { el.classList.toggle('active', el === btn); el.setAttribute('aria-pressed', String(el===btn)); });
      let count = 0;
      projectCards.forEach(card => { const show = f === 'all' || card.dataset.category === f; card.hidden = !show; if (show) count++; });
      const note = document.getElementById('project-filter-count'); if(note) note.textContent = `${count} projects shown`;
    }));
  }
  const form = document.getElementById('contact-form');
  if(form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const note = document.getElementById('form-note');
    if(note){ note.hidden = false; note.scrollIntoView({behavior:'smooth',block:'nearest'}); }
  });
  document.querySelectorAll('.copy-link').forEach(button => button.addEventListener('click', () => {
    // A direct user action; clipboard may be restricted for file:// URLs.
    const text = window.location.href;
    const status = button.parentElement?.querySelector('.copy-status');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => { if(status) status.textContent='Link copied'; }).catch(() => { if(status) status.textContent='Use your browser address bar to copy the link'; });
    } else if(status) status.textContent='Use your browser address bar to copy the link';
  }));
});
