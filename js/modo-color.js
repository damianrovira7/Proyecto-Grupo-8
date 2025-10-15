// Script para alternar modo claro/oscuro y guardar preferencia en localStorage
// Color modo oscuro: #484747

document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const toggleBtn = document.getElementById('toggle-darkmode');
    const DARK_CLASS = 'dark-mode';
    const DARK_COLOR = '#484747';
    const LIGHT_COLOR = '#fff';

    // Aplica el modo guardado
    const savedMode = localStorage.getItem('modoColor');
    if (savedMode === 'oscuro') {
        body.classList.add(DARK_CLASS);
    } else {
        body.classList.remove(DARK_CLASS);
    }

    // Alterna el modo y guarda preferencia
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            if (body.classList.contains(DARK_CLASS)) {
                body.classList.remove(DARK_CLASS);
                localStorage.setItem('modoColor', 'claro');
            } else {
                body.classList.add(DARK_CLASS);
                localStorage.setItem('modoColor', 'oscuro');
            }
        });
    }
});
