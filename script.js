// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Infinte Logo Slider
const track = document.getElementById('logosTrack');
const logos = Array.from(track.children);
// Duplicate until overflow is guaranteed
while (track.scrollWidth < track.parentElement.offsetWidth * 10) {
  logos.forEach(item => {
    track.appendChild(item.cloneNode(true));
  });
}
let pos = 0;
const speed = 0.8; // Adjust for smooth speed
function animate() {
  pos -= speed;
  if (Math.abs(pos) >= track.scrollWidth / 10) {
    pos = 0;
  }
  // Use translate3d for better performance
  track.style.transform = `translate3d(${pos}px, 0, 0)`;
  requestAnimationFrame(animate);
}
animate();

// Add some interactive particles effect
function createParticle() {
  const particle = document.createElement("div");
  particle.style.position = "fixed";
  particle.style.width = "2px";
  particle.style.height = "2px";
  particle.style.backgroundColor = "#00ff88";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "1";
  particle.style.borderRadius = "50%";
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = window.innerHeight + "px";
  particle.style.opacity = "0.7";

  document.body.appendChild(particle);

  const animation = particle.animate(
    [
      { transform: "translateY(0px)", opacity: 0.7 },
      {
        transform: `translateY(-${window.innerHeight + 100}px)`,
        opacity: 0,
      },
    ],
    {
      duration: 15000 + Math.random() * 10000,
      easing: "linear",
    }
  );

  animation.addEventListener("finish", () => {
    particle.remove();
  });
}

// Create particles occasionally
setInterval(createParticle, 3000);