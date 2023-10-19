// dark mode
const switchTheme = () => {
	const rootElem = document.documentElement;

	let dataTheme = rootElem.getAttribute('data-theme'),
		newTheme;

	newTheme = dataTheme == 'light' ? 'dark' : 'light';

	rootElem.setAttribute('data-theme', newTheme);

	localStorage.setItem('theme', newTheme);
};

document
	.querySelector('#theme-switcher')
	.addEventListener('click', switchTheme);

// gsap
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// gsap
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
	ease: 'power1.inOut',
	scrollTrigger: { scrub: 0.9 },
});

// gsap
let timelineHero = gsap.timeline({
	scrollTrigger: {
		scrub: 0.3,
		trigger: '#hero',
		start: 'start',
		end: 'center',
		endTrigger: '#hero',
	},
});

timelineHero.to('.avatar', { opacity: 0 });
timelineHero.from('#nav', { y: -40, opacity: 0 });

const textElements = document.querySelectorAll('.text');

textElements.forEach((text, index) => {
	if (index % 2 === 0) {
		timelineHero.to(text, { x: window.innerWidth, opacity: 0 });
	} else {
		timelineHero.to(text, { x: -window.innerWidth, opacity: 0 });
	}
});

// gsap

const video = document.querySelector('.video');
let src = video.currentSrc || video.src;

function once(el, event, fn, opts) {
	var onceFn = function (e) {
		el.removeEventListener(event, onceFn);
		fn.apply(this, arguments);
	};
	el.addEventListener(event, onceFn, opts);
	return onceFn;
}

once(document.documentElement, 'touchstart', function (e) {
	video.play();
	video.pause();
});

let timelineVideo = gsap.timeline({
	defaults: { duration: 1 },
	scrollTrigger: {
		trigger: '#reel',
		start: 'top+=-98% top',
		end: 'bottom+=10% bottom',
		scrub: true,
	},
});

once(video, 'loadedmetadata', () => {
	timelineVideo.fromTo(
		video,
		{
			currentTime: 0,
		},
		{
			currentTime: video.duration || 1,
		}
	);
});

setTimeout(function () {
	if (window['fetch']) {
		fetch(src)
			.then(response => response.blob())
			.then(response => {
				var blobURL = URL.createObjectURL(response);

				var t = video.currentTime;
				once(document.documentElement, 'touchstart', function (e) {
					video.play();
					video.pause();
				});

				video.setAttribute('src', blobURL);
				video.currentTime = t + 0.01;
			});
	}
}, 1000);

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
		gsap.to(cursor, { duration: 0.1, scale: 5 });
	});

	link.addEventListener('mouseleave', () => {
		gsap.to(cursor, { duration: 0.1, scale: 1 });
	});
});

// lenis
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => {
	lenis.raf(time * 600);
});

gsap.ticker.lagSmoothing(0);
