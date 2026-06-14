// Typing animation for hero text
(function(){
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var typing = document.querySelector('.typing-text');
  if(typing && !prefersReduced){
    var phrasesAttr = typing.getAttribute('data-phrases');
    var phrases = [];
    try{ phrases = phrasesAttr ? JSON.parse(phrasesAttr) : []; }catch(e){ phrases = []; }
    // sensible default if no data-phrases provided in HTML
    if(!phrases || !phrases.length || !phrases[0]){
      phrases = ["I am an Information Technology Student, a Web Developer, a Mobile Developer, and a System Enthusiast."];
    }
    var idx = 0, char = 0, forward = true;
    var isLongPhrase = phrases.length > 0 && phrases[0].length > 50;
    function tick(){
      var word = phrases[idx % phrases.length];
      if(forward){
        char++;
        typing.textContent = word.slice(0,char);
        if(char === word.length){ 
          if(isLongPhrase){
            // For long phrases, pause longer before restarting
            setTimeout(function(){ char = 0; idx++; tick(); }, 2000);
          } else {
            forward = false;
            setTimeout(tick, 900);
          }
          return; 
        }
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

// Array containing the exact text items from image_48a001.png
const roles = [
  "an Information Technology Student.",
  "a Web Developer.",
  "a Mobile Developer.",
  "a System Enthusiast."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Speed of typing out characters
const erasingSpeed = 60;  // Speed of deleting characters
const delayBetweenRoles = 2000; // How long it pauses on a completed phrase

function typeAnimation() {
  const targetElement = document.querySelector(".typing-text");
  if (!targetElement) return; // Prevents errors if element isn't rendered yet

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    // Remove a character
    targetElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add a character
    targetElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  // Typing Logic State Changes
  if (!isDeleting && charIndex === currentRole.length) {
    // Phrase is fully typed out, pause before deleting
    isDeleting = true;
    setTimeout(typeAnimation, delayBetweenRoles);
  } else if (isDeleting && charIndex === 0) {
    // Phrase is fully erased, move to the next role title
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeAnimation, 500);
  } else {
    // Keep typing or erasing at the set interval speed
    setTimeout(typeAnimation, isDeleting ? erasingSpeed : typingSpeed);
  }
}

// Run the script as soon as the document context DOM loads completely
document.addEventListener("DOMContentLoaded", () => {
  typeAnimation();
});