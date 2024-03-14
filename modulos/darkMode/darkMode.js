const btnSwitch = document.querySelector('#switch');

if(btnSwitch != null){
	btnSwitch.addEventListener('click', () => {
		document.body.classList.toggle('dark');
		btnSwitch.classList.toggle('active') ;
	
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
	if(btnSwitch != null) btnSwitch.classList.add('active');
} else {
	document.body.classList.remove('dark');
	if(btnSwitch != null) btnSwitch.classList.remove('active');
}


