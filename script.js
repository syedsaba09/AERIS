  const layers = document.querySelectorAll(".parallax-layer");
const clouds = document.querySelectorAll(".floating-cloud");
const islands = document.querySelectorAll(".floating-island");
const stars = document.querySelectorAll(".stars");
const airship = document.querySelector(".airship");
const spaceship = document.querySelector(".spaceship");

let scrollY = 0;
let targetScroll = 0;

window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
});

function animateParallax() {

    scrollY += (targetScroll - scrollY) * 0.08;

    /* =========================
       MOUNTAINS
       ========================= */

    layers.forEach((layer, index) => {

        const speed = index === 0 ? 0.18 : 0.32;

        layer.style.transform =
            `translateY(${scrollY * speed}px)`;
    });


    /* =========================
       CLOUDS
       ========================= */

    clouds.forEach((cloud, index) => {

        const speed = 0.12 + index * 0.08;

        cloud.style.transform =
            `translate3d(${scrollY * speed}px,
                         ${scrollY * -0.05}px,
                         0)`;
    });


    /* =========================
   FLOATING ISLANDS
   ========================= */

const floatingSection =
    document.querySelector(".floating-section");

if (floatingSection) {

    const sectionTop = floatingSection.offsetTop;

    const sectionScroll =
        Math.max(0, scrollY - sectionTop);

    islands.forEach((island, index) => {

        const speeds = [0.12, 0.22, 0.32];

        const speed = speeds[index] || 0.2;

        island.style.transform =
            `translateY(${sectionScroll * speed}px)`;
    });
}


    /* =========================
       AIRSHIP
       ========================= */

    if (airship) {

        airship.style.transform =
            `translate3d(${scrollY * 0.18}px,
                         ${scrollY * -0.08}px,
                         0) rotate(-8deg)`;
    }


    /* =========================
       STARS
       ========================= */

    stars.forEach((star, index) => {

        const speed = index === 0 ? 0.08 : 0.16;

        star.style.transform =
            `translateY(${scrollY * speed}px)`;
    });


    /* =========================
       SPACESHIP
       ========================= */

    if (spaceship) {

        spaceship.style.transform =
            `translate3d(${scrollY * 0.08}px,
                         ${scrollY * -0.03}px,
                         0) rotate(-10deg)`;
    }


    requestAnimationFrame(animateParallax);
}

animateParallax();


/* =========================
   HERO BUTTON
   ========================= */

const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", () => {

        document.querySelector(".ascent-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    });
}


/* =========================
   RESTART BUTTON
   ========================= */

const restartBtn = document.getElementById("restartBtn");

if (restartBtn) {

    restartBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}

/* =========================
   MOUSE PARALLAX
   ========================= */

let mouseX = 0;
let mouseY = 0;

let currentMouseX = 0;
let currentMouseY = 0;

window.addEventListener("mousemove", (event) => {

    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

});

function animateMouseParallax() {

    currentMouseX += (mouseX - currentMouseX) * 0.05;
    currentMouseY += (mouseY - currentMouseY) * 0.05;

    /* Hero clouds */

    document.querySelectorAll(".hero .cloud").forEach((cloud, index) => {

        const depth = (index + 1) * 6;

        cloud.style.marginLeft =
            `${currentMouseX * depth}px`;

        cloud.style.marginTop =
            `${currentMouseY * depth}px`;

    });


    /* Sun */

    const sun = document.querySelector(".sun");

    if (sun) {

        sun.style.transform =
            `translate(${currentMouseX * 8}px,
                       ${currentMouseY * 8}px)`;

    }


    requestAnimationFrame(animateMouseParallax);
}

animateMouseParallax();

/* =========================
   SECTION REVEAL
   ========================= */

const sectionContents =
    document.querySelectorAll(".journey-section .section-content");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.3
    }
);

sectionContents.forEach((content) => {
    revealObserver.observe(content);
});