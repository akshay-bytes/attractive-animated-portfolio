const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  lerp: 0.06,
});

// MAKE SCROLL TRIGGER WORK WITH LOCO

scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// Function to rotate .imgcontain elements
function rotateImgContainers() {
  // Loop through each .imgcontain element
  document.querySelectorAll(".imgcontain").forEach((container, index) => {
    // Create a GSAP timeline for the rotation animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center", // Adjust as needed
        end: "bottom center", // Adjust as needed
        scrub: true, // Smoothly scrub through animation
      },
    });

    // Define the rotation animation
    tl.to(container, {
      rotation: 40, // Rotate by 360 degrees (1 full rotation)
      duration: 1, // Adjust the duration as needed
      ease: "none", // Adjust the easing function as needed
    });
  });
}

// Call the rotateImgContainers function to set up the animations
rotateImgContainers();

// function locomotiveAnimation() {
//   gsap.registerPlugin(ScrollTrigger);

//   // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

//   const locoScroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
//   });
//   // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
//   locoScroll.on("scroll", ScrollTrigger.update);

//   // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
//   ScrollTrigger.scrollerProxy("#main", {
//     scrollTop(value) {
//       return arguments.length
//         ? locoScroll.scrollTo(value, 0, 0)
//         : locoScroll.scroll.instance.scroll.y;
//     }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//     getBoundingClientRect() {
//       return {
//         top: 0,
//         left: 0,
//         width: window.innerWidth,
//         height: window.innerHeight,
//       };
//     },
//     // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//     pinType: document.querySelector("#main").style.transform
//       ? "transform"
//       : "fixed",
//   });

//   // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
//   ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

//   // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
//   ScrollTrigger.refresh();
// }
// locomotiveAnimation();

function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    // Create two spans
    var parent = document.createElement("span");
    var child = document.createElement("span");

    //   Parent and child both sets their respective classes
    parent.classList.add("parent");
    child.classList.add("child");

    // elem replaces its value with parent span
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    // span parent gets child and child gets the elem details
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}
revealToSpan();

function setValue() {
  gsap.set("body .nav", { y: "100%", opacity: 0 });
  gsap.set("#home .parent .child", { y: "100%" });
  gsap.set(".date", { y: "10%", opacity: 0 });
  gsap.set("#home .row .image img", { opacity: 0 });
}
setValue();

function animateHomepage() {
  var tl = gsap.timeline();
  tl.to("body .nav", {
    y: 0,
    duration: 1.5,
    opacity: 1,
    stagger: 0.25,
    delay: -0.5,
    ease: Expo.easeInOut,
  })

    .to("#home .parent .child", {
      y: 0,
      duration: 1.5,
      delay: -0.5,
      stagger: 0.1,
      ease: Circ.easeInOut,
    })

    .to(".image img", {
      opacity: 1.5,
      duration: 1,
      delay: -0.8,
      stagger: 0.25,
      ease: Expo.easeInOut,
    })
    .to(".date", {
      y: 0,
      duration: 1.5,
      delay: -1.5,
      opacity: 1,
      stagger: 0.25,
      ease: Expo.easeInOut,
    });

  tl.to(".imgcontain", {
    opacity: "1",
  }).to("#imgleft", {
    opacity: 1,
    duration: 2, // Animation duration in seconds
  });
}

function loaderAnimation() {
  var tl = gsap.timeline();

  tl.from("#loader .child span", {
    x: "100%",
    stagger: 0.2,
    delay: 0.2,
    duration: 0.8,
    opacity: 0,
  });

  tl.to("#loader .parent .child", {
    y: "-110%",
    duration: 0.5,
    // delay: 0.2,
    ease: Expo.easeInOut,
    stagger: 0.2,
  });

  tl.to("#loader", {
    height: 0,
    duration: 1,
    ease: Expo.easeInOut,
  });

  tl.to("#green", {
    height: "100vh",
    top: 0,
    duration: 1,
    delay: -1.1,
    ease: Expo.easeInOut,
  });

  tl.to("#green", {
    height: "0vh",
    top: 0,
    delay: -0.2,
    duration: 0.5,
    ease: Expo.easeInOut,
    onComplete: function () {
      animateHomepage();
    },
  });
}
loaderAnimation();

document.addEventListener("DOMContentLoaded", function () {
  function svgAnimate() {
    document.querySelectorAll("#Visual>g").forEach(function (e) {
      let character = e.childNodes[1].childNodes[1];
      character.style.strokeDasharray = character.getTotalLength() + "px";
      character.style.strokeDashoffset = character.getTotalLength() + "px";
    });

    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
      strokeDashoffset: 0,
      duration: 1,
      stagger: 0.25,
      ease: Expo.easeInOut,
      delay: 6,
    });
    console.log("animated");
  }
  svgAnimate();
});

// DATE TIME SCRIPT
function startTime() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth();
  var year = today.getFullYear();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  document.querySelector(".date").innerHTML = today;
  document.querySelector(".date").style.fontSize = "1vw";
  document.querySelector(".date").style.fontFamily = "gilroy medium";
  document.querySelector(".date").style.color = "#A2A2A2";

  var t = setInterval(() => {
    startTime();
  }, 500);
}
startTime();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
checkTime();

function cardHoverEffect() {
  document.querySelectorAll(".project").forEach(function (project) {
    // Create a variable
    var showImage;

    project.addEventListener("mousemove", function (dets) {
      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.opacity = 1;
      showImage = dets.target;

      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.transform = `translate(${dets.clientX - 110}px, ${
        dets.clientY - 110
      }px)`;

      showImage.style.filter = "grayscale(1)";

      document.querySelector("#work").style.backgroundColor =
        dets.target.dataset.color;
    });

    project.addEventListener("mouseleave", function (dets) {
      document.querySelector("#cursor").children[
        showImage.dataset.index
      ].style.opacity = "0";
      showImage.style.filter = "grayscale(0)";

      document.querySelector("#work").style.backgroundColor = "#F2F2F2";
    });
  });
}
cardHoverEffect();
// end hover effect on cards

//
//
//
//
//
