var hideStory;
//recupera preferencia de addon
addon.port.on('recupero', function (guardado) {
hideStory = guardado;
});

//emite seleccion hacia addon
function save_options() {
	//hideStory = document.getElementById('display_hide').checked ? true : false;
	if(document.getElementById('display_hide').checked) {
		hideStory = 'hide';
	}
	if(document.getElementById('display_fade').checked){
		hideStory = 'fade';
	}
	if (document.getElementById('disable').checked) {
		hideStory = 'disable';
	}

	addon.port.emit('guardar', hideStory);
	//animacion
	var status = document.getElementById('status');
	status.textContent = '✓ Saved';
	setTimeout(function() {
		status.textContent = '';
	}, 1000)
}

function save_options_reload() {
	//hideStory = document.getElementById('display_hide').checked ? true : false;
	if(document.getElementById('display_hide').checked) {
		hideStory = 'hide';
	}
	if(document.getElementById('display_fade').checked){
		hideStory = 'fade';
	}
	if (document.getElementById('disable').checked) {
		hideStory = 'disable';
	}

	addon.port.emit('guardar', hideStory);
	addon.port.emit('recargar', '');
	//animacion
	var status = document.getElementById('status');
	status.textContent = '✓ Saved';
	setTimeout(function() {
		status.textContent = '';
	}, 1000)
}

function restore_options() {
	//document.getElementById('display_hide').checked = hideStory;
	//document.getElementById('display_fade').checked = !hideStory;
	switch (hideStory) {
		case 'hide':
			document.getElementById('display_hide').checked = true;
			break;
		case 'fade':
			document.getElementById('display_fade').checked = true;
			break;
		case 'disable':
			document.getElementById('disable').checked = true;
			break;

	}
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('save_reload').addEventListener('click', save_options_reload);
