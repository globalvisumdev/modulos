// obtiene un parametro de la url
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&$]" + name + "(=([^&#$]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// obtener fecha y hora actual con formato yyyy/mm/dd hh:mm:ss 



function fechaHoraActual() {
    // formatear fecha actual para pasarlo a BD
    var date = new Date,
        dateFormat = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

    return dateFormat;
}


function formatFecha(fecha) {
    // formatear fecha para pasarlo a BD
    var date = new Date(fecha),
        dateFormat = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

    return dateFormat;
}


function formatDate(fecha){
    // formatear fecha para mostrarlo en el html en formato dd/mm/aaaa, hh:mm:ss

    let fechaFormat   = new Date(fecha);
    let options = {month: '2-digit', day: '2-digit',  year: '2-digit', hour: '2-digit',minute: '2-digit',second: '2-digit',hour12: false };
    fechaFormat = fechaFormat.toLocaleDateString("es-US", options)

    return fechaFormat

}

// Arma el body con los valores de los inputs y selects 

function makeBodyValue(cmd, formId) {
    let bodyValue = `${cmd}`;

    let inputs = document.querySelectorAll(`#${formId} input, #${formId} textarea`);
    let selects = document.querySelectorAll(`#${formId} select`);

    inputs.forEach(input => {
        if (input.type != "file") bodyValue += `&form[${input.id}]=${input.value}`
    });

    selects.forEach(select => {
        // bodyValue += `&form[${select.id}]=${select.options[select.selectedIndex].value}`
        bodyValue += `&form[${select.id}]=${select.value}`
    });

    return bodyValue

}

function makeBodyPost(cmd, formId) {
    let bodyValue = `${cmd}`;

    let inputs = document.querySelectorAll(`#${formId} input, #${formId} textarea`);
    let selects = document.querySelectorAll(`#${formId} select`);

    inputs.forEach(input => {
        if (input.type != "file") bodyValue += `&${input.id}=${input.value}`
    });

    selects.forEach(select => {
        bodyValue += `&${select.id}=${select.value}`
    });

    return bodyValue

}



// redireccionar a una pagina agregando efecto de salida

// function redirect(pagina, idContenido = "contenido", animacionActual = 'animate__fadeInDown', animacionSalida ='animate__fadeOutUp') {
//     let contenido = document.getElementById(idContenido);
//     contenido.classList.remove(animacionActual);
//     contenido.classList.add(animacionSalida);

//     setTimeout(() => {
//          setTimeout(() => {
//             contenido.classList.replace(animacionSalida,animacionActual);
//         }, 500);
//         window.location = pagina;
//     }, 600);
// }


//obtiene las opciones elegidas de un select multiple

function getSelectValues(selectId) {
    let select = document.getElementById(selectId);
    let optionsSelected = [];
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].selected == true) {
            optionsSelected.push(select.options[i].value)
        }
    }
    return optionsSelected;

}

//valida los select/input de un formulario y muestra una notificacion en caso de que falten campos

function validarFormulario(formularioId, funcion, funcionParam = undefined) {
    var validado = true;
    elementos = document.querySelectorAll(`#${formularioId} select, #${formularioId} input`);
    for (i = 0; i < elementos.length; i++) {
        if ((((elementos[i].value == "" || elementos[i].value == null) && elementos[i].type != 'checkbox' && !elementos[i].classList.contains("hidden")) ||
                (elementos[i].type == 'checkbox' && elementos[i].checked == false)) &&
            elementos[i].type != 'file' && elementos[i].id != 'search') {

            validado = false;
            elementos[i].focus();
            break;
        }
    }
    if (validado && funcion) {
        funcion(funcionParam);
    } else {
        toastNotification({
            ok: false,
            errorMsg: "Faltan Campos por completar"
        });
    }
}

//valida los select/input de un formulario devuelve true o false

function validarFormularioSM(formularioId) {
    var validado = true;
    elementos = document.querySelectorAll(`#${formularioId} select, #${formularioId} input`);
    for (i = 0; i < elementos.length; i++) {
        if ((elementos[i].value == "" || elementos[i].value == null) && elementos[i].type != 'file') {
            validado = false;
            elementos[i].focus();
            return false;
        }
    }
    if (validado) {
        return true;
    }

}

//recibe un objeto como parametro y segun los key busca los inputs o selects y les pone el Value, el id del select/input
// tiene que ser el mismo que la key del objeto ej: {nombre: martin} -> id="nombre"
function llenarCamposTabla(objData) {
    return new Promise(resolve => {
        for (let i = 0; i < Object.keys(objData).length; i++) {
            let id = Object.keys(objData)[i];
            if (document.getElementById(id) != null && objData[id] != null) {
                if (id == "fecha_desde_reporte" || id == "validez_desde" || id == "validez_hasta") {
                    let formatDate = (objData[id]).substr(0, 10);
                    if (!formatDate.includes(0)) {
                        document.getElementById(id).value = formatDate;
                    }
                } else {
                    document.getElementById(id).value = objData[id];

                }
            }
        }
        resolve()
    })
}

function llenarCamposTexto(objData) {
    for (let i = 0; i < Object.keys(objData).length; i++) {
        let id = Object.keys(objData)[i];
        if (document.getElementById(id) != null && objData[id] != null) {
            document.getElementById(id).innerHTML += objData[id];
        }
    }
}





//limpia todos los select/inputs de la pagina actual
function limpiarFormulario() {
    document.querySelectorAll("select").forEach(select => select.value = "");
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("textarea").forEach(textarea => textarea.value = "");
}

// Llena los datos de una tabla, recibe como parametro el id de la tabla, un objeto que contiene los datos y un array con los key
// del objeto, permite 2 keys ej: [["apellido","nombre"], "dni", telefono] || botones disponibles: "btnEliminar" "btnEditar",

function llenarDatosTabla(idTabla, objetoDatos, datosTabla, botones = {}, adicional = false) {

    let tabla = document.getElementById(idTabla);
    tabla.innerHTML = "";

    var docFragment = document.createDocumentFragment();

    for (let i = 0; i < objetoDatos.length; i++) {
        let tr = document.createElement("tr");
        tr.classList.add("uppercase");
        if (adicional == "bicicleta") {
            tr.setAttribute("onclick", `openPopUpBicicleta(${objetoDatos[i]["id"]},'${objetoDatos[i]["nombre"]}','${objetoDatos[i]["apellido"]}')`);
        }
        if (adicional == "conductores") {
            esMuni ?
                tr.setAttribute("onclick", `window.open('conductores.php?id=${objetoDatos[i]["id"]}&estado=${objetoDatos[i]["estado"]}')`) :
                // tr.setAttribute("onclick",`redirect('conductores.php?id=${objetoDatos[i]["id"]}&estado=${objetoDatos[i]["estado"]}')`);
                tr.setAttribute("onclick", `modificarConductor('${objetoDatos[i]["id"]}','${objetoDatos[i]["estado"]}')`);

        }

        let thOrden = document.createElement("th");
        thOrden.innerHTML = i + 1;
        tr.appendChild(thOrden);

        datosTabla.forEach(dato => {
            let td = document.createElement("td");
            if (Array.isArray(dato)) {
                td.innerHTML = objetoDatos[i][dato[0]] + ", " + objetoDatos[i][dato[1]];
            } else {
                td.innerHTML = objetoDatos[i][dato];
            }

            tr.appendChild(td);
        });


        if (Object.keys(botones).length != 0) {
            Object.keys(botones).forEach(boton => {
                let td = document.createElement("td");
                let btn = document.createElement("button");
                let icono = document.createElement("i");

                btn.classList.add("btn");
                btn.classList.add("btn-sm");

                if (boton == "btnEliminar") {
                    btn.classList.add("btn-danger");
                    btn.setAttribute("title", "Eliminar");
                    // btn.setAttribute("onclick", botones.btnEliminarFunct );
                    btn.setAttribute("onclick", `eliminarPermiso(${objetoDatos[i][botones.btnEliminar]})`);
                    icono.classList.add("fa-solid");
                    icono.classList.add("fa-trash");
                }

                if (boton == "btnEditar") {
                    btn.classList.add("btn-info");
                    btn.setAttribute("title", "Editar");
                    // btn.setAttribute("onclick", botones.btnEditar );
                    btn.setAttribute("onclick", `eliminarPermiso(${objetoDatos[i][botones.btnEditar]})`);
                    icono.classList.add("fa-solid");
                    icono.classList.add("fa-pencil");
                }


                btn.appendChild(icono);
                td.appendChild(btn);
                tr.appendChild(td);

            });
        }

        docFragment.appendChild(tr)
    }
    tabla.appendChild(docFragment);

}


// carga las opciones de un select recibe un array para el nameoption ["nombre","apellido"] o simplemente un dato "nombre"

function cargarOpcionesSelect(selectId, objetoDatos, idOption, nameOption, optionDefault = true, extraAtribute = false) {
    let select = document.getElementById(selectId);
    select.innerHTML = "";

    if (optionDefault) {
        let option = document.createElement("option");
        option.setAttribute("selected", "");
        option.setAttribute("disabled", "");
        option.setAttribute("value", "");
        option.innerHTML = "Seleccione una opción"
        select.appendChild(option);
    }
    if (selectId == "dataEmprAct" || selectId == "dataJurisAct" || selectId == "dataVehiAct" || selectId == "dataServAct") {
        let option = document.createElement("option");
        option.setAttribute("disabled", "");
        option.innerHTML = "Dejar vacio implica que todos esten permitidos."
        select.appendChild(option);
    }

    var docFragment = document.createDocumentFragment();

    for (let j = 0; j < objetoDatos.length; j++) {

        let option = document.createElement("option");
        option.setAttribute("value", objetoDatos[j][idOption]);


        if (Array.isArray(extraAtribute)) {
            extraAtribute.forEach(atributo => {
                option.setAttribute(atributo, objetoDatos[j][atributo]);
            })
        } else option.setAttribute(extraAtribute, objetoDatos[j][extraAtribute]);


        if (Array.isArray(nameOption)) {
            option.innerHTML = objetoDatos[j][nameOption[0]] + ", " + objetoDatos[j][nameOption[1]];
        } else {
            option.innerHTML = objetoDatos[j][nameOption];
        }
        docFragment.appendChild(option)
    }


    select.appendChild(docFragment);

}

function devuelvesesionid() {
    const getUrl = new URLSearchParams(window.location.search)
    sesionid = getUrl.get('sesionid')
    return sesionid
}


// Crea una tabla doble para los casos de quitar/agregar
function crearTabla(datosTabla) {


    let table = document.createElement("table");
    table.classList.add("table");

    let thead = document.createElement("thead");
    thead.classList.add("table-dark");

    let trHead = document.createElement("tr");


    for (let i = 0; i < 3; i++) {
        let th = document.createElement("th");
        th.setAttribute("scope", "col");

        if (i != 1) {
            th.classList.add("columnTitle")
            th.innerHTML = (i == 0 ? "Permitidos" : "Disponibles");
        } else {
            let icono = document.createElement("i");
            icono.classList.add("fa-solid");
            icono.classList.add(datosTabla.tituloColumna[1]);
            th.appendChild(icono);
        }
        trHead.appendChild(th);
    }

    thead.appendChild(trHead);


    let tbody = document.createElement("tbody");

    let trBody = document.createElement("tr");

    let selectNumber = 0;
    for (let j = 0; j < 3; j++) {
        if (j != 1) {
            let td = document.createElement("td");

            let select = document.createElement("select");
            select.classList.add("form-select");
            select.setAttribute("size", "10");
            select.setAttribute("multiple", "");
            select.setAttribute("aria-label", "multiple select example");
            select.setAttribute("id", datosTabla.idSelect[selectNumber]);
            select.setAttribute("idoption", datosTabla.optId);
            select.setAttribute("nameoption", datosTabla.optName);


            td.appendChild(select);

            trBody.appendChild(td);
            selectNumber++;
        } else {
            let td = document.createElement("td");
            td.classList.add("align-middle");

            for (let m = 0; m < 2; m++) {
                let div = document.createElement("div");
                let button = document.createElement("button");
                button.classList.add("btn");
                button.classList.add("btn-sm");

                let icono = document.createElement("i");

                if (m == 0) {
                    button.classList.add("btn-success");
                    button.setAttribute("title", "Agregar");
                    button.setAttribute("onclick", datosTabla.btnAction[m])

                    icono.classList.add("fa-solid");
                    icono.classList.add("fa-circle-left");
                } else {
                    button.classList.add("btn-danger");
                    button.setAttribute("title", "Quitar");
                    button.setAttribute("onclick", datosTabla.btnAction[m])

                    icono.classList.add("fa-solid");
                    icono.classList.add("fa-circle-right");
                }

                button.appendChild(icono);
                div.appendChild(button);
                td.appendChild(div);
            }
            trBody.appendChild(td);
        }

    }
    tbody.appendChild(trBody);


    table.appendChild(thead);
    table.appendChild(tbody);
    var acordionItem = crearAcordionItem(datosTabla.tituloColumna[0], datosTabla.tituloColumna[1], table);
    accordion.appendChild(acordionItem);

    cargarOpciones(datosTabla.idSelect, datosTabla.optId, datosTabla.optName);
}




// const formulario = document.getElementById('formulario');
// const inputs = document.querySelectorAll('#formulario input');
// const selects = document.querySelectorAll('#formulario select');


// const expresiones = {
//     usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
//     nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
//     contraseña: /^.{4,12}$/, // 4 a 12 digitos.
//     email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//     telefono: /^\d{7,14}$/ // 7 a 14 numeros.
// }

// const campos =  {
//     apellido: false,
//     nombre: false,
//     usuario: false,
//     contraseña: false,
//     email: true,
//     telefono: true,
//     cliente: false,
//     grupo: false
// }

// const validarFormulario = (e) => {
//     switch (e.target.id){
//         case "apellido":
//             validarCampo(expresiones.nombre, e.target);
//         break;

//         case "nombre":
//             validarCampo(expresiones.nombre, e.target);            
//         break;

//         case "usuario":
//             validarCampo(expresiones.usuario, e.target);            
//         break;

//         case "contraseña":
//             validarCampo(expresiones.contraseña, e.target);
//             validarContraseña();
//         break;

//         case "confirmarContraseña":
//             validarContraseña();
//         break;

//         case "email":
//             validarCampo(expresiones.email, e.target);
//         break;

//         case "telefono":
//             validarCampo(expresiones.telefono, e.target);
//         break;

//         case "cliente":
//             validarSelect(e.target);
//         break;

//         case "grupo":
//             validarSelect(e.target);
//         break;

//     }
// }

// const validarCampo = (expresion, input) => {
//     if(expresion.test(input.value)){
//         document.getElementById(input.id).classList.add("is-valid");
//         document.getElementById(input.id).classList.remove("is-invalid");
//         document.querySelector(`#grupo${input.id} div`).classList.add('inputError');
//         document.querySelector(`#grupo${input.id} div`).classList.remove('invalid-tooltip');
//         campos[input.id] = true;
//     }
//     else{
//         document.getElementById(input.id).classList.remove("is-valid");
//         document.getElementById(input.id).classList.add("is-invalid");
//         document.querySelector(`#grupo${input.id} div`).classList.remove('inputError');
//         document.querySelector(`#grupo${input.id} div`).classList.add('invalid-tooltip');
//         campos[input.id] = false;
//     }
// }

// const validarContraseña = () => {
//     const inputContraseña1 = document.getElementById("contraseña").value;
//     const inputContraseña2 = document.getElementById("confirmarContraseña").value;

//     if(inputContraseña1 != inputContraseña2){
//         document.getElementById(`confirmarContraseña`).classList.remove("is-valid");
//         document.getElementById(`confirmarContraseña`).classList.add("is-invalid");
//         document.querySelector(`#grupoconfirmarContraseña div`).classList.remove('inputError');
//         document.querySelector(`#grupoconfirmarContraseña div`).classList.add('invalid-tooltip');
//         campos["contraseña"] = false;
//     }
//     else{
//         document.getElementById(`confirmarContraseña`).classList.add("is-valid");
//         document.getElementById(`confirmarContraseña`).classList.remove("is-invalid");
//         document.querySelector(`#grupoconfirmarContraseña div`).classList.add('inputError');
//         document.querySelector(`#grupoconfirmarContraseña div`).classList.remove('invalid-tooltip');
//         campos["contraseña"] = true;
//     }
// }

// const validarSelect = (select) => {
//     const selectIndex = document.getElementById(select.id).selectedIndex;
//     if(selectIndex != 0){
//         document.getElementById(select.id).classList.add("is-valid");
//         document.getElementById(select.id).classList.remove("is-invalid");
//         document.querySelector(`#grupo${select.id} div`).classList.add('inputError');
//         document.querySelector(`#grupo${select.id} div`).classList.remove('invalid-tooltip');
//         campos[select.id] = true;
//     }
//     else{
//         document.getElementById(select.id).classList.remove("is-valid");
//         document.getElementById(select.id).classList.add("is-invalid");
//         document.querySelector(`#grupo${select.id} div`).classList.remove('inputError');
//         document.querySelector(`#grupo${select.id} div`).classList.add('invalid-tooltip');
//         campos[select.id] = false;
//     }

// }

// function limpiarFormulario(){
//     document.querySelectorAll("select").forEach(select => select.classList.remove("is-valid"));
//     document.querySelectorAll("input").forEach(select => select.classList.remove("is-valid"));
// }

// inputs.forEach( (input)=> { 
//     input.addEventListener('keyup', validarFormulario);
//     input.addEventListener('blur', validarFormulario);
// })


// selects.forEach( (select)=> { 
//     select.addEventListener('click', validarFormulario);
//     select.addEventListener('change', validarFormulario);
//     // select.addEventListener('blur', validarFormulario);
// })

// formulario.addEventListener('submit', (e) => {
//     e.preventDefault();


//     if(campos.apellido && campos.nombre && campos.usuario && campos.contraseña && campos.email &&
//        campos.telefono && campos.cliente && campos.grupo && campos.grupo){
//         formulario.reset();
//         limpiarFormulario();

//         alert("datos enviados")

//     }
//     else{
//         alert("faltan campos por completar")
//     }

// });