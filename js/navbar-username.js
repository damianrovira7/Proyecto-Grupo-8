// Mostrar usuario logueado en el navbar en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('usuarioLogueado');
    const userSpan = document.getElementById('navbar-username');
    if (user && userSpan) {
        userSpan.textContent = user;
    }
});
