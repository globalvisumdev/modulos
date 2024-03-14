function toastNotification(respuesta, funcion){

    const toast = document.querySelector(".toastDiv"),
    closeIcon = document.querySelector(".closeIcon"),
    progress = document.querySelector(".progress"),
    estadoOperacion = document.getElementById("estadoOperacion"),
    mensajeOperacion = document.getElementById("mensajeOperacion"),
    logoOperacion = document.getElementById("logoOperacion");
    
    let timer1, timer2, timer3;

    logoOperacion.classList.remove("fa-check")
    logoOperacion.classList.remove("fa-xmark")

    if (respuesta.ok) {
        document.documentElement.style.setProperty("--toast-color", "green");
        logoOperacion.classList.add("fa-check")
        estadoOperacion.innerHTML = "Operacion Exitosa."
        mensajeOperacion.innerHTML = respuesta.errorMsg;

        if (funcion !== undefined) {
            funcion();
        }

    }
    else{
        document.documentElement.style.setProperty("--toast-color", "red");
        logoOperacion.classList.add("fa-xmark")
        estadoOperacion.innerHTML = "Operacion Fallida."
        mensajeOperacion.innerHTML = respuesta.errorMsg;
    }

    toast.classList.remove("hidden");
    
    timer3 = setTimeout(() => {
        toast.classList.add("active");
        progress.classList.add("active");
    }, 1); //1s = 1000 milliseconds

    timer1 = setTimeout(() => {
        toast.classList.remove("active");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 300);
    }, 5000); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
        progress.classList.remove("active");

    }, 5300);
    
   
    closeIcon.addEventListener("click", () => {
        toast.classList.remove("active");
        
        setTimeout(() => {
            progress.classList.remove("active");
        }, 300);

        setTimeout(() => {
            toast.classList.add("hidden");
        }, 300);
    
        clearTimeout(timer1);
        clearTimeout(timer2);
    });

    
}