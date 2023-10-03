// gsap anim
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '#home',
        start: 'top',
        end: 'bottom',
        scrub: true,
        markers: true
    }
})

tl.to('.brand', {
    x: window.innerWidth
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