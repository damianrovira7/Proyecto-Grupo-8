document.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('.login-box form');
	const usuario = document.getElementById('usuario');
	const contrasena = document.getElementById('contrasena');
	const errorDiv = document.getElementById('loginError');
	if (form) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			let valid = true;
			let mensaje = '';

			// Quitar estilos previos y mensaje
			usuario.classList.remove('input-error');
			contrasena.classList.remove('input-error');
			if (errorDiv) errorDiv.textContent = '';
			
			//Valida si no se ingresó usuario ni contraseña
			if (!usuario.value.trim() && !contrasena.value.trim()) {
				usuario.classList.add('input-error');
				contrasena.classList.add('input-error');
				mensaje = 'Debe completar usuario y contraseña.';
				valid = false;
			} else if (!usuario.value.trim()) {	//valida si no se ingresó usuario
				usuario.classList.add('input-error');
				mensaje = 'Debe ingresar el usuario.';
				valid = false;
			} else if (!contrasena.value.trim()) {	//valida si no se ingresó contraseña
				contrasena.classList.add('input-error');
				mensaje = 'Debe ingresar la contraseña.';
				valid = false;
			}

			if (valid) {
				window.location.href = 'index.html';
			} else {
				if (errorDiv) errorDiv.textContent = mensaje;
			}
		});
	}
});

