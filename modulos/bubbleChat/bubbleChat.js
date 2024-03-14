const startPositionX = -15;
const startPositionY = 35;
const containerMessageChat = document.getElementById(
    "container-message-chat"
);

/* The dragging code for '.draggable' from the demo above */

// enable draggables to be dropped into this
interact(".dropzone").dropzone({
    // only accept elements matching this CSS selector
    accept: ".bubble-message",
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add("trash-dropzone-active");
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add("trash-dropzone-drop-target");
        draggableElement.classList.add("can-delete");
        //   draggableElement.textContent = "Dragged in";
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove("trash-dropzone-drop-target");
        event.relatedTarget.classList.remove("can-delete");
        //   event.relatedTarget.textContent = "Dragged out";
    },
    ondrop: function (event) {
        var draggableElement = event.relatedTarget;
        draggableElement.remove();
        //   event.relatedTarget.textContent = "Dropped";
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove("trash-dropzone-active");
        event.target.classList.remove("trash-dropzone-drop-target");
    },
});

// enable draggables to be dropped into this
interact("#contenedor1").dropzone({
    // only accept elements matching this CSS selector
    accept: ".bubble-message",
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.10,

    ondragenter: function (event) {
        console.log("en zona de contenedor 1")

        interactBubbleMessage.options.drag.modifiers = [restrictContenedor1]
        console.log(interactBubbleMessage.options.drag.modifiers)

    },

    ondragleave: function (event) {
        console.log("fuera de zona de  contenedor 1")

        interactBubbleMessage.options.drag.modifiers = []
        console.log(interactBubbleMessage.options.drag.modifiers)

    },
    ondrop: function (event) {
        console.log("se solto en contenedor 1")

        if( document.querySelectorAll(".bubble-message")[0].parentNode == document.querySelector("#contenedor1")) return

   
        document.querySelectorAll(".bubble-message").forEach(function(bubble) {
            document.querySelector("#contenedor1").appendChild(bubble);
        });

        traslateDefault()

     
    },
   
});

// enable draggables to be dropped into this
interact("#contenedor2").dropzone({
    // only accept elements matching this CSS selector
    accept: ".bubble-message",
    // Require a 75% element overlap for a drop to be possible
    overlap: 100,

    ondragenter: function (event) {
        console.log("en zona de contenedor 2")

        interactBubbleMessage.options.drag.modifiers = [restrictContenedor2]
        console.log(interactBubbleMessage.options.drag.modifiers)

    },

    ondragleave: function (event) {
        console.log("fuera de zona del contenedor 2")
        
        interactBubbleMessage.options.drag.modifiers = []
        console.log(interactBubbleMessage.options.drag.modifiers)

    },
    ondrop: function (event) {
        console.log("se solto en contenedor 2")
        if( document.querySelectorAll(".bubble-message")[0].parentNode == document.querySelector("#contenedor2")) return


        document.querySelectorAll(".bubble-message").forEach(function(bubble) {
            document.querySelector("#contenedor2").appendChild(bubble);
        });


        traslateDefault()
      

    },
   
});

function traslateDefault(){

    let bubbles = [
        ...document.querySelectorAll(".bubble-message"),
    ].reverse();

    bubbles.forEach((bubble, index) => {
        bubble.classList.add("bubble-message-transition-transform");

        let numeroElemento = index + 1;
        let desplazamientoX = 0;
        let desplazamientoY = 0;

        setTimeout(() => {
            translateBubble({
                bubble,
                desplazamientoX,
                desplazamientoY,
            });

            setTimeout(() => {
                bubble.classList.remove("bubble-message-transition-transform");
            }, 1000);
        }, numeroElemento * 50); // Ajusta el valor de retraso según tus necesidades
    });
}

var restrictContenedor1 = interact.modifiers.restrict({
    restriction: "#contenedor1",
    endOnly: true,
    // elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  });

  var restrictContenedor2 = interact.modifiers.restrict({
    restriction: "#contenedor2",
    endOnly: true,
    // elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  });


var interactBubbleMessage = interact(".bubble-message")
    .draggable({
        inertia: true,
        modifiers: [
            //  interact.modifiers.restrictRect({
            //     restriction: 'parent',
            //     endOnly: true,
            //     elementRect: { left: 0, right: 0, top: 1, bottom: 1 },
            // }),

            // interact.modifiers.restrictRect({
            //     restriction: 'window',
            //     endOnly: false,
            //     elementRect: { left: 0, right: 0, top: 1, bottom: 1 },
            // }),

            // interact.modifiers.restrict({
            //     restriction: function (x, y, element) {
            //         // Comprueba si el elemento está dentro de alguno de los contenedores
            //         var container1 = document.querySelector('#contenedor1'),
            //         container2 = document.querySelector('#contenedor2');

            //         var isInsideContainer1 = container1.contains(element.element),
            //             isInsideContainer2 = container2.contains(element.element);

            //         // Si el elemento está dentro de alguno de los contenedores, permite el movimiento
            //         if (isInsideContainer1 ) return container1;
            //         if (isInsideContainer2 ) return container2;

            //         // Si no, restringe el movimiento
            //         return false;
            //     },
            //     endOnly: true,
            //     // elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            // }),


            // interact.modifiers.restrict({
            //     restriction: ".contenedor",
            //     endOnly: true,
            //     // elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            //   }),

            // restrictContenedor2
            
        ],

        autoScroll: false,
        // dragMoveListener from the dragging demo above
        listeners: {
            start: () => {
                console.log("comenzo el movimiento")
                // interactBubbleMessage.options.drag.modifiers = []
            },
            move: dragMoveListener,
        },
    })
    .on("tap", function (event) {
        setStartPosition({
            openChat: true,
        });
    });


function dragMoveListener(event) {
    interactBubbleMessage.options.drag.modifiers = []

    var target = event.target;
    if (target && target.id != "bubble-1") return;
    containerMessageChat.classList.remove("container-message-chat-active");

    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    let targetElement = document.getElementById(target.id);

    // var rect = target.getBoundingClientRect();
    // var windowWidth = window.innerWidth;

    // // Verifica si el elemento está en el borde izquierdo o derecho
    // var isAtLeftEdge = rect.left <= 0;
    // var isAtRightEdge = rect.right >= windowWidth;

    // // Aplica la restricción solo si está en el borde izquierdo o derecho
    // if (isAtLeftEdge || isAtRightEdge) {
    //     // Calcula los límites izquierdo y derecho basándote en tus guías
    //     var leftLimit = isAtRightEdge ? windowWidth - rect.width : 0;
    //     var rightLimit = isAtRightEdge ? windowWidth : rect.width;

    //     // Restringe el movimiento solo entre los límites izquierdo y derecho
    //     x = Math.min(Math.max(x, leftLimit), rightLimit);
    // }


    translateBubble({
        bubble: targetElement,
        desplazamientoX: x,
        desplazamientoY: y,
    });

    let bubbles = [
        ...document.querySelectorAll(".bubble-message:not(#bubble-1)"),
    ].reverse();

    bubbles.forEach((bubble, index) => {
        // introduce un pequeño retraso incremental para cada burbuja
        let numeroElemento = index + 1;
        let desplazamientoX = numeroElemento * 7 + x;
        let desplazamientoY = y;

        setTimeout(() => {
            // translate the element
            translateBubble({
                bubble,
                desplazamientoX,
                desplazamientoY
            });
        }, numeroElemento * 50); // Ajusta el valor de retraso según tus necesidades
    });
}

function translateBubble({
    bubble,
    desplazamientoX,
    desplazamientoY
}) {
    // translate the element
    bubble.style.transform =
        "translate(" + desplazamientoX + "px, " + desplazamientoY + "px)";

    // update the position attributes
    bubble.setAttribute("data-x", desplazamientoX);
    bubble.setAttribute("data-y", desplazamientoY);
}

function setStartPosition({
    openChat
}) {
    let bubbles = [
        ...document.querySelectorAll(".bubble-message"),
    ].reverse();

    bubbles.forEach((bubble, index) => {
        bubble.classList.add("bubble-message-transition-transform");

        let numeroElemento = index + 1;
        let desplazamientoX;
        if (openChat) {
            desplazamientoX = startPositionX - (numeroElemento - 1) * 110; // agregar un desplazamiento a los otros elementos

            setTimeout(() => {
                containerMessageChat.classList.add(
                    "container-message-chat-active"
                );

            }, 600);
        } else {
            desplazamientoX = startPositionX + (numeroElemento - 1) * 7; // agregar un desplazamiento a los otros elementos
            containerMessageChat.classList.remove(
                "container-message-chat-active"
            );
        }
        let desplazamientoY = startPositionY;

        setTimeout(() => {
            translateBubble({
                bubble,
                desplazamientoX,
                desplazamientoY,
            });

            setTimeout(() => {
                bubble.classList.remove("bubble-message-transition-transform");
            }, 1000);
        }, numeroElemento * 50); // Ajusta el valor de retraso según tus necesidades
    });
}

function obtenerCoordenadas(elemento, vertical, horizontal) {
    // Obtiene las dimensiones y la posición del elemento
    var rect = elemento.getBoundingClientRect();
  
    // Inicializa las coordenadas en el centro del elemento
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;
  
    // Ajusta las coordenadas según la especificación
    if (vertical === 'superior') {
      y = rect.top;
    } else if (vertical === 'inferior') {
      y = rect.bottom;
    }
  
    if (horizontal === 'izquierda') {
      x = rect.left;
    } else if (horizontal === 'derecha') {
      x = rect.right;
    }
  
    return { x: x, y: y };
  }
  