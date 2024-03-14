const btnTextMultipleSelect = document.getElementById("btnTextMultipleSelect").innerHTML

function startMultipleSelect(){

    const selectBtn = document.querySelector("#select-btn"),
        items = document.querySelectorAll(".item");
    
    if (selectBtn) {
        selectBtn.addEventListener("click", () => {
            selectBtn.classList.toggle("open");
        });
    
    }
    
    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");
    
            let checked = document.querySelectorAll(".checked"),
                btnText = document.querySelector(".btn-text");
    
            if (checked && checked.length > 0) {
                btnText.innerText = `${checked.length} Seleccionados`;
            } else {
                btnText.innerText = btnTextMultipleSelect;
            }
        });
    })
}