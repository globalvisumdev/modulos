async function getTables() {
    const tablas = await fetch("./components/auditoria/conectionDB_cmd.php",{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `cmd=getTables`
    })
    .then( peticion => peticion.json() )
    .then( res=>{
        if (res.ok) {
            return res.data;
        }
    });
    return tablas;
}

var tablas = [];

async function main() {
    const data = getTables();
    await data.then(res => {res.forEach(table => tablas.push(table))});
}

main();

setTimeout(() => {
    //Crear la variable que almacenará la instancia de la base de datos
    let db

    // Alamacenar el api en una variable
    const indexedDb = window.indexedDB;

    //Crear la conexión a la base de datos e indicar la versión
    const conexion = indexedDb.open("audicontrol_mendoza",1)

    //Evento que se dispara cuando la base de datos se abré
    conexion.onsuccess = () =>{
        db = conexion.result
        // console.log('Base de datos abierta', db)
        console.log('Base de datos abierta')
    }

    //Evento que se dispara cuando la base de datos no se puede abrir
    conexion.onerror = (error) =>{
        console.log('Error ', error)
    }

    //Evento que se dispara cuando la base de datos se crea o se actualiza
    conexion.onupgradeneeded = (e) =>{
        var db = e.target.result
        console.log('Base de datos creada', db)

        for (let i = 0; i < tablas.length; i++) {
            const coleccionObjetos = db.createObjectStore(tablas[i],{
                keyPath: 'clave' /* Nombre del campo, dentro del registro, qué será la identificación única */
            })
        }
    }
}, 100);