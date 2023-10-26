// dark mode
const switchTheme = () => {
  const rootElem = document.documentElement;

  let dataTheme = rootElem.getAttribute("data-theme"),
    newTheme;

  newTheme = dataTheme == "light" ? "dark" : "light";

  rootElem.setAttribute("data-theme", newTheme);

  localStorage.setItem("theme", newTheme);
};

document
  .querySelector("#theme-switcher")
  .addEventListener("click", switchTheme);

// show work
function workShowGrid() {
  document.querySelector(".work").setAttribute("data-show", "grid");
  localStorage.setItem("workView", "grid");
}

function workShowList() {
  document.querySelector(".work").setAttribute("data-show", "list");
  localStorage.setItem("workView", "list");
}

if (localStorage.getItem("workView") == "list") {
  document.querySelector(".work").setAttribute("data-show", "list");
}

// gsap
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// gsap
let tlFullPage = gsap.timeline({
  scrollTrigger: {
    scrub: true,
    trigger: "body",
    start: "top",
    end: "bottom",
    endTrigger: "body",
  },
});
tlFullPage.to(".progress-bar", {
  value: 100,
  ease: "power1.inOut",
  scrollTrigger: { scrub: true },
});

// gsap

const lead = document.querySelectorAll(".lead .item");

lead.forEach((item, index) => {
  const skewXValue = index % 2 === 0 ? 20 : -20;

  gsap.to(item, {
    skewX: skewXValue,
    opacity: 1,
    scrollTrigger: {
      trigger: item,
      endTrigger: item,
      start: "top-100%",
      end: "bottom",
      ease: "power3.in",
      scrub: true,
    },
  });
});

document.querySelectorAll(".work[data-show='list'] .item a").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const hoverAnimation = gsap.to(item, { x: 5, scrub: true });
    item.addEventListener("mouseleave", () => {
      hoverAnimation.reverse();
    });
  });
});

const video = document.querySelector(".video");

let src = video.currentSrc || video.src;

function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

let timelineVideo = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: ".video-wrapper",
    start: "top+=-90% top",
    end: "bottom+=90% bottom",
    scrub: true,
  },
});

once(video, "loadedmetadata", () => {
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
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);

// cursor
const cursor = document.querySelector(".cursor");
const cursorTimeline = gsap.timeline({ paused: true });
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
document.addEventListener("mousemove", () => {
  gsap.to(cursor, {
    x: mouseX,
    y: mouseY,
    ease: "power2.out",
  });
});
document.addEventListener("mouseenter", () => {
  cursor.style.opacity = 1;
});
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = 0;
});
const pointerObj = document.querySelectorAll("a, img, video, svg, button");
pointerObj.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(cursor, { duration: 0.1, scale: 1 });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(cursor, { duration: 0.1, scale: 0.2 });
  });
});

// lenis
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 600);
});

gsap.ticker.lagSmoothing(0);

//

const elementsWorks = document.querySelectorAll(".work .item");
const slidePicWorks = document.querySelector("#gallery-work");
const slidePicsWorks = document.querySelector("#work-images");

gsap.set(slidePicWorks, { autoAlpha: 0 });

elementsWorks.forEach((element, index) => {
  element.addEventListener("mouseenter", function () {
    gsap.to(slidePicsWorks, {
      marginTop: `-${280 * index}px`,
      duration: 0.2,
      ease: "power1",
    });
  });

  element.addEventListener("mouseleave", function () {
    gsap.to(element, { color: "initial", duration: 0.2, ease: "power1" });
  });
});

window.addEventListener("mousemove", function (e) {
  gsap.to(slidePicWorks, {
    top: `${e.clientY}px`,
    left: `${e.clientX}px`,
    xPercent: -50,
    yPercent: -50,
    duration: 0.2,
    ease: "power1",
  });
});

document.querySelector(".work").addEventListener("mouseenter", function () {
  gsap.to(slidePicWorks, {
    autoAlpha: 1,
    duration: 0.2,
    ease: "power1",
  });
});

document.querySelector(".work").addEventListener("mouseleave", function () {
  gsap.to(slidePicWorks, {
    autoAlpha: 0,
    duration: 0.2,
    ease: "power1",
  });
});
