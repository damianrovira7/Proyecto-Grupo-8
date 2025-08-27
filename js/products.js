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
