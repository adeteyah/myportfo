// gsap anim
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '#home',
        start: 'top',
        end: 'center',
        scrub: true,
        markers: true
    }
})

tl.from('.floating-menu', {
    y: 400
})

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