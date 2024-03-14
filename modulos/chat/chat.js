const chatContent = document.getElementById("chatContent");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const inputChat = document.getElementById("inputChat");

// sendMessageBtn.addEventListener("click", enviarMensaje);


function enviarMensaje(mensaje) {
    const message = document.createElement("div");
    message.classList.add("message", "sentMessage");
    message.innerHTML = mensaje;
    chatContent.appendChild(message);
    chatContent.scrollTop = chatContent.scrollHeight;
    inputChat.value = "";

}

// function recibirMensaje(mensaje) {

//     const responseMessage = document.createElement("div");
//     responseMessage.classList.add("message", "responseMessage");
//     responseMessage.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`;
//     chatContent.appendChild(responseMessage);
//     chatContent.scrollTop = chatContent.scrollHeight;

//     setTimeout(() => {
//         responseMessage.innerHTML = mensaje;
//         chatContent.scrollTop = chatContent.scrollHeight;
//     }, 1500);

// }

function recibirMensaje(mensaje) {

    const responseMessage = document.createElement("div");
    responseMessage.classList.add("message", "responseMessage");
    responseMessage.innerHTML = mensaje;
    chatContent.appendChild(responseMessage);
    chatContent.scrollTop = chatContent.scrollHeight;

}