function eachEl(list, fn) {
  for (var i = 0; i < list.length; i++) fn(list[i]);
}

document.addEventListener('DOMContentLoaded', function () {
  // Sticky header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    eachEl(links.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // ---------- Language switch (English / Somali) ----------
  function setLanguage(lang) {
    lang = lang === 'so' ? 'so' : 'en';
    document.documentElement.setAttribute('lang', lang);

    eachEl(document.querySelectorAll('[data-en]'), function (el) {
      var en = el.getAttribute('data-en');
      var so = el.getAttribute('data-so');
      if (so === null) return;
      if (el.tagName === 'TITLE') {
        document.title = lang === 'so' ? so : en;
      } else if (el.tagName === 'META') {
        el.setAttribute('content', lang === 'so' ? so : en);
      } else {
        el.textContent = lang === 'so' ? so : en;
      }
    });

    eachEl(document.querySelectorAll('[data-en-html]'), function (el) {
      var en = el.getAttribute('data-en-html');
      var so = el.getAttribute('data-so-html');
      if (so === null) return;
      el.innerHTML = lang === 'so' ? so : en;
    });

    eachEl(document.querySelectorAll('[data-en-placeholder]'), function (el) {
      var en = el.getAttribute('data-en-placeholder');
      var so = el.getAttribute('data-so-placeholder');
      if (so === null) return;
      el.setAttribute('placeholder', lang === 'so' ? so : en);
    });

    eachEl(document.querySelectorAll('.lang-switch button'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    try { localStorage.setItem('anchor_lang', lang); } catch (e) {}
  }

  var savedLang = 'en';
  try { savedLang = localStorage.getItem('anchor_lang') || 'en'; } catch (e) {}
  setLanguage(savedLang);

  eachEl(document.querySelectorAll('.lang-switch button'), function (b) {
    b.addEventListener('click', function () { setLanguage(b.getAttribute('data-lang')); });
  });

  // Contact form — placeholder submit handling (no backend wired up yet)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('form-note');
      var name = form.querySelector('#name').value.trim() || 'there';
      if (note) {
        note.textContent = 'Thanks, ' + name + '. Your request has been noted — replace this placeholder with a real form handler (e.g. Formspree, your backend, or an email API) to receive submissions.';
        note.style.display = 'block';
      }
      form.reset();
    });
  }

  // Footer year
  // Hero image slider (cross-fade)
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var slideIndex = 0;
    setInterval(function () {
      slides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add('active');
    }, 5000);
  }

  // Back to top button
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  eachEl(document.querySelectorAll('.js-year'), function (el) {
    el.textContent = new Date().getFullYear();
  });
});
