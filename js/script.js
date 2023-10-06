//
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

lenis.scrollTo('#loader');

//
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
		x: mouseX,
		y: mouseY,
		ease: 'power3.out',
	});
});
document.addEventListener('mouseenter', () => {
	cursor.style.opacity = 1;
});
document.addEventListener('mouseleave', () => {
	cursor.style.opacity = 0;
});
const pointerObj = document.querySelectorAll('a, img, video, svg, button');
pointerObj.forEach(link => {
	link.addEventListener('mouseenter', () => {
		gsap.to(cursor, { duration: 0.3, scale: 10 });
	});

	link.addEventListener('mouseleave', () => {
		gsap.to(cursor, { duration: 0.3, scale: 1 });
	});
});

//
let tlFullPage = gsap.timeline({
	scrollTrigger: {
		scrub: true,
		trigger: 'body',
		start: 'top',
		end: 'bottom',
		endTrigger: 'body',
	},
});
tlFullPage.to('.progress-bar', {
	value: 100,
	ease: 'power3.inOut',
	duration: 5,
	scrollTrigger: { scrub: 1 },
});
tlFullPage.from('.back-to-top', {
	ease: 'power3.inOut',
	y: window.innerHeight,
	duration: 5,
	scrollTrigger: { scrub: 1 },
});
//
let tlWelcome = gsap.timeline({
	scrollTrigger: {
		scrub: true,
		trigger: '#welcome',
		start: 'start+=12% start+=10%',
		end: 'start+=12% start+=10%',
		endTrigger: '#welcome',
	},
});
tlWelcome.to('.my-picture', {
	y: window.innerHeight,
	ease: 'power1.inOut',
	scrollTrigger: { scrub: 0.3 },
});
tlWelcome.from('.topbar', {
	y: -window.innerHeight,
	ease: 'power1.inOut',
	scrollTrigger: { scrub: 0.3 },
});
const walkingTextElements = document.querySelectorAll('.walking-text');
walkingTextElements.forEach((element, index) => {
	if (index % 2 === 0) {
		gsap.to(element, {
			ease: 'power3.inOut',
			x: window.innerWidth,
			opacity: 0,
			scrollTrigger: { scrub: 1 },
		});
	} else {
		gsap.to(element, {
			ease: 'power3.inOut',
			x: -window.innerWidth,
			opacity: 0,
			scrollTrigger: { scrub: 1 },
		});
	}
});
