let text = document.querySelector("#sec-text");
let spanText = document.querySelector("sec-text");

const textLoad = () => {
    setTimeout(() => {
        text.textContent = "CONTROL";
        setTimeout(() => {
            spanText.classList.remove("sec-text")
        }, 2000);
    }, 4000);

}

textLoad();