const buttonDM = document.querySelector('#darkModeToggle #checkbox');

if(buttonDM != null){
	buttonDM.addEventListener('click', () => {
		document.body.classList.toggle('dark');
		buttonDM.classList.toggle('active') ;
	
		// Guardamos el modo en localstorage.
		if(document.body.classList.contains('dark')){
			localStorage.setItem('dark-mode', 'true');
		} else {
			localStorage.setItem('dark-mode', 'false');
		}
	});
}

// Obtenemos el modo actual.
if(localStorage.getItem('dark-mode') === 'true'){
	document.body.classList.add('dark');
	if(buttonDM != null) buttonDM.checked = true;
} else {
	document.body.classList.remove('dark');
	if(buttonDM != null) buttonDM.checked = false;
}


