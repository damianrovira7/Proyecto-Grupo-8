// Precargar email y datos de perfil
document.addEventListener('DOMContentLoaded', function() {
	const emailInput = document.getElementById('profileEmail');
	const nameInput = document.getElementById('profileName');
	const phoneInput = document.getElementById('profilePhone');
	const form = document.getElementById('profile-form');
	const msg = document.getElementById('profile-msg');

	// Precargar email del usuario logueado la primera vez
	let email = localStorage.getItem('usuarioLogueado');
	let profile = JSON.parse(localStorage.getItem('perfilUsuario') || '{}');
	if (email && (!profile.email)) {
		profile.email = email;
		localStorage.setItem('perfilUsuario', JSON.stringify(profile));
	}
	if (profile.email) emailInput.value = profile.email;
	if (profile.name) nameInput.value = profile.name;
	if (profile.phone) phoneInput.value = profile.phone;

	// Guardar datos del perfil 
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		profile.email = emailInput.value;
		profile.name = nameInput.value;
		profile.phone = phoneInput.value;
		localStorage.setItem('perfilUsuario', JSON.stringify(profile));
		msg.textContent = 'Datos guardados correctamente.';
		msg.className = 'alert alert-success';
	});
	// Mostrar imagen seleccionada en el preview
	const imageInput = document.getElementById('profileImage');
	const imagePreview = document.getElementById('profile-preview');
		// Mostrar imagen guardada en localStorage al cargar
		const savedImg = localStorage.getItem('perfilImg');
		if (savedImg) {
			imagePreview.src = savedImg;
		}
		imageInput.addEventListener('change', function(e) {
			const file = e.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = function(ev) {
					imagePreview.src = ev.target.result;
					localStorage.setItem('perfilImg', ev.target.result);
				};
				reader.readAsDataURL(file);
			} else {
				imagePreview.src = 'img/img_perfil.png';
				localStorage.removeItem('perfilImg');
			}
		});
});
