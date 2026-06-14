// Small accessible enhancements: year, nav toggle, typing effect, smooth links
(function(){
  // set current year
  var y = new Date().getFullYear();
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // nav toggle
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close nav on link click
    mainNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        if(mainNav.classList.contains('open')){
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded','false');
        }
      });
    });
  }

  // typing effect (respects prefers-reduced-motion)
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var typing = document.querySelector('.typing-text');
  if(typing && !prefersReduced){
    var phrasesAttr = typing.getAttribute('data-phrases');
    var phrases = [];
    try{ phrases = JSON.parse(phrasesAttr); }catch(e){ phrases = [typing.textContent.trim()]; }
    var idx = 0, char = 0, forward = true;
    function tick(){
      var word = phrases[idx % phrases.length];
      if(forward){
        char++;
        typing.textContent = word.slice(0,char);
        if(char === word.length){ forward = false; setTimeout(tick, 900); return; }
      } else {
        char--;
        typing.textContent = word.slice(0,char);
        if(char === 0){ forward = true; idx++; }
      }
      setTimeout(tick, forward ? 70 : 35);
    }
    tick();
  }

  // smooth scroll for in-page links when appropriate
  if('scrollBehavior' in document.documentElement.style && !prefersReduced){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var target = document.querySelector(this.getAttribute('href'));
        if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); target.focus({preventScroll:true}); }
      });
    });
  }
})();
// Verification confirmation script
console.log("IT Infrastructure Portal Dashboard Engine Initialized Successfully.");

// Quick script to add light interaction to the floating nodes
document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('click', () => {
        document.querySelectorAll('.node').forEach(n => n.classList.remove('active-node'));
        node.classList.add('active-node');
    });
});