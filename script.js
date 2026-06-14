// Array containing core professional identities
const roles = [
    "an Information Technology Student.",
    "a Web Developer.",
    "a Mobile Developer.",
    "a System Enthusiast."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 60;
const delayBetweenRoles = 2000;

function typeAnimation() {
    const targetElement = document.querySelector(".typing-text");
    if (!targetElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        targetElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        targetElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeAnimation, delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeAnimation, 500);
    } else {
        setTimeout(typeAnimation, isDeleting ? erasingSpeed : typingSpeed);
    }
}

// Run typing script on load
document.addEventListener("DOMContentLoaded", () => {
    typeAnimation();
});