
function onScanSuccess(qrCodeMessage) {
    document.getElementById('result').innerHTML = '<span class="result">' + qrCodeMessage + '</span>';
}

function onScanError(errorMessage) {
    //handle scan error
}

function changeQRImage() {
    let qrImage = `<div class="divLottie bicicletas">
                    <lottie-player src="./images/qrCode.json" background="transparent"  speed="0.50"  style="width: 150px; height: 150px;" autoplay loop></lottie-player>            
                </div>`

    document.getElementById("reader__scan_region").innerHTML = qrImage;
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", {
        fps: 10,
        qrbox: 250
    });
html5QrcodeScanner.render(onScanSuccess, onScanError);

document.getElementById("reader__status_span").previousSibling.remove();
document.getElementById("reader__status_span").parentNode.classList.add("hidden");

document.getElementById("result").addEventListener("DOMNodeInserted", () => {
    let qrData = document.getElementById("result").firstChild.innerHTML;
    document.getElementById("btnSalir").click();
    changeQRImage()
    cargarFormularioConQR(qrData);
})

changeQRImage();

document.getElementById("reader__dashboard_section_csr").firstChild.firstChild.addEventListener("click", () => {
    setTimeout(() => {
        document.getElementById("btnSalir").addEventListener("click", () => {
            changeQRImage()
        });
    }, 1500);
})

