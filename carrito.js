const productos = {
    Ajo: { precio: 15, stock: 10 },
    Cilantro: { precio: 20, stock: 10 },
    Espinaca: { precio: 30, stock: 10 },
    Jengibre: { precio: 25, stock: 10 },
    Perejil: { precio: 18, stock: 10 }
};

let carrito = {};

function agregarAlCarrito(nombre) {
    if (productos[nombre].stock > 0) {
        if (!carrito[nombre]) carrito[nombre] = { cantidad: 0, precio: productos[nombre].precio };
        carrito[nombre].cantidad++;
        productos[nombre].stock--;
        actualizarUI();
    }
}

function eliminarDelCarrito(nombre) {
    if (carrito[nombre]) {
        carrito[nombre].cantidad--;
        productos[nombre].stock++;
        if (carrito[nombre].cantidad === 0) delete carrito[nombre];
        actualizarUI();
    }
}

function actualizarUI() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');
    let total = 0;
    listaCarrito.innerHTML = '';

    for (let nombre in carrito) {
        const item = carrito[nombre];
        total += item.cantidad * item.precio;
        listaCarrito.innerHTML += `
            <li>${nombre} x${item.cantidad} - $${(item.cantidad * item.precio).toFixed(2)}
            <button onclick="eliminarDelCarrito('${nombre}')">Eliminar</button></li>
        `;
    }

    totalElement.textContent = `$${total.toFixed(2)} MXN`;
    actualizarStock();
    document.getElementById('comprarCarrito').disabled = total === 0;
}

function actualizarStock() {
    for (let nombre in productos) {
        document.getElementById(`${nombre.toLowerCase()}-stock`).textContent = productos[nombre].stock;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById('divCarro');
    const boton = document.getElementById('toggleCarrito');
    const productos = document.querySelectorAll('#producto'); // Todos los productos
  
    // Asegurar que el carrito esté oculto inicialmente
    carrito.style.display = 'none';
  
    // Eliminar cualquier evento previo para evitar múltiples registros
    boton.removeEventListener('click', toggleCarrito);
  
    // Agregar evento de click de manera única
    boton.addEventListener('click', toggleCarrito);
  
    function toggleCarrito() {
      const esPantallaPequena = window.innerWidth <= 768; // Verifica si es pantalla pequeña (puedes ajustar este valor)
  
      if (esPantallaPequena) {        
        if(productos[1].style.display==='none'){
            productos.forEach(producto => producto.style.display = 'block'); 
            carrito.style.display = 'none';    
        }else{
            productos.forEach(producto => producto.style.display = 'none');
            carrito.style.display = 'block';
            
        }        
      } else {        
        if (carrito.style.display === 'none') {
          carrito.style.display = 'block';  
          productos.forEach(producto => producto.style.display = 'block'); 
        } else {
          carrito.style.display = 'none';
          productos.forEach(producto => producto.style.display = 'block');           
        }
      }
    }
  });
  

document.getElementById('vaciar-carrito').addEventListener('click', () => {
    for (let nombre in carrito) productos[nombre].stock += carrito[nombre].cantidad;
    carrito = {};
    actualizarUI();
});

document.getElementById('comprarCarrito').addEventListener('click', () => {
    if (Object.keys(carrito).length > 0) {
        alert('Compra exitosa');
        carrito = {};
        actualizarUI();
    }
});

actualizarUI();
