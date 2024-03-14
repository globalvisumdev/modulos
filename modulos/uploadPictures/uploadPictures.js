var tempPicturesDatos = []
var tempPicturesNumDatos = 1;

var tempPicturesBici = []
var tempPicturesNumBici = 1;


async function resizeImage(base64URL){
    const WIDTH = 700;

    let image = document.createElement("img");
    image.src = base64URL;

    return new Promise((resolve) => {
        image.onload = (e) => {
            
            let canvas = document.createElement("canvas");
            let ratio = WIDTH / e.target.width;
            canvas.width = WIDTH;
            canvas.height = e.target.height * ratio;
    
            const context = canvas.getContext("2d");
    
            context.drawImage(image, 0,0 , canvas.width, canvas.height)
    
            let base64URLresize = context.canvas.toDataURL("image/jpeg", 50 );
    
            resolve(base64URLresize)
        }
    });

}

async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            resolve(reader.result);
        });
        reader.readAsDataURL(file);
    });
};

async function saveTempPictures(idSelect,modulo, idPreview = false){
    
    let file = document.getElementById(idSelect)['files'][0];
    let base64URL = await encodeFileAsBase64URL(file);

    let base64URLResize = await resizeImage(base64URL);

    let nombreModulo = modulo;

    let tempPicturesNum;
    if (modulo == "datos"){
        tempPicturesNum = tempPicturesNumDatos;
        nombreModulo = "datos"
    } 
    if (modulo == "bici"){
        tempPicturesNum = tempPicturesNumBici;
        nombreModulo = "bici"
    } 

    let fecha = fechaHoraActual()
    let objPic = {}
    objPic["picture"+nombreModulo+tempPicturesNum] = "picture"+nombreModulo+tempPicturesNum;
    objPic["base64URL"] = base64URLResize;
    objPic["fecha"] = fecha;
    objPic["tipo"] = file.type;
    objPic["nombre"] = file.name;
    objPic["modulo"] = nombreModulo;
    if (idPreview) objPic["id"] = idPreview;

    if (modulo == "datos") {
        tempPicturesDatos.push(objPic);
        tempPicturesNumDatos++;
    }
    if (modulo == "bici") {
        tempPicturesBici.push(objPic);
        tempPicturesNumBici++;
    }
}

async function saveTempPictures2(idSelect,modulo){


    let file = document.getElementById(idSelect)['files'][0];
    let base64URL = await encodeFileAsBase64URL(file);

    let base64URLResize = await resizeImage(base64URL);

    let tempPicturesNum = modulo.cantImgs;
    let nombreModulo = modulo.modulo;

    let fecha = fechaHoraActual()
    let objPic = {}
    objPic["picture"+nombreModulo+tempPicturesNum] = "picture"+nombreModulo+tempPicturesNum;
    objPic["base64URL"] = base64URLResize;
    objPic["fecha"] = fecha;
    objPic["tipo"] = file.type;
    objPic["nombre"] = file.name;
    objPic["modulo"] = nombreModulo;

    modulo.data.push(objPic);
    modulo.cantImgs++;
    
    return base64URLResize;
    
}

// Abrir el inspector de archivos

function subirArchivo(idSelect){
    document.getElementById(idSelect).click()
};

// -> Abrir el inspector de archivos

// Cachamos el evento change

function cargarArchivos(idSelect,modulo) {
    let inputFiles = document.getElementById(idSelect).files;
    var files = inputFiles;
    var element;
    var supportedImages = ["image/jpeg", "image/png", "image/gif"];
    var seEncontraronElementoNoValidos = false;

    for (var i = 0; i < files.length; i++) {
        element = files[i];
        
        if (supportedImages.indexOf(element.type) != -1) {
            createPreview2(element,modulo);
        }
        else {
            seEncontraronElementoNoValidos = true;
        }
    }

    // if (seEncontraronElementoNoValidos) {
    //     alert("Se encontraron archivos no validos.");
    // }
    // else {
    //     alert("Todos los archivos se subieron correctamente.");
    // }

};

// -> Cachamos el evento change

// Eliminar previsualizaciones

// $(document).on("click", "#Images .image-container", function(e){
//     $(this).parent().remove();
// });

function deleteDiv(idDivDelete,modulo){
        document.getElementById(idDivDelete).remove();

    if (modulo == "datos") {
        tempPicturesDatos.forEach((objPicture, index) => {
            if(objPicture.hasOwnProperty(idDivDelete)){
                tempPicturesDatos.splice(index,1);
            }
        });
    }
    if (modulo == "bici") {
        tempPicturesBici.forEach((objPicture, index) => {
            if(objPicture.hasOwnProperty(idDivDelete)){
                tempPicturesBici.splice(index,1);
            }
        });
    }

    document.querySelector("#btnCloseModal").click();
}

// -> Eliminar previsualizaciones

//Genera las previsualizaciones

function createPreview(file,modulo) {
    var imgCodified = URL.createObjectURL(file);
    let divId = `divPic${modulo}`
    let container = document.getElementById(divId);

    let tempPicturesNum;
    if (modulo == "datos") {
        tempPicturesNum = tempPicturesNumDatos;
    }
    if (modulo == "bici") {
        tempPicturesNum = tempPicturesNumBici;
    }

    var img = `<div id="picture${modulo+tempPicturesNum}" class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12 picContainer">
                    <div class="image-container animate__animated animate__fadeIn"> 
                        <figure> 
                            <img src="${imgCodified} " alt="Foto del usuario"> 
                            <figcaption > 
                                <i onclick="deleteDiv('picture${modulo+tempPicturesNum}','${modulo}')" class="fa-solid fa-xmark icon"></i>
                            </figcaption> 
                        </figure> 
                    </div>
                </div>`;
    container.innerHTML += img;
}

function createPreview2(file,modulo) {
    var imgCodified = URL.createObjectURL(file);
    let divId = `divPic${modulo}`
    let containerGallery = document.getElementById(divId)

    let tempPicturesNum;
    if (modulo == "datos") {
        tempPicturesNum = tempPicturesNumDatos;
    }
    if (modulo == "bici") {
        tempPicturesNum = tempPicturesNumBici;
    }

    var imge = `<div id="picture${modulo+tempPicturesNum}" class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12 picContainer">
                    <div class="image-container animate__animated animate__fadeIn"> 
                        <figure> 
                            <img src="${imgCodified} " alt="Foto del usuario"> 
                            <figcaption > 
                                <i onclick="deleteDiv('picture${modulo+tempPicturesNum}','${modulo}')" class="fa-solid fa-xmark icon"></i>
                            </figcaption> 
                        </figure> 
                    </div>
                </div>`;

    let divImg = 
    `<div class="col" id="picture${modulo+tempPicturesNum}">
            <img src="${imgCodified}" divid="picture${modulo+tempPicturesNum}" modulo="${modulo}" class="gallery-item animate__animated animate__fadeInUp" alt="Cargando Fotos">
        </div>`;
        containerGallery.innerHTML += divImg;

}


function createImgGallery(files,divid){
    let containerGallery = document.getElementById(divid)
    files.forEach(image => {
        let imagen = image['logo'].replaceAll(" ",'+');
        
        let divImg = 
        `<div class="col">
                <img src="${imagen}" class="gallery-item animate__animated animate__fadeInUp" alt="Cargando Fotos">
            </div>`;

        containerGallery.innerHTML += divImg;
    });
}


function fechaHoraActual(){
    var date = new Date,
    dateFormat = [ date.getFullYear(), date.getMonth()+1, date.getDate()].join('/')+' '+ [date.getHours(), date.getMinutes(),date.getSeconds()].join(':');

    return dateFormat;
}