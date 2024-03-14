var calificaciones;
var action;
var dataAction;
var containerStars


containerStars = document.getElementById("containerStars")

function starRating(califications) {

    let calificationsTitle = Object.keys(califications)

    calificationsTitle.forEach(title => {
        let descripcion = califications[title];
        let divContainer = `
        <div class="divCalificaciones" id="calificacion_${title}">
            <div class="detalleCalificacion"><b>${title}:</b> ${descripcion}</div>
            <div class="star-wrapper">
                <a href="#" class="fas fa-star s1" onclick="setStarCalification(this)" rate="5"></a>
                <a href="#" class="fas fa-star s2" onclick="setStarCalification(this)" rate="4"></a>
                <a href="#" class="fas fa-star s3" onclick="setStarCalification(this)" rate="3"></a>
                <a href="#" class="fas fa-star s4" onclick="setStarCalification(this)" rate="2"></a>
                <a href="#" class="fas fa-star s5" onclick="setStarCalification(this)" rate="1"></a>
            </div>
        </div> 
        `;

        containerStars.innerHTML += divContainer

    });


}

function setStarCalification(starElement) {
    starElement.parentNode.querySelectorAll("a, svg").forEach(star => {
        star.classList.remove("activeStar")
    })

    starElement.classList.add("activeStar")

}


function elegirEmoji(divEmoji) {
    document.querySelectorAll(".emoji").forEach(emoji => {

        if (divEmoji == emoji) {
            emoji.classList.remove("disabledLottie")
            divEmoji.classList.add("activeLottie")
        } else {
            emoji.classList.add("disabledLottie")
            emoji.classList.remove("activeLottie")

        }
    });


}




function resetCalificaciones() {
    document.getElementById("comentario").value = "";

    document.querySelectorAll(".activeLottie, .disabledLottie").forEach(iconoEmoticon => {
        iconoEmoticon.classList.remove("activeLottie")
        iconoEmoticon.classList.remove("disabledLottie")
    })

    document.querySelectorAll(".activeStar").forEach(iconStar => {
        iconStar.classList.remove("activeStar")
    })


}





document.querySelectorAll(".emoji").forEach(emoji => {
    emoji.addEventListener("click", () => {
        elegirEmoji(emoji)
    })
});