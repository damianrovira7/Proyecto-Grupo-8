// URL de ejemplo para productos de la categoría 101 (Autos)
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

document.addEventListener('DOMContentLoaded', function() {
	fetch(AUTOS_URL)
		.then(response => response.json())
		.then(data => mostrarProductos(data.products))
		.catch(() => {
			document.getElementById('products-list').innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
		});
});

function mostrarProductos(productos) {
	const contenedor = document.getElementById('products-list');
				contenedor.innerHTML = '';
				productos.forEach(prod => {
											contenedor.innerHTML += `
												<div class="col-12">
													<div class="product-card d-flex align-items-center product-row">
														<img src="${prod.image}" alt="${prod.name}" class="product-img">
														<div class="flex-grow-1 product-info">
															<h5 class="mb-1">${prod.name}</h5>
															<p class="mb-0 text-muted">${prod.description}</p>
														</div>
														<div class="product-price-sold">
															<div class="fw-bold">${prod.currency} ${prod.cost}</div>
															<div class="text-muted small">${prod.soldCount} vendidos</div>
														</div>
													</div>
												</div>
											`;
				});
			}
