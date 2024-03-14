var popup = document.getElementById("popup"),
  tituloPopUp = document.getElementById("tituloPopUp"),
  imgPopUp = document.getElementById("imgPopUp"),
  detailsPopup = document.getElementById("detailsPopup"),
  formNuevoServicio = document.getElementById("formNuevoServicio");

if (formNuevoServicio) {
  formNuevoServicio.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

const closePopup = () => {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("popup").classList.remove("active");
};

var funcionBtnNuevoServicio = {
  bicicleta: () => {
    closePopup();
  },
};

var funcionBtnCancelarServicio = {
  bicicleta: () => {
    closePopup();
  },
};

var bodyPopUp = {};

function openPopUp(data) {
  //   console.log(data);

  document.querySelectorAll(".contentPopUp").forEach((div) => {
    div.classList.add("hidden");
  });

  document.getElementById("btnNuevoServicio").classList.add("hidden");
  document.getElementById("btnCancelarServicio").classList.add("hidden");

  bodyPopUp[data.tipoMarcador](data);
  document
    .getElementById("btnNuevoServicio")
    .setAttribute(
      "onclick",
      `funcionBtnNuevoServicio['${data.tipoMarcador}']()`
    );
  document
    .getElementById("btnCancelarServicio")
    .setAttribute(
      "onclick",
      `funcionBtnCancelarServicio['${data.tipoMarcador}']()`
    );

  document
    .querySelector(`#popup_${data.tipoMarcador}`)
    .classList.remove("hidden");
  document.getElementById("overlay").classList.add("active");
  document.getElementById("popup").classList.add("active");
}

// buttons = {
//     aceptar: {
//         visible: false,
//         action: functionAceptar,
//     },
//     cancelar: {
//         visible: false,
//         action: functionCancelar,

//     },
// }

function popUpFunctions({ tipoPopUp, functionPopup, buttons = null }) {
  bodyPopUp[tipoPopUp] = (data) => {
    functionPopup(data);

    if (buttons && (buttons.aceptar.visible || buttons.cancelar.visible)) {
      document.getElementById("formNuevoServicio").classList.remove("hidden");
    }

    if (buttons && buttons.aceptar.visible) {
      document.getElementById("btnNuevoServicio").classList.remove("hidden");

      funcionBtnNuevoServicio[tipoPopUp] = (data) => {
        buttons.aceptar.action(data);
      };
    }

    if (buttons && buttons.cancelar.visible) {
      document.getElementById("btnCancelarServicio").classList.remove("hidden");

      funcionBtnCancelarServicio[tipoPopUp] = (data) => {
        buttons.cancelar.action(data);
      };
    }
  };
}
