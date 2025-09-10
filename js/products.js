// Mostrar usuario logueado en el navbar
document.addEventListener('DOMContentLoaded', function() {
	const user = localStorage.getItem('usuarioLogueado');
	const userSpan = document.getElementById('navbar-username');
	if (user && userSpan) {
		userSpan.textContent = user;
	}
});
// Carga dinámica de productos según la categoría elegida (catID en localStorage)

let productosOriginales = [];

document.addEventListener('DOMContentLoaded', function() {
	const container = document.getElementById('products-list');
	const catID = localStorage.getItem('catID');

	if (!catID) {
		if (container) {
			container.innerHTML = '<div class="alert alert-warning">No se encontró una categoría seleccionada. Volvé a <a href="categories.html">Categorías</a> y elegí una.</div>';
		}
		return;
	}

	const url = `${PRODUCTS_URL}${catID}${EXT_TYPE}`;
	getJSONData(url)
		.then(result => {
			if (result.status === 'ok') {
				productosOriginales = result.data.products;
				mostrarProductos(productosOriginales);
			} else {
				container.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
			}
		})
		.catch(() => {
			container.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
		});

	// Filtro por precio
	document.getElementById('filterPriceBtn').addEventListener('click', function() {
		filtrarProductos(productosOriginales);
	});
	document.getElementById('clearPriceBtn').addEventListener('click', function() {
		document.getElementById('minPrice').value = '';
		document.getElementById('maxPrice').value = '';
		mostrarProductos(productosOriginales);
	});
});

function mostrarProductos(productos) {
	const contenedor = document.getElementById('products-list');
	contenedor.innerHTML = '';
	if (productos.length === 0) {
		contenedor.innerHTML = '<div class="alert alert-info">No hay productos que coincidan con el filtro.</div>';
		return;
	}
	productos.forEach(prod => {
		contenedor.innerHTML += `
			<div class="product-row">
				<div class="product-card">
					<img src="${prod.image}" alt="${prod.name}" class="product-img">
					<div class="product-info">
						<h5 class="product-title">${prod.name}</h5>
						<p class="product-description">${prod.description}</p>
					</div>
					<div class="product-price-sold">
						<div class="product-price">${prod.currency} ${prod.cost}</div>
						<div class="product-sold">${prod.soldCount} vendidos</div>
					</div>
				</div>
			</div>
		`;
	});
}

function filtrarProductos(productos) {
	let min = document.getElementById('minPrice').value;
	let max = document.getElementById('maxPrice').value;
	min = min !== '' ? parseInt(min) : -Infinity;
	max = max !== '' ? parseInt(max) : Infinity;
	const productosFiltrados = productos.filter(prod => prod.cost >= min && prod.cost <= max);
	mostrarProductos(productosFiltrados);
}

