var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

// Javascript for image slider manual navigation
var manualNav = function(manual){
  slides.forEach((slide) => {
    slide.classList.remove('activeSlider');

    btns.forEach((btn) => {
      btn.classList.remove('activeSlider');
    });
  });

  slides[manual].classList.add('activeSlider');
  btns[manual].classList.add('activeSlider');
}

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

// Javascript for image slider autoplay navigation
var repeat = function(activeClass){
  let activeSlider = document.getElementsByClassName('activeSlider');
  let i = 1;

  var repeater = () => {
    setTimeout(function(){
      [...activeSlider].forEach((activeSlide) => {
        activeSlide.classList.remove('activeSlider');
      });

    slides[i].classList.add('activeSlider');
    btns[i].classList.add('activeSlider');
    i++;

    if(slides.length == i){
      i = 0;
    }
    if(i >= slides.length){
      return;
    }
    repeater();
  }, 10000);
  }
  repeater();
}
repeat();