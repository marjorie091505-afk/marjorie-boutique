// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- D1 & D2: GSAP Intro Timeline ---
// D2: power3.out is chosen for a snappy, modern entrance that decelerates smoothly.
const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

tl.from(".intro-title", { y: 50, opacity: 0 })
  // D1: Overlap using "-=0.4" position parameter
  .from(".intro-text", { y: 30, opacity: 0 }, "-=0.4")
  // D1: Staggered elements (header nav items)
  .from("header nav a", { y: -20, opacity: 0, stagger: 0.1 }, "-=0.6")
  .from(".intro-btn", { scale: 0.8, opacity: 0, duration: 0.5 });

// D3: Click Interaction to replay intro
document.getElementById("replay-btn").addEventListener("click", () => {
    tl.restart();
});

// --- E2: Scroll Progress Bar (Scrub effect) ---
gsap.to("#progress-bar", {
    width: "100%",
    ease: "none", // E2 requirement
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

// --- E1 & E3: ScrollTrigger for Section Reveals with matchMedia ---
// E3: Wrapped in matchMedia so reduced motion users see content immediately.
let mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
    // E1: Loop through all .reveal elements
    gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%", // E1 explicit start
                toggleActions: "play none none reverse" // E1 explicit toggleActions
            }
        });
    });
});