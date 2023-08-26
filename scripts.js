// Datos iniciales
let stock = [];
let pedidos = [];
let futurasVentas = [];

// Elementos del DOM
const telaNombreInput = document.getElementById('telaNombre');
const cantidadStockInput = document.getElementById('cantidadStock');
const precioTelaStockInput = document.getElementById('precioTelaStock');
const agregarStockBtn = document.getElementById('agregarStockBtn'); 
const clienteNombreInput = document.getElementById('clienteNombre');
const telaSeleccionadaInput = document.getElementById('telaSeleccionada');
const nuevaTelaInput = document.getElementById('nuevaTelaInput'); 
const precioPedidoInput = document.getElementById('precio');
const registrarPedidoBtn = document.getElementById('registrarPedido');

const stockTable = document.getElementById('stockTable');
const pedidosTable = document.getElementById('pedidosTable');

const clienteFuturasVentasInput = document.getElementById('clienteFuturasVentas');
const lugarFuturasVentasInput = document.getElementById('lugarFuturasVentas');
const precioFuturasVentasInput = document.getElementById('precioFuturasVentas');
const telasFuturasVentasInput = document.getElementById('telasFuturasVentas');
const agregarFuturasVentasBtn = document.getElementById('agregarFuturasVentas');
const futurasVentasTable = document.getElementById('futurasVentasTable');

// Función para cargar las opciones de tela en el formulario de registrar pedido
function cargarOpcionesDeTela() {
  telaSeleccionadaInput.innerHTML = '';

  stock.forEach(tela => {
    const option = document.createElement('option');
    option.value = tela.nombre;
    option.textContent = tela.nombre;
    telaSeleccionadaInput.appendChild(option);
  });
}

// Función para cargar los datos almacenados en el localStorage
function cargarDatosAlmacenados() {
  const datosStock = localStorage.getItem('stock');
  const datosPedidos = localStorage.getItem('pedidos');
  const datosFuturasVentas = localStorage.getItem('futurasVentas'); // Agregado aquí

  if (datosStock) {
    stock = JSON.parse(datosStock);
  }

  if (datosPedidos) {
    pedidos = JSON.parse(datosPedidos);
  }

  if (datosFuturasVentas) {
    futurasVentas = JSON.parse(datosFuturasVentas); // Agregado aquí
  }
}

// Función para guardar los datos en el localStorage
function guardarDatos() {
  localStorage.setItem('stock', JSON.stringify(stock));
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  localStorage.setItem('futurasVentas', JSON.stringify(futurasVentas));
}

// Función para mostrar los datos en las tablas
function mostrarStock() {
  stockTable.innerHTML = `
    <tr>
      <th>Nombre de Tela</th>
      <th>Cantidad en Stock</th>
      <th>Precio</th>
      <th>Acciones</th>
    </tr>
  `;
  
  stock.forEach((tela, index) => {
    stockTable.innerHTML += `
      <tr>
        <td>${tela.nombre}</td>
        <td>${tela.cantidad}</td>
        <td>${tela.precio}</td>
        <td>
          <button onclick="modificarTela(${index})">Modificar</button>
          <button onclick="quitarTela(${index})">Quitar</button>
        </td>
      </tr>
    `;
  });

  pedidosTable.innerHTML = `
    <tr>
      <th>Cliente</th>
      <th>Tela</th>
      <th>Precio</th>
      <th>Acciones</th>
    </tr>
  `;

  pedidos.forEach((pedido, index) => {
    pedidosTable.innerHTML += `
      <tr>
        <td>${pedido.cliente}</td>
        <td>${pedido.tela}</td>
        <td>${pedido.precio}</td>
        <td>
          <button onclick="modificarPedido(${index})">Modificar</button>
          <button onclick="quitarPedido(${index})">Quitar</button>
        </td>
      </tr>
    `;
  });
}

function mostrarFuturasVentas() {
  futurasVentasTable.innerHTML = `
    <tr>
      <th>Cliente</th>
      <th>Lugar</th>
      <th>Precio</th>
      <th>Telas</th>
      <th>Acciones</th>
    </tr>
  `;
  
  futurasVentas.forEach((venta, index) => {
    futurasVentasTable.innerHTML += `
      <tr>
        <td>${venta.cliente}</td>
        <td>${venta.lugar}</td>
        <td>${venta.precio}</td>
        <td>${venta.telas}</td>
        <td>
          <button onclick="modificarFuturaVenta(${index})">Modificar</button>
          <button onclick="quitarFuturaVenta(${index})">Quitar</button>
        </td>
      </tr>
    `;
  });
}

// Función para modificar una tela en el stock
function modificarTela(index) {
  const nuevoNombre = prompt('Ingrese el nuevo nombre de la tela:');
  const nuevaCantidad = parseInt(prompt('Ingrese la nueva cantidad en stock:'));
  const nuevoPrecio = parseFloat(prompt('Ingrese el nuevo precio:'));

  if (nuevoNombre && !isNaN(nuevaCantidad) && !isNaN(nuevoPrecio)) {
    stock[index].nombre = nuevoNombre;
    stock[index].cantidad = nuevaCantidad;
    stock[index].precio = nuevoPrecio;
    mostrarStock();
    guardarDatos();
  } else {
    alert('Por favor, ingrese valores válidos.');
  }
}

function quitarTela(index) {
  stock.splice(index, 1);
  mostrarStock(); // Actualiza la tabla de stock
  guardarDatos(); // Guarda los cambios en el localStorage
}

// Función para modificar un pedido
function modificarPedido(index) {
  const nuevoCliente = prompt('Ingrese el nuevo nombre del cliente:');
  const nuevoTela = prompt('Ingrese la nueva tela:');
  const nuevoPrecio = parseFloat(prompt('Ingrese el nuevo precio:'));

  if (nuevoCliente && nuevoTela && !isNaN(nuevoPrecio)) {
    pedidos[index].cliente = nuevoCliente;
    pedidos[index].tela = nuevoTela;
    pedidos[index].precio = nuevoPrecio;
    mostrarStock();
    guardarDatos();
  } else {
    alert('Por favor, ingrese valores válidos.');
  }
}

// Función para quitar un pedido
function quitarPedido(index) {
  pedidos.splice(index, 1);
  mostrarStock();
  guardarDatos();
}

// Agregar al stock
agregarStockBtn.addEventListener('click', () => {
  const nombre = telaNombreInput.value;
  const cantidad = parseInt(cantidadStockInput.value);
  const precio = parseFloat(precioTelaStockInput.value);

  if (nombre && cantidad && precio) {
    const telaExistente = stock.find(tela => tela.nombre === nombre);

    if (telaExistente) {
      telaExistente.cantidad += cantidad;
    } else {
      stock.push({ nombre, cantidad, precio });
    }

    mostrarStock();
    guardarDatos();
    telaNombreInput.value = '';
    cantidadStockInput.value = '';
    precioTelaStockInput.value = '';
  } else {
    alert('Por favor, completa todos los campos.');
  }
});

// Registrar pedido
registrarPedidoBtn.addEventListener('click', () => {
  const cliente = clienteNombreInput.value;
  const telaSeleccionada = telaSeleccionadaInput.value;
  const nuevaTelaInputValue = nuevaTelaInput.value;
  const precioPedido = parseFloat(precioPedidoInput.value);

  if (cliente && precioPedido) {
    const pedido = { cliente, tela: telaSeleccionada, precio: precioPedido };

    if (telaSeleccionada === 'Nueva Tela') {
      if (nuevaTelaInputValue) {
        pedido.tela = nuevaTelaInputValue;
      } else {
        alert('Debes ingresar un nombre válido para la nueva tela.');
        return;
      }
    }

    pedidos.push(pedido);
    mostrarStock(); 
    guardarDatos();
    clienteNombreInput.value = '';
    telaSeleccionadaInput.value = '';
    nuevaTelaInput.value = '';
    precioPedidoInput.value = '';
  } else {
    alert('Por favor, completa todos los campos.');
  }
});

// Actualizar el campo "Tela:" según la selección
telaSeleccionadaInput.addEventListener('change', () => {
  if (telaSeleccionadaInput.value === 'Nueva Tela') {
    nuevaTelaInput.style.display = 'inline-block';
  } else {
    nuevaTelaInput.style.display = 'none';
  }
});

// Agregar futuras ventas
agregarFuturasVentasBtn.addEventListener('click', () => {
  const clienteFuturasVentas = clienteFuturasVentasInput.value;
  const lugarFuturasVentas = lugarFuturasVentasInput.value;
  const precioFuturasVentas = parseFloat(precioFuturasVentasInput.value);
  const telasFuturasVentas = telasFuturasVentasInput.value.split(',').map(tela => tela.trim());

  if (clienteFuturasVentas && lugarFuturasVentas && precioFuturasVentas && telasFuturasVentas.length > 0) {
    const futurasVenta = {
      cliente: clienteFuturasVentas,
      lugar: lugarFuturasVentas,
      precio: precioFuturasVentas,
      telas: telasFuturasVentas
    };

    futurasVentas.push(futurasVenta);
    mostrarFuturasVentas();
    guardarDatos();
    clienteFuturasVentasInput.value = '';
    lugarFuturasVentasInput.value = '';
    precioFuturasVentasInput.value = '';
    telasFuturasVentasInput.value = '';
  } else {
    alert('Por favor, completa todos los campos.');
  }
});

function modificarFuturaVenta(index) {
  const nuevaCliente = prompt('Ingrese el nuevo nombre del cliente:');
  const nuevoLugar = prompt('Ingrese el nuevo lugar:');
  const nuevoPrecio = parseFloat(prompt('Ingrese el nuevo precio:'));
  const nuevasTelas = prompt('Ingrese las nuevas telas (separadas por coma):').split(',').map(tela => tela.trim());

  if (nuevaCliente && nuevoLugar && !isNaN(nuevoPrecio) && nuevasTelas.length > 0) {
    futurasVentas[index].cliente = nuevaCliente;
    futurasVentas[index].lugar = nuevoLugar;
    futurasVentas[index].precio = nuevoPrecio;
    futurasVentas[index].telas = nuevasTelas;
    mostrarFuturasVentas();
    guardarDatos();
  } else {
    alert('Por favor, ingrese valores válidos.');
  }
}

function quitarFuturaVenta(index) {
  futurasVentas.splice(index, 1);
  mostrarFuturasVentas();
  guardarDatos();
}

// Inicializar
cargarDatosAlmacenados();
mostrarStock();
mostrarFuturasVentas();
cargarOpcionesDeTela();
