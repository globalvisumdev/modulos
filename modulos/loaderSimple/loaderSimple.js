// var pathnameWindowIconLoader = (document.location.pathname).split("/")[1];
// document.head.innerHTML += `<link rel="stylesheet" href="/${pathnameWindowIconLoader}/modulos/loaderSimple/loaderSimple.css">`;


// document.querySelector("body").innerHTML += `<div class="loaderSimpleContainer" id="loaderSimpleContainer">
//     <span class="loaderSimple"></span>
// </div>
// `;

var loaderSimpleContainer = document.getElementById("loaderSimpleContainer");

function openLoaderSimple() {
    loaderSimpleContainer.classList.add("activeLoaderSimple")
}

function closeLoaderSimple() {
    loaderSimpleContainer.classList.remove("activeLoaderSimple")
}