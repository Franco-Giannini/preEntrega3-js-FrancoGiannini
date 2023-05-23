  
  const contenedorProductos = document.getElementById("productos");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  
  // Cargar productos disponibles en el DOM
  function mostrarProductos() {
    contenedorProductos.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const divProducto = document.createElement("div");
      divProducto.className = "producto";
      divProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <button class="agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
      `;
      contenedorProductos.appendChild(divProducto);
    }
  }
  
  // Agregar producto al carrito
  function agregarProductoAlCarrito(event) {
    const id = parseInt(event.target.dataset.id);
    const producto = productos.find((p) => p.id === id);
    if (producto) {
      const carrito = obtenerCarrito();
      const item = carrito.find((item) => item.id === id);
      if (item) {
        item.cantidad++;
      } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
      }
      guardarCarrito(carrito);
      mostrarCarrito();
    }
  }
  
  // Obtener carrito desde el Local Storage
  function obtenerCarrito() {
    const carritoJSON = localStorage.getItem("carrito");
    return carritoJSON ? JSON.parse(carritoJSON) : [];
  }
  
  // Guardar carrito en el Local Storage
  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  // Mostrar carrito en el DOM
  function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    const carrito = obtenerCarrito();
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
      const item = carrito[i];
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.nombre} - Cantidad: ${item.cantidad}</span>
        <span>Precio: $${(item.precio * item.cantidad).toFixed(2)}</span>
      `;
      listaCarrito.appendChild(li);
      total += item.precio * item.cantidad;
    }
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  // Vaciar carrito
  function vaciarCarrito() {
    localStorage.removeItem("carrito");
    listaCarrito.innerHTML = "";
    totalCarrito.textContent = "";
  }
  
  // Evento click para agregar productos al carrito
  contenedorProductos.addEventListener("click", function (event) {
    if (event.target.classList.contains("agregar-carrito")) {
      agregarProductoAlCarrito(event);
    }
  });
  
  // Evento click para vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  
  // Mostrar productos y carrito al cargar la página
  mostrarProductos();
  mostrarCarrito();
  
  