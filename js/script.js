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
		gsap.to(cursor, { duration: 0.3, scale: 5 });
	});

	link.addEventListener('mouseleave', () => {
		gsap.to(cursor, { duration: 0.3, scale: 1 });
	});
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
//
let tlContact = gsap.timeline({
	scrollTrigger: {
		scrub: true,
		trigger: '#contact',
		start: 'center+=10% center+=20%',
		end: 'center+=10% center+=20%',
		endTrigger: '#contact',
	},
});
tlContact.from('#contact a', {
	rotateX: 500,
	ease: 'power3.inOut',
	opacity: 0.5,
	scrollTrigger: { scrub: 0.3 },
});
//
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
//const walkingTexts = document.querySelectorAll('.activate-bg');
const walkingTexts = document.querySelectorAll('.activate-bg');
const myPicture = document.querySelector('.my-picture');

walkingTexts.forEach(text => {
	text.addEventListener('mouseenter', () => {
		// Hide other .activate-bg divs using opacity
		walkingTexts.forEach(otherText => {
			if (otherText !== text) {
				gsap.to([myPicture, otherText], {
					opacity: 0,
					ease: 'power3.out',
					duration: 0.6,
				});
			}
		});
	});

	text.addEventListener('mouseleave', () => {
		// Show all .activate-bg divs and .my-picture on mouse leave
		walkingTexts.forEach(otherText => {
			gsap.to([myPicture, otherText], {
				opacity: 1,
				ease: 'power3.in',
				duration: 0.6,
			});
		});
	});
});
