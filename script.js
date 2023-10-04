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

const links = document.querySelectorAll('.brand');

links.forEach(link => {
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
		start: 'center 20%',
		end: 'bottom',
		endTrigger: '#home',
		scrub: true,
	},
});

tlHome.to('.brand', {
	y: -window.innerHeight,
});

// projects animations
const projectElements = document.querySelectorAll('#projects .project');
projectElements.forEach((project, index) => {
	const tlProjects = gsap.timeline({
		scrollTrigger: {
			trigger: project,
			start: 'top 80%',
			end: 'bottom 20%',
			scrub: true,
			markers: true,
			endTrigger: '#projects',
		},
	});

	if (index % 2 === 0) {
		tlProjects.from(project, {
			opacity: 0,
			x: -window.innerWidth,
			ease: 'power2.out',
		});
	} else {
		tlProjects.from(project, {
			opacity: 0,
			x: window.innerWidth,
			ease: 'power2.out',
		});
	}
	TweenMax.to('.project-img', 1, { autoAlpha: 0, ease: Elastic.easeInOut });
	ScrollTrigger.create({
		trigger: project,
		animation: tlProjects,
		start: 'top top',
		end: 'bottom bottom',
		scrub: true,
	});
});

// contact animations

// lenis
const lenis = new Lenis();

lenis.on('scroll', e => {
	console.log(e);
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
