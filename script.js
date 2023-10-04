// lenis
const lenis = new Lenis({
	duration: 1.2,
	easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
	direction: 'vertical',
	gestureDirection: 'vertical',
	smooth: true,
	smoothTouch: false,
	touchMultiplier: 2,
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// cursor
const cursor = document.querySelector('.cursor');
const cursorTimeline = gsap.timeline({ paused: true });
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', e => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});
document.addEventListener('mousemove', () => {
	gsap.to(cursor, {
		duration: 0.3,
		x: mouseX,
		y: mouseY,
		ease: 'power2.out',
		delay: 0.1,
	});
});
document.addEventListener('mouseenter', () => {
	cursor.style.opacity = 1;
});
document.addEventListener('mouseleave', () => {
	cursor.style.opacity = 0;
});
const pointerObj = document.querySelectorAll(
	'.home-icon, a, button, img, video'
);
pointerObj.forEach(link => {
	link.addEventListener('mouseenter', () => {
		gsap.to(cursor, { duration: 0.2, scale: 10 });
	});

	link.addEventListener('mouseleave', () => {
		gsap.to(cursor, { duration: 0.2, scale: 1 });
	});
});

// my name
let tlHero = gsap.timeline({
	scrollTrigger: {
		scrub: true,
		trigger: '#hero',
		start: 'start start',
		end: 'bottom bottom+=-40%',
		endTrigger: '#hero',
		markers: true,
	},
});

tlHero.to('.hero-marquee', {
	x: -window.innerWidth,
	ease: 'power2.out',
	opacity: 0.2,
});

tlHero.from('.nav', {
	y: window.innerHeight,
	ease: 'power2.out',
});
