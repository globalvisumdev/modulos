
function actionSort(){
    var action = document.querySelector(".actionSB");
    action.classList.toggle("DESC")

    if(action.classList.contains("DESC")){
        sort = "desc"
        cargarTabla(sort,offset,limit);
    }
    else{
        sort = "asc"
        cargarTabla(sort,offset,limit);
    }
}