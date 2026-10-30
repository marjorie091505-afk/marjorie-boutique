gsap.registerPlugin(ScrollTrigger);


const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

tl.from(".intro-title", { y: 50, opacity: 0 })
  
  .from(".intro-text", { y: 30, opacity: 0 }, "-=0.4")
  
  .from("header nav a", { y: -20, opacity: 0, stagger: 0.1 }, "-=0.6")
  .from(".intro-btn", { scale: 0.8, opacity: 0, duration: 0.5 });


document.getElementById("replay-btn").addEventListener("click", () => {
    tl.restart();
});


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