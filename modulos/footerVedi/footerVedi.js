const pathname = (document.location.pathname).split("/")[1] + "/src";

const footerVedi = `
<footer>
        <div class="containerFooter">
            <div class="footerContentLeft">
                <img class="imgMunicipalidad" src="/${pathname}/modulos/footerVedi/municipalidad/municipalidad.png" alt="imgMunicipalidad">
                <img class="divisorFooter" src="/${pathname}/modulos/footerVedi/municipalidad/divisorFooter.png" alt="imgMunicipalidad">
                <img class="imgMunicipalidadCba" src="/${pathname}/modulos/footerVedi/municipalidad/municipalidadCordoba.png"
                    alt="imgMunicipalidadCordoba">
            </div>
            <div class="footerContentRight">
                <div class="footerSocialMedia">
                    <span>Seguinos en</span>
                    <a href="https://www.facebook.com/MuniCba/"><img class="socialMedia"
                            src="/${pathname}/modulos/footerVedi/municipalidad/facebook.svg" alt=""></a>
                    <a href="https://www.instagram.com/municba/"><img class="socialMedia"
                            src="/${pathname}/modulos/footerVedi/municipalidad/instagram.svg" alt=""></a>
                    <a href="https://twitter.com/MuniCba"><img class="socialMedia" src="/${pathname}/modulos/footerVedi/municipalidad/twitter2.svg"
                            alt=""></a>
                    <a href="https://www.youtube.com/user/cordobagovar"><img class="socialMedia"
                            src="/${pathname}/modulos/footerVedi/municipalidad/youtube2.svg" alt=""></a>
                    <a href="https://www.flickr.com/photos/158498840@N03/page7"><img class="socialMedia"
                            src="/${pathname}/modulos/footerVedi/municipalidad/flickr.svg" alt=""></a>
                    <a href="https://www.linkedin.com/company/876657/"><img class="socialMedia"
                            src="/${pathname}/modulos/footerVedi/municipalidad/linkedin.svg" alt=""></a>
                </div>
                <div class="footerContact">
                    <span>Municipalidad de Córdoba</span>
                    <span>Marcelo T. de Alvear 120, Córdoba. República Argentina</span>
                    <span>0800-88-0404</span>
                    <span class="webmail">Capital Humano | Webmail</span>
                </div>
            </div>
        </div>
        <div class="bottomFooter"><img src="/${pathname}/modulos/footerVedi/municipalidad/LINEA DE COLOR.svg" alt="lineaColor"></div>
    </footer>
`;

document.querySelector("head").innerHTML += `<link rel="stylesheet" href="/${pathname}/modulos/footerVedi/footerVedi.css">`
document.querySelector("body").innerHTML += footerVedi



