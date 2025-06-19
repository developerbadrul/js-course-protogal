'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


// MOdal implement
const openModal = e => {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden')
}

const closeModal = (e) => {
  console.log(e, `modal close`);
  modal.classList.add('hidden');
  overlay.classList.add('hidden')
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})


// theme mode implement
const toggleTheme = () => {
  let isDarkMode = document.body.classList.toggle('dark-mode');

  toggleBtn.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  toggleBtn.classList.toggle('light-mode-btn', isDarkMode)
  toggleBtn.classList.toggle('dark-mode-btn', !isDarkMode)
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};

const darkStyle = document.createElement("style");
darkStyle.textContent = `
  .dark-mode {
    background-color: black;
    color: white;
  }
`;

document.head.appendChild(darkStyle)

const toggleBtn = document.createElement("button");
toggleBtn.textContent = "Dark Mode";


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleBtn.textContent = "Light Mode";
  toggleBtn.classList.toggle("light-mode-btn")
} else {
  toggleBtn.classList.toggle("dark-mode-btn")
}

toggleBtn.onclick = toggleTheme;

const nav = document.querySelector(".nav");
if (nav) {
  nav.appendChild(toggleBtn);
} else {
  console.error("Header element not found!");
}



// nav hover effect

const handleHover = function (e) {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')
    // console.log(siblings, link);
    siblings.forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))


// Tabbed component

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab')
  // console.log(clicked);
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})

// slider implement
const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;
let autoSlideInterval;
// slider.style.transform = 'scale(0.3)';
// slider.style.overflow = 'visible';
// slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`)

const goToSlide = (slide) => {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
}

goToSlide(0)

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0
  } else {
    curSlide++
  };
  goToSlide(curSlide)
  activeDot(curSlide)
}

const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide)
  activeDot(curSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval)
}

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', () => {
  isSliderVisible && startAutoSlide();
})

let isSliderVisible = false;

const sliderOptions = {
  root: null,
  threshold: 0.9
}

const sliderCallbackFn = (entries) => {
  const [entry] = entries;
  console.log("Slider", entry);
  isSliderVisible = entry.isIntersecting;

  if (isSliderVisible) {
    startAutoSlide();
  } else {
    stopAutoSlide();
  }

}

const sliderObserver = new IntersectionObserver(sliderCallbackFn, sliderOptions)

sliderObserver.observe(slider)

document.addEventListener('keydown', (e) => {
  console.log(e);
  if (isSliderVisible) {
    e.key === 'ArrowLeft' && prevSlide()
    e.key === 'ArrowRight' && nextSlide()
  }
})

const createDots = () => {
  slides.forEach((_, i) => dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  )
}

createDots();


function activeDot(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active');
}

activeDot(0)
// console.log("dots check", document.querySelector(`.dots__dot[data-slide='1']`));


dotContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    const slide = +e.target.dataset.slide
    goToSlide(slide)
    activeDot(slide)
  }
})




// visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = "Come Back! 😢";
  } else {
    document.title = "You're Back! 🎉";
  }
})

//sticky featucher
const section1 = document.querySelector('#section--1')
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;
// // console.log(section1);

// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', () => {
//   window.scrollY > initialCoords.top ? nav.classList.add('sticky') : nav.classList.remove('sticky');
// })

const stickyNav = (entries) => {
  entries.forEach(entry => {

    if (!entry.isIntersecting) {
      nav.classList.add('sticky')
    } else {
      nav.classList.remove('sticky')
    }

  })
}

const obsOption = {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`
}

const observer = new IntersectionObserver(stickyNav, obsOption);

observer.observe(header);

// reveal sections
const allSections = document.querySelectorAll('.section')

const revealSection = (entries, observer) => {
  const [entry] = entries
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionOvserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(section => {
  sectionOvserver.observe(section)
  section.classList.add('section--hidden')
})

// Lazy Loading
const imgTarget = document.querySelectorAll('img[data-src]')
console.log(imgTarget);

const loadImg = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTarget.forEach(img => imgObserver.observe(img))


