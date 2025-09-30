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
      //COMENTARIOS CALIFICACIONES Y PRODUCTOS RELACIONADOS
      // Cargar comentarios del producto
      cargarComentarios(productID);

      // Renderizar productos relacionados
      if (Array.isArray(prod.relatedProducts)) {
        renderRelated(prod.relatedProducts);
      }
    } else {
      document.getElementById('product-info').innerHTML = '<div class="alert alert-danger">No se pudo cargar la información del producto.</div>';
    }
  });

  // Manejar envío del formulario de calificación (almacenado local para demo)
  const form = document.getElementById('rating-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const text = document.getElementById('rating-text').value.trim();
      let scoreEl = document.getElementById('rating-score');
      let score = 3;
      if (scoreEl) {
        score = parseInt(scoreEl.value);
      } else {
        const checked = document.querySelector('input[name="rating-score"]:checked');
        if (checked) score = parseInt(checked.value);
      }
      const user = localStorage.getItem('usuarioLogueado') || 'Anónimo';
      if (!score || score < 1 || score > 5) return;
      const newComment = {
        user,
        dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        description: text,
        score
      };
      // Persistencia local básica por producto
      const key = `comments_${productID}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.unshift(newComment);
      localStorage.setItem(key, JSON.stringify(existing));
      // Limpiar y recargar lista
      form.reset();
      cargarComentarios(productID);
    });
  }
});

function estrellas(score) {
  const max = 5;
  let html = '';
  for (let i = 1; i <= max; i++) {
    html += `<span class="fa fa-star ${i <= score ? 'checked' : ''}"></span>`;
  }
  return html;
}

function cargarComentarios(productID) {
  const list = document.getElementById('ratings-list');
  if (!list) return;
  list.innerHTML = '';
  // Intentar cargar desde API si existe COMMENTS_URL
  const commentsKey = `comments_${productID}`;
  const locales = JSON.parse(localStorage.getItem(commentsKey) || '[]');
  // Si el proyecto tiene COMMENTS_URL y EXT_TYPE definidos en init.js, podríamos combinarlos
  const commentsUrl = typeof PRODUCT_INFO_COMMENTS_URL !== 'undefined' ? `${PRODUCT_INFO_COMMENTS_URL}${productID}${EXT_TYPE}` : null;
  if (commentsUrl) {
    getJSONData(commentsUrl).then(res => {
      const apiComments = res.status === 'ok' ? res.data : [];
      renderComments([...locales, ...apiComments]);
    }).catch(() => renderComments(locales));
  } else {
    renderComments(locales);
  }
}

function renderComments(comments) {
  const list = document.getElementById('ratings-list');
  if (!list) return;
  if (!Array.isArray(comments) || comments.length === 0) {
    list.innerHTML = '<div class="text-muted">Sé el primero en calificar este producto.</div>';
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="list-group-item">
      <div class="d-flex justify-content-between">
        <strong>${c.user || 'Usuario'}</strong>
        <span class="text-muted small">${c.dateTime || ''}</span>
      </div>
      <div>${estrellas(c.score || 0)}</div>
      <div>${c.description || ''}</div>
    </div>
  `).join('');
}

function renderRelated(related) {
  const grid = document.getElementById('related-grid');
  if (!grid) return;
  grid.innerHTML = related.map(r => `
    <div class="col-6 col-md-3">
      <div class="card h-100 cursor-active related-card" data-product-id="${r.id}">
        <img src="${r.image}" class="card-img-top" alt="${r.name}">
        <div class="card-body p-2">
          <h6 class="card-title text-center">${r.name}</h6>
        </div>
      </div>
    </div>
  `).join('');
  // navegación a otro producto desde relacionados
  grid.querySelectorAll('.related-card').forEach(card => {
    card.addEventListener('click', function() {
      const id = this.getAttribute('data-product-id');
      localStorage.setItem('productID', id);
      window.location = 'product-info.html';
    });
  });
}
