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
const pointerObj = document.querySelectorAll(
	'a, img, video, svg, button, .walking-text span'
);
pointerObj.forEach(link => {
	link.addEventListener('mouseenter', () => {
		gsap.to(cursor, { duration: 0.1, scale: 5 });
	});

	link.addEventListener('mouseleave', () => {
		gsap.to(cursor, { duration: 0.1, scale: 1 });
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
	scrollTrigger: { scrub: 0.9 },
});
let tlAbout = gsap.timeline({
	scrollTrigger: {
		scrub: true,
		trigger: '#about',
		start: 'start+=12% start+=10%',
		end: 'start+=12% start+=10%',
		endTrigger: '#about',
	},
});
tlAbout.to('.my-picture', {
	y: window.innerHeight,
	ease: 'power1.inOut',
	scrollTrigger: { scrub: 0.3 },
});
//
// Initialize SplitText
const text = new SplitText('.header', { type: 'chars, words' });

// Create a timeline for the animation
const tl = new TimelineMax();

// Set initial properties (off the screen to the right)
tl.staggerFrom(
	text.chars,
	0.5,
	{ x: 500, opacity: 0, ease: Power4.easeOut },
	0.1
);

// Add a delay before reversing the animation
tl.to({}, 1, {});

// Reverse the animation (from left to right)
tl.staggerTo(text.chars, 0.5, { x: 0, opacity: 1, ease: Power4.easeOut }, 0.1);

// Play the timeline
tl.play();

// Ensure that the animation plays only once
let played = false;
document.addEventListener('scroll', () => {
	if (!played && window.scrollY >= 500) {
		tl.play();
		played = true;
	}
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
const walkingTexts = document.querySelectorAll('.activate-bg');
const myPicture = document.querySelector('.my-picture');

walkingTexts.forEach(text => {
	text.addEventListener('mouseenter', () => {
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
		walkingTexts.forEach(otherText => {
			gsap.to([myPicture, otherText], {
				opacity: 1,
				ease: 'power3.in',
				duration: 0.6,
			});
		});
	});
});
