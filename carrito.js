const productos = {
    Ajo: { precio: 15, stock: 10, imagen: 'https://static.whataform.com/options/picture_12157f5365093dfc4326_2b8b2fc24f40d22ebcd68944a89192bc8e1544ad.jpg' },
    Cilantro: { precio: 20, stock: 10, imagen: 'https://static.whataform.com/options/picture_1215763c6b0f88cb9e7f_c824e9413d8bca6a869834c051022c27e6eb4e8e.png' },
    Espinaca: { precio: 30, stock: 10, imagen: 'https://static.whataform.com/options/picture_12157727831d45087ec2_4cbc3c53dd2b79017b9a83943333d07e1ab9e1f4.png' },
    Jengibre: { precio: 25, stock: 10, imagen: 'https://static.whataform.com/options/picture_12157e6bc88237fb3471_799227f0d58bef522fc8b486c6459fef71a1a280.png' },
    Perejil: { precio: 18, stock: 10, imagen: 'https://static.whataform.com/options/picture_12157b39c872cc689165_fd908bb44d33b5eb285f052e17f935dae748bd1d.jpg' }
};

let carrito = {};

function agregarAlCarrito(nombreProducto) {
    if (productos[nombreProducto].stock > 0) {
        if (carrito[nombreProducto]) {
            carrito[nombreProducto].cantidad += 1;
        } else {
            carrito[nombreProducto] = { cantidad: 1, precio: productos[nombreProducto].precio, imagen: productos[nombreProducto].imagen };
        }
        productos[nombreProducto].stock -= 1;
        actualizarCarrito();
        actualizarStock(nombreProducto);
    }
}

function eliminarDelCarrito(nombreProducto) {
    if (carrito[nombreProducto]) {
        carrito[nombreProducto].cantidad -= 1;
        if (carrito[nombreProducto].cantidad === 0) {
            delete carrito[nombreProducto];
        }
        productos[nombreProducto].stock += 1;
        actualizarCarrito();
        actualizarStock(nombreProducto);
    }
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');
    let total = 0;
    listaCarrito.innerHTML = '';
    for (const [nombreProducto, detalles] of Object.entries(carrito)) {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${detalles.imagen}" alt="${nombreProducto}" class="producto-imagen">
            <span>${nombreProducto} x${detalles.cantidad} - $${(detalles.cantidad * detalles.precio).toFixed(2)}</span>
            <button onclick="eliminarDelCarrito('${nombreProducto}')">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
        total += detalles.cantidad * detalles.precio;
    }
    totalElement.textContent = `$${total.toFixed(2)} MXN`;
}

function actualizarStock(nombreProducto) {
    const stockElement = document.getElementById(`${nombreProducto.toLowerCase()}-stock`);
    if (stockElement) {
        stockElement.textContent = productos[nombreProducto].stock;
        if (productos[nombreProducto].stock === 0) {
            document.querySelector(`button[onclick="agregarAlCarrito('${nombreProducto}')"]`).disabled = true;
        } else {
            document.querySelector(`button[onclick="agregarAlCarrito('${nombreProducto}')"]`).disabled = false;
        }
    }
}

function vaciarCarrito() {
    for (const [nombreProducto, detalles] of Object.entries(carrito)) {
        productos[nombreProducto].stock += detalles.cantidad;
    }
    carrito = {};
    actualizarCarrito();
    actualizarStocks();
}

function actualizarStocks() {
    for (const nombreProducto of Object.keys(productos)) {
        actualizarStock(nombreProducto);
    }
}

function comprarCarrito() {  
    carrito = {};
    actualizarCarrito();
    actualizarStocks();
    alert("Operacion exitosa, gracias por su compra");
}


document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
document.getElementById('comprarCarrito').addEventListener('click', comprarCarrito);