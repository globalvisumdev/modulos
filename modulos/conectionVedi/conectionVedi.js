function validarTokenSesion(){

    fetch("./conectionVedi.php",{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: ''
    })
    .then( peticion => peticion.json() )
    .then( res=>{

        console.log(res)

    })
    .catch(e => {
        // toastNotification({ok: false, errorMsg: "Ha ocurrido un error de conexión."});
    })
}
validarTokenSesion();

