// Typing animation for hero text
(function(){
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
})();

console.log("Strawberry Tech Portfolio Infrastructure Active.");