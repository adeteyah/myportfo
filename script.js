// cursor
// Create a GSAP timeline for the cursor
const cursor = document.querySelector('.cursor');
const cursorTimeline = gsap.timeline({ paused: true });

// Initialize cursor position
let mouseX = 0;
let mouseY = 0;

// Update cursor position on mousemove
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Update cursor position and play animation on mousemove
document.addEventListener('mousemove', () => {
  gsap.to(cursor, {
      duration: 0.3, // Adjust the duration as needed
      x: mouseX,
      y: mouseY,
      ease: 'power2.out', // Adjust easing function as needed
      delay: 0.1 // Introduce a delay for the lag effect
  });
});

// Hide cursor when it's not moving
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
});

// Add cursor hover effect on links
const links = document.querySelectorAll('.brand');

links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
        gsap.to(cursor, { duration: 0.2, scale: 3 });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(cursor, { duration: 0.2, scale: 1 });
    });
});


// home animations
let tlHome = gsap.timeline({
    scrollTrigger: {
        trigger: '#home',
        start: 'center',
        end: 'bottom',
        scrub: true,
        markers: true,
    }
})

tlHome.to('.brand', {
  y: -window.innerHeight
})

// projects animations

// contact animations

// lenis
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)