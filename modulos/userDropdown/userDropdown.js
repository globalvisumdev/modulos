// $(document).ready(function () {
//   $(".action").on("click", function () {
//     $(".menu").toggleClass("active");
//   });
// });

document.querySelector(".action").addEventListener("click",()=>{
  document.querySelector(".pmenu").classList.toggle("active");
})

document.addEventListener("mouseup", function(event) {

  if (!document.querySelector(".pmenu").contains(event.target) &&  !document.querySelector(".action").contains(event.target)) {
    document.querySelector(".pmenu").classList.remove("active");
  }
});