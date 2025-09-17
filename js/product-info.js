document.addEventListener('DOMContentLoaded', function() {
  const productID = localStorage.getItem('productID');
  if (!productID) {
    document.getElementById('product-info').innerHTML = '<div class="alert alert-warning">No se encontró el producto seleccionado.</div>';
    return;
  }
  const url = `${PRODUCT_INFO_URL}${productID}${EXT_TYPE}`;
  getJSONData(url).then(result => {
    if (result.status === 'ok') {
      const prod = result.data;
      document.getElementById('product-name').textContent = prod.name;
      document.getElementById('product-description').textContent = prod.description;
      document.getElementById('product-category').textContent = prod.category;
      document.getElementById('product-sold').textContent = prod.soldCount;
      // Mostrar imágenes
      const imagesDiv = document.getElementById('product-images');
      if (Array.isArray(prod.images)) {
        imagesDiv.innerHTML = prod.images.map(img => `<img src="${img}" class="img-thumbnail m-2 product-img-detail">`).join('');
      } else {
        imagesDiv.innerHTML = '';
      }
    } else {
      document.getElementById('product-info').innerHTML = '<div class="alert alert-danger">No se pudo cargar la información del producto.</div>';
    }
  });
});
