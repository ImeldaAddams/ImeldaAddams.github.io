// --- TYPING ENGINE CONFIGURATION ---
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

// --- DYNAMIC STRAWBERRY RAIN GENERATOR ---
function createStrawberryRain() {
    const heroSection = document.getElementById("home");
    if (!heroSection) return;

    // Create a strawberry element
    const strawberry = document.createElement("div");
    strawberry.classList.add("strawberry-drop");
    strawberry.innerText = "🍓";

    // Randomize horizontal landing points across the screen widths (0% to 100%)
    strawberry.style.left = Math.random() * 100 + "%";

    // Randomize drop fall speeds so they look natural (between 4 to 8 seconds)
    const fallDuration = Math.random() * 4 + 4;
    strawberry.style.animationDuration = fallDuration + "s";

    // Randomize sizes slightly for perspective (between 16px and 32px)
    const sizeVariations = Math.random() * 16 + 16;
    strawberry.style.fontSize = sizeVariations + "px";

    // Append into the landing card wrapper
    heroSection.appendChild(strawberry);

    // Garbage collector: automatically clear elements from memory after they exit the screen
    setTimeout(() => {
        strawberry.remove();
    }, fallDuration * 1000);
}

// Initialize components when DOM context structures mount
document.addEventListener("DOMContentLoaded", () => {
    typeAnimation();
    
    // Spawns a fresh cascading strawberry every 400 milliseconds
    setInterval(createStrawberryRain, 400);
});