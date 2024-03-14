// const wrapper = document.querySelector(".wrapper"),
// qrInput = wrapper.querySelector(".form input"),
// generateBtn = wrapper.querySelector(".form button"),
// qrImg = wrapper.querySelector(".qr-code img");
let preValue;

function crearQR(qrValue){
    // let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generando Código...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generar otro QR";
    });
}

function generarQR(qrValue,idImgElement){
    let imgElement = document.getElementById(idImgElement)
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    imgElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
}

// qrInput.addEventListener("keyup", () => {
//     if(!qrInput.value.trim()) {
//         wrapper.classList.remove("active");
//         preValue = "";
//     }
// });