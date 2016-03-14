var hideStory;
//recupera preferencia de addon
addon.port.on('recupero', function (guardado) {
hideStory = guardado;
});

//emite seleccion hacia addon
function save_options() {
	hideStory = document.getElementById('display_hide').checked ? true : false;
	addon.port.emit('guardar', hideStory);
	var status = document.getElementById('status');
	status.textContent = '✓ Saved';
	setTimeout(function() {
		status.textContent = '';
	}, 1000)
}

function save_options_reload() {
	hideStory = document.getElementById('display_hide').checked ? true : false;
	addon.port.emit('guardar', hideStory);
	addon.port.emit('recargar', '');
	var status = document.getElementById('status');
	status.textContent = '✓ Saved';
	setTimeout(function() {
		status.textContent = '';
	}, 1000)
}

function restore_options() {
	document.getElementById('display_hide').checked = hideStory;
	document.getElementById('display_fade').checked = !hideStory;
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('save_reload').addEventListener('click', save_options_reload);
