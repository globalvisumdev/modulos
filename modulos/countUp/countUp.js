let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;

function countUp(){
  valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
      if (startValue == endValue || endValue == 0) {
        clearInterval(counter);
      }else{
        startValue += 1;
        valueDisplay.textContent = startValue;
      }
    }, duration);
  });
}


