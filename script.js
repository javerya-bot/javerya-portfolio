// Javerya Portfolio — navigation, starfield and reveal animations

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Decorative twinkling stars
const starsContainer = document.getElementById("stars");
if (starsContainer) {
  const starCount = window.matchMedia("(max-width: 650px)").matches ? 35 : 65;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");
    const size = Math.random() * 2.2 + 0.8;
    star.className = "star";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2.5 + Math.random() * 3}s`;
    starsContainer.appendChild(star);
  }
}

// Reveal sections as they enter the viewport
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Highlight the current navigation section
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}

// Current year in footer
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();


// Cinematic loading counter and entrance
document.body.classList.add("loading");
const preloader = document.getElementById("preloader");
const loaderBar = document.getElementById("loaderBar");
const loaderPercent = document.getElementById("loaderPercent");

if (preloader && loaderBar && loaderPercent) {
  let progress = 0;
  const loadingTimer = window.setInterval(() => {
    progress = Math.min(progress + Math.ceil(Math.random() * 7), 100);
    loaderBar.style.width = `${progress}%`;
    loaderPercent.textContent = `${progress}%`;
    if (progress >= 100) {
      window.clearInterval(loadingTimer);
      window.setTimeout(() => {
        preloader.classList.add("done");
        document.body.classList.remove("loading");
      }, 350);
    }
  }, 55);
} else {
  document.body.classList.remove("loading");
}
