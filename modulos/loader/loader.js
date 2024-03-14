// document.querySelector("body").innerHTML += 
// `
//     <div id=divLoader>
//     <figure id="loader">
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//     </figure>
//     </div>
// `;

const divLoader = document.getElementById("divLoader")

function openLoader(){
    document.getElementById("divLoader").classList.remove("closeLoader")
    document.getElementById("divLoader").classList.add("activeLoader")
}

function closeLoader(){
    document.getElementById("divLoader").classList.remove("activeLoader")
    document.getElementById("divLoader").classList.add("closeLoader")
}

