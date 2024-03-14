let inputSearchBar = document.querySelector(".input-searchBar");
let search = document.querySelector(".search");
// closeIcon = document.querySelector(".closeSearchBar")

search.addEventListener("click", () => inputSearchBar.classList.add("open"))
// closeIcon.addEventListener("click", () => inputSearchBar.classList.remove("open"))


function openSearchBar(){
    let headerTitle = document.getElementById("headerTitle");
    let searchBar = document.getElementById("searchBar");

    headerTitle.classList.remove("animate__fadeInUp");
    headerTitle.classList.add("animate__fadeOutDown");
    // setTimeout(()=>{
    //         headerTitle.classList.add("hidden");
    // }, 800)

    searchBar.classList.remove("animate__fadeOutUp");
    searchBar.classList.remove("hidden");
    searchBar.classList.add("animate__fadeInDown");
    setTimeout(()=>{
        searchBar.classList.add("open");
        setTimeout(()=>{
            document.getElementById("search").focus();
        }, 500)
    }, 500)
}

function closeSearchBar(){
    let headerTitle = document.getElementById("headerTitle");
    let searchBar = document.getElementById("searchBar");
    let inputSearch = document.getElementById("search");
    inputSearch.value = ""
    
    searchBar.classList.remove("animate__fadeInDown");
    searchBar.classList.add("animate__fadeOutUp");

    // cargarTabla("asc",0,12);

    setTimeout(()=>{
        searchBar.classList.remove("open");
        searchBar.classList.add("hidden");
    }, 800)
    
    // headerTitle.classList.remove("hidden");
    headerTitle.classList.remove("animate__fadeOutDown");
    headerTitle.classList.add("animate__fadeInUp");

}

function cerrarSearchBar(){
    inputSearchBar.classList.toggle("open");
}