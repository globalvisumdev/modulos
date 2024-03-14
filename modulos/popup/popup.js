var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup'),
	inputEditarGrupo = document.getElementById('inputEditarGrupo');

// btnAbrirPopup.addEventListener('click', function(){
// 	overlay.classList.add('active');
// 	popup.classList.add('active');
// });

function openPopup(groupname){
	overlay.classList.add('active');
	popup.classList.add('active');
	inputEditarGrupo.setAttribute("value", groupname);
}

function closePopup(){
	overlay.classList.remove('active');
	popup.classList.remove('active');
	inputEditarGrupo.innerHTML = "";
}

// btnCerrarPopup.addEventListener('click', function(e){
// 	e.preventDefault();
// 	overlay.classList.remove('active');
// 	popup.classList.remove('active');
// 	inputEditarGrupo.innerHTML = "";
// });
