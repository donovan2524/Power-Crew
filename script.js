let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

/* MENU */
function abrirMenu() {
    document.getElementById("menu").style.width = "250px";
}

function cerrarMenu() {
    document.getElementById("menu").style.width = "0";
}

/* BUSCADOR */
function buscarProducto() {
    let input = document.getElementById("buscador").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        let texto = cards[i].innerText.toLowerCase();

        cards[i].style.display = texto.includes(input) ? "block" : "none";
    }
}

/* AGREGAR */
function agregarCarrito(nombre, precio) {

    let existe = carrito.find(item => item.producto === nombre);

    if(existe){
        existe.cantidad++;
    }else{
        carrito.push({
            producto:nombre,
            precio:precio,
            cantidad:1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

/* MOSTRAR */
function mostrarCarrito(){

    let lista = document.getElementById("listaCarrito");

    if(!lista) return;

    lista.innerHTML = "";
    total = 0;

    carrito.forEach((item,index)=>{

        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        lista.innerHTML += `
        <p>
        ${item.producto} - $${item.precio}
        <button onclick="restar(${index})">➖</button>
        ${item.cantidad}
        <button onclick="sumar(${index})">➕</button>
        = $${subtotal}
        </p>
        `;
    });

    document.getElementById("total").innerText = total;
}

/* SUMAR */
function sumar(i){
    carrito[i].cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

/* RESTAR */
function restar(i){
    carrito[i].cantidad--;

    if(carrito[i].cantidad <= 0){
        carrito.splice(i,1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

/* PAGAR */
function pagar(){

    if(carrito.length == 0){
        alert("Carrito vacío");
    }else{
        document.getElementById("pagoBox").style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
    }
}




function efectivo(){

    document.getElementById("loader").style.display = "flex";

    setTimeout(()=>{

        let ticket = "===== TICKET =====\n\n";

        carrito.forEach(item=>{
            ticket += item.producto + " x" + item.cantidad + " = $" + (item.precio * item.cantidad) + "\n";
        });

        ticket += "\nTOTAL: $" + total;
        ticket += "\nPAGO: EFECTIVO";
        ticket += "\nESTADO: PENDIENTE DE PAGO";

        document.getElementById("loader").style.display = "none";
guardarVenta("Efectivo", "Pendiente de pago");
        abrirTicket(ticket);

        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();

    }, 2000);
}

function tarjeta(){
    document.getElementById("datosTarjeta").style.display = "block";
}

function pagarTarjeta(){

    let nombre = document.getElementById("nombre").value.trim();
    let numero = document.getElementById("numero").value.trim();
    let cvv = document.getElementById("cvv").value.trim();
    let fecha = document.getElementById("fecha").value.trim();

    if(nombre == "" || numero == "" || cvv == "" || fecha == ""){
        alert("Completa todos los campos");
        return;
    }

    if(numero.replace(/\s/g,'').length < 16){
        alert("Tarjeta incompleta");
        return;
    }

    document.getElementById("loader").style.display = "flex";

    setTimeout(()=>{

        let ticket = "===== TICKET =====\n\n";

        carrito.forEach(item=>{
            ticket += item.producto + " x" + item.cantidad + " = $" + (item.precio * item.cantidad) + "\n";
        });

        ticket += "\nTOTAL: $" + total;
        ticket += "\nPAGO: TARJETA";
        ticket += "\nCLIENTE: " + nombre;
        ticket += "\nESTADO: PAGADO";

        document.getElementById("loader").style.display = "none";
guardarVenta("Tarjeta", "Pagado");
        abrirTicket(ticket);

        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();

    }, 2000);
}



function formatoFecha(){

    let input = document.getElementById("fecha");

    let valor = input.value.replace(/[^0-9]/g,'');

    if(valor.length > 2){
        valor = valor.substring(0,2) + "/" + valor.substring(2,4);
    }

    input.value = valor;
}


function soloLetras(){

    let input = document.getElementById("nombre");

    /* solo letras y espacios */
    let valor = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'');

    /* todo minúscula */
    valor = valor.toLowerCase();

    /* primera letra de cada palabra mayúscula */
    valor = valor.replace(/\b\w/g, function(letra){
        return letra.toUpperCase();
    });

    input.value = valor;
}

function validarTarjeta(){

    let input = document.getElementById("numero");

    /* solo números */
    let valor = input.value.replace(/\D/g,'');

    /* permitir 16 números reales */
    valor = valor.substring(0,16);

    /* agregar espacios cada 4 */
    let resultado = "";

    for(let i = 0; i < valor.length; i++){

        if(i > 0 && i % 4 == 0){
            resultado += " ";
        }

        resultado += valor[i];
    }

    input.value = resultado;
}





function loginAdmin(){

    let user = document.getElementById("user").value.trim();
    let pass = document.getElementById("pass").value.trim();

    if(user === "admin" && pass === "1234"){
        alert("Bienvenido Administrador");
        window.location.href = "panel.html";
    }else{
        alert("Usuario o contraseña incorrectos");
    }
}







let productosBase = {
    cafes: [
        {nombre:"Espresso", precio:40, imagen:"espresso.jpg"},
        {nombre:"Capuccino", precio:55, imagen:"capuccino.jpg"},
        {nombre:"Latte", precio:60, imagen:"latte.jpg"},
        {nombre:"Moka", precio:200, imagen:"moka.jpg"}
    ],

    postres: [
        {nombre:"Brownie", precio:45, imagen:"brownie.jpg"},
        {nombre:"Pay de Queso", precio:55, imagen:"payqueso.jpg"},
        {nombre:"Pastel de Chocolate", precio:60, imagen:"pastelchocolate.jpg"},
        {nombre:"Galletas", precio:35, imagen:"galletas.jpg"}
    ],

    comidas: [
        {nombre:"Sándwich", precio:70, imagen:"sandwich.jpg"},
        {nombre:"Croissant", precio:65, imagen:"croissant.jpg"},
        {nombre:"Ensalada", precio:85, imagen:"ensalada.jpg"},
        {nombre:"Panini", precio:90, imagen:"panini.jpg"}
    ]
};

let productosAdmin = JSON.parse(localStorage.getItem("productos")) || productosDefault;

/* MOSTRAR EN PANEL */
function cargarPanel(){

    let lista = document.getElementById("listaAdmin");

    if(!lista) return;

    let categoria = document.getElementById("categoriaProducto").value;

    let productos = obtenerProductos(categoria);

    lista.innerHTML = "";

    productos.forEach((item,index)=>{

        lista.innerHTML += `
        <p>
            ${item.nombre} - $${item.precio}
            <button onclick="editarProducto(${index})">✏️</button>
            <button onclick="eliminarProducto(${index})">❌</button>
        </p>
        `;
    });
}

/* AGREGAR */
function agregarProducto(){

    let categoria = document.getElementById("categoriaProducto").value;

    let nombre = document.getElementById("nuevoNombre").value.trim();
    let precio = document.getElementById("nuevoPrecio").value.trim();
    let archivo = document.getElementById("nuevaImagen").files[0];

    if(nombre == "" || precio == ""){
        alert("Completa nombre y precio");
        return;
    }

    let productos = obtenerProductos(categoria);

    if(archivo){

        let lector = new FileReader();

        lector.onload = function(e){

            productos.push({
                nombre:nombre,
                precio:parseInt(precio),
                imagen:e.target.result
            });

            guardarProductos(categoria, productos);
            cargarPanel();

            document.getElementById("nuevoNombre").value = "";
            document.getElementById("nuevoPrecio").value = "";
            document.getElementById("nuevaImagen").value = "";
        }

        lector.readAsDataURL(archivo);

    }else{

        productos.push({
            nombre:nombre,
            precio:parseInt(precio),
            imagen:"cafe.jpg"
        });

        guardarProductos(categoria, productos);
        cargarPanel();
    }
}

/* ELIMINAR */
function eliminarProducto(i){

    let confirmar = confirm("¿Seguro que quieres eliminar este producto?");

    if(!confirmar){
        return;
    }

    let categoria = document.getElementById("categoriaProducto").value;

    let productos = obtenerProductos(categoria);

    productos.splice(i,1);

    guardarProductos(categoria, productos);

    cargarPanel();
}

/* AUTO CARGA */
window.onload = function(){

    if(typeof corregirImagenes === "function"){
        corregirImagenes();
    }

    if(typeof cargarPanel === "function"){
        cargarPanel();
    }

    if(typeof cargarProductosCliente === "function"){
        cargarProductosCliente();
    }

    if(typeof cargarVentas === "function"){
        cargarVentas();
    }

    mostrarCarrito();
}










function cargarProductosCliente(){

    let contenedor = document.getElementById("contenedorProductos");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    let categoria = obtenerCategoriaPagina();

    let productos = obtenerProductos(categoria);

    productos.forEach(item=>{

        let imagen = item.imagen || "cafe.jpg";

        if(!imagen.startsWith("data:image") && !imagen.startsWith("../img/")){
            imagen = "../img/" + imagen;
        }

        let boton = "";

        if(categoria === "cafes"){
            boton = `
            <button onclick="personalizarCafe('${item.nombre}',${item.precio})">
                Personalizar
            </button>`;
        }else{
            boton = `
            <button onclick="agregarCarrito('${item.nombre}',${item.precio})">
                Agregar
            </button>`;
        }

        contenedor.innerHTML += `
        <div class="card">
            <img src="${imagen}" onerror="this.src='../img/cafe.jpg'">
            <h2>${item.nombre}</h2>
            <p>$${item.precio}</p>
            ${boton}
        </div>
        `;
    });
}




function editarProducto(i){

    let categoria = document.getElementById("categoriaProducto").value;

    let productos = obtenerProductos(categoria);

    let nuevoNombre = prompt("Nuevo nombre:", productos[i].nombre);
    let nuevoPrecio = prompt("Nuevo precio:", productos[i].precio);

    if(nuevoNombre == null || nuevoPrecio == null){
        return;
    }

    if(nuevoNombre.trim() == "" || nuevoPrecio.trim() == ""){
        alert("Datos vacíos");
        return;
    }

    productos[i].nombre = nuevoNombre;
    productos[i].precio = parseInt(nuevoPrecio);

    guardarProductos(categoria, productos);

    cargarPanel();
}



function corregirImagenes(){

    productosAdmin.forEach(item => {

        if(item.nombre === "Espresso") item.imagen = "espresso.jpg";
        if(item.nombre === "Capuccino") item.imagen = "capuccino.jpg";
        if(item.nombre === "Latte") item.imagen = "latte.jpg";
        if(item.nombre === "Moka") item.imagen = "moka.jpg";

        if(!item.imagen){
            item.imagen = "cafe.jpg";
        }
    });

    localStorage.setItem("productos", JSON.stringify(productosAdmin));
}





let imagenTemporal = "";

function previewNuevaImagen(){

    let archivo = document.getElementById("nuevaImagen").files[0];

    if(!archivo) return;

    let lector = new FileReader();

    lector.onload = function(e){
        imagenTemporal = e.target.result;

        let preview = document.getElementById("previewImagen");
        preview.src = imagenTemporal;
        preview.style.display = "block";
    }

    lector.readAsDataURL(archivo);
}


function vaciarCarrito(){

    if(carrito.length === 0){
        alert("El carrito ya está vacío");
        return;
    }

    let confirmar = confirm("¿Seguro que quieres vaciar el carrito?");

    if(confirmar){
        carrito = [];
        total = 0;
        localStorage.removeItem("carrito");
        mostrarCarrito();
        document.getElementById("total").innerText = 0;
    }
}







function abrirTicket(contenido){

    let ventana = window.open("", "_blank");

    ventana.document.write(`
    <html>
    <head>
        <title>Ticket</title>
        <style>
            body{
                font-family: Arial, sans-serif;
                background:#f4f4f4;
                padding:30px;
            }

            .ticket{
                background:white;
                width:320px;
                margin:auto;
                padding:20px;
                border-radius:10px;
                box-shadow:0 0 10px #999;
                text-align:center;
            }

            h2{
                margin-bottom:10px;
            }

            pre{
                text-align:left;
                white-space:pre-wrap;
                font-size:15px;
            }

            button{
                background:black;
                color:white;
                border:none;
                padding:10px 20px;
                border-radius:8px;
                cursor:pointer;
            }
        </style>
    </head>
    <body>
        <div class="ticket">
            <h2>Power Brew⚡️</h2>
            <pre>${contenido}</pre>
            <button onclick="window.print()">Imprimir ticket</button>
        </div>
    </body>
    </html>
    `);
}





function guardarVenta(metodo, estado){

    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    ventas.push({
        productos: carrito,
        total: total,
        metodo: metodo,
        estado: estado,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("ventas", JSON.stringify(ventas));
}



function cargarVentas(){

    let contenedor = document.getElementById("historialVentas");

    if(!contenedor) return;

    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    contenedor.innerHTML = "";

    if(ventas.length === 0){
        contenedor.innerHTML = "<p>No hay ventas registradas</p>";
        return;
    }

    ventas.forEach((venta, index)=>{

        let productosTexto = "";

        venta.productos.forEach(item=>{
            productosTexto += `${item.producto} x${item.cantidad} - $${item.precio * item.cantidad}<br>`;
        });

        contenedor.innerHTML += `
        <div class="venta">
            <h3>Venta #${index + 1}</h3>
            <p>${productosTexto}</p>
            <p><b>Total:</b> $${venta.total}</p>
            <p><b>Método:</b> ${venta.metodo}</p>
            <p><b>Estado:</b> ${venta.estado}</p>
            <p><b>Fecha:</b> ${venta.fecha}</p>
        </div>
        `;
    });
}



function borrarVentas(){

    let confirmar = confirm("¿Seguro que quieres borrar todo el historial?");

    if(confirmar){
        localStorage.removeItem("ventas");
        cargarVentas();
    }
}






let cafeActual = "";
let precioCafeActual = 0;

function personalizarCafe(nombre, precio){

    cafeActual = nombre;
    precioCafeActual = precio;

    document.getElementById("nombreCafeModal").innerText = nombre;
    document.getElementById("modalCafe").style.display = "flex";
}

function cerrarModalCafe(){
    document.getElementById("modalCafe").style.display = "none";
}

function confirmarCafe(){

    let tamanoDatos = document.getElementById("tamanoCafe").value.split("|");
    let proteinaDatos = document.getElementById("proteinaCafe").value.split("|");

    let tamano = tamanoDatos[0];
    let extraTamano = parseInt(tamanoDatos[1]);

    let proteina = proteinaDatos[0];
    let extraProteina = parseInt(proteinaDatos[1]);

    let precioFinal = precioCafeActual + extraTamano + extraProteina;

    let nombreFinal = cafeActual + " - " + tamano + " - " + proteina;

    agregarCarrito(nombreFinal, precioFinal);

    cerrarModalCafe();
}





function obtenerCategoriaPagina(){

    let pagina = window.location.pathname;

    if(pagina.includes("cafes")) return "cafes";
    if(pagina.includes("postres")) return "postres";
    if(pagina.includes("comidas")) return "comidas";

    return "cafes";
}

function obtenerProductos(categoria){

    let productosGuardados = JSON.parse(localStorage.getItem("productos_" + categoria));

    if(!productosGuardados || productosGuardados.length === 0){
        return productosBase[categoria];
    }

    return productosGuardados;
}

function guardarProductos(categoria, productos){

    localStorage.setItem("productos_" + categoria, JSON.stringify(productos));
}




