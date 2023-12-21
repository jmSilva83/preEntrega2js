//Objeto Maquina Expendedora
const maquinaExpendedora = {
    productos: [],
    ventas: [],

    // Método para agregar un producto a la máquina
    agregarProducto: function (nombre, numero, precio, stock, conAlcohol) {
        if (
            !nombre ||
            nombre.trim() === "" ||
            isNaN(numero) ||
            isNaN(precio) ||
            isNaN(stock) ||
            precio <= 0 ||
            stock < 0
        ) {
            alert(
                "Por favor, ingrese valores válidos para agregar un producto. Asegúrese de que el precio sea mayor a cero y el stock no sea negativo."
            );
            return;
        }

        const producto = {
            nombre: nombre,
            numero: numero,
            precio: precio,
            stock: stock,
            conAlcohol: conAlcohol,
        };
        this.productos.push(producto);
    },

    // Método para mostrar los productos disponibles
    mostrarProductos: function () {
        if (this.productos.length === 0) {
            alert("No hay productos disponibles en la máquina expendedora.");
            return;
        }

        let mensaje = "Aquí están los productos disponibles:\n\n";
        this.productos.forEach((producto) => {
            mensaje += `${producto.numero} ${producto.nombre} $${producto.precio} (Stock: ${producto.stock})\n`;
        });
        alert(mensaje);
    },

    // Método para solicitar el pago al usuario
    solicitarPago: function (totalAPagar) {
        let saldo = 0;

        while (saldo < totalAPagar) {
            const pago = parseFloat(
                prompt(`Inserte $${totalAPagar - saldo} más:`)
            );

            if (pago === null) {
                alert(
                    "Operación cancelada. Gracias por visitarnos. ¡Hasta luego!"
                );
                return 0;
            }

            if (isNaN(pago) || pago <= 0) {
                alert(
                    "Por favor, ingrese un valor numérico válido mayor a cero."
                );
            } else {
                saldo += pago;
            }
        }

        const cambio = saldo - totalAPagar;
        return Math.round(cambio * 100) / 100;
    },

    // Método para realizar una venta
    realizarVenta: function (producto, cantidad) {
        if (!producto || cantidad <= 0 || !Number.isInteger(cantidad)) {
            alert(
                "Por favor, ingrese una cantidad válida como un número entero mayor a cero."
            );
            return;
        }

        if (cantidad > producto.stock) {
            alert(
                "No hay suficiente stock disponible para la cantidad solicitada."
            );
            return;
        }

        const totalAPagar = producto.precio * cantidad;
        const cambio = this.solicitarPago(totalAPagar);

        if (cambio !== 0) {
            const fechaHoraActual = new Date().toLocaleString();

            alert(
                `¡Compra exitosa! Tu cambio es $${cambio}. ¡Gracias por tu compra!\nFecha y hora: ${fechaHoraActual}`
            );

            producto.stock -= cantidad;

            this.ventas.push({
                producto: producto.nombre,
                cantidad: cantidad,
                monto: totalAPagar,
                fecha: fechaHoraActual,
            });
        }
    },

    // Método para filtrar productos por categoría (con o sin alcohol)
    filtrarProductosPorCategoria: function (conAlcohol) {
        const categoria = conAlcohol ? "Con Alcohol" : "Sin Alcohol";

        // Validación: Verificar si hay productos disponibles antes de filtrar
        if (this.productos.length === 0) {
            alert("No hay productos disponibles en la máquina expendedora.");
            return;
        }

        const productosFiltrados = this.productos.filter((producto) => {
            // Validación: Asegurarse de que los productos tengan la propiedad 'conAlcohol'
            if (producto.conAlcohol !== undefined) {
                return producto.conAlcohol === conAlcohol;
            } else {
                // En caso de que algunos productos no tengan la propiedad 'conAlcohol'
                alert(
                    "Error: Algunos productos no tienen la propiedad 'conAlcohol'."
                );
                return false;
            }
        });

        if (productosFiltrados.length === 0) {
            alert(
                `No hay productos ${categoria} disponibles en la máquina expendedora.`
            );
        } else {
            let mensaje = `Productos ${categoria}:\n\n`;
            productosFiltrados.forEach((producto) => {
                mensaje += `${producto.numero} ${producto.nombre} $${producto.precio} (Stock: ${producto.stock})\n`;
            });
            alert(mensaje);
        }
    },
};

// Agrega productos según tu código original
maquinaExpendedora.agregarProducto("Coca-Cola", 1, 1350.0, 10, false);
maquinaExpendedora.agregarProducto("Fernet Branca", 2, 7800.0, 5, true);
maquinaExpendedora.agregarProducto("Cerveza Quilmes", 3, 950.0, 8, true);
maquinaExpendedora.agregarProducto("Vino Trumpeter", 4, 3500.0, 12, true);
maquinaExpendedora.agregarProducto("Hielo", 5, 300.0, 20, false);

// Solicita el nombre al usuario
let nombre = prompt("¡Hola! ¿Cuál es tu nombre?");

// Validación del nombre
while (!nombre || nombre.trim() === "") {
    alert("Por favor, ingrese un nombre válido.");
    nombre = prompt("¡Hola! ¿Cuál es tu nombre?");
}

alert(`¡Hola ${nombre.trim()}! Bienvenido a tu máquina expendedora.`);

// Menú principal
while (true) {
    const opcion = prompt(
        `Menú de opciones:\n1. Mostrar productos\n2. Comprar producto\n3. Filtrar productos por categoría\n4. Salir`
    );

    switch (opcion) {
        case "1":
            // Muestra los productos disponibles
            maquinaExpendedora.mostrarProductos();
            break;

        case "2":
            // Solicita la selección y cantidad de productos para la compra
            const seleccionCompra = prompt(
                "Coloque el número o nombre del producto:"
            );
            if (!seleccionCompra) {
                alert(
                    "Por favor, ingrese un número o nombre de producto válido."
                );
                break;
            }

            // Aquí agrego el método de búsqueda pedido para la segunda pre entrega
            const productoSeleccionado = maquinaExpendedora.productos.find(
                (producto) =>
                    producto.nombre === seleccionCompra ||
                    producto.numero === parseInt(seleccionCompra)
            );

            if (productoSeleccionado) {
                let cantidadCompra;

                do {
                    // Solicita la cantidad de productos a comprar
                    const inputCantidad = prompt(
                        "Ingrese la cantidad de productos que desea comprar:"
                    );

                    if (inputCantidad === null) {
                        // El usuario canceló la operación
                        cantidadCompra = null;
                        break;
                    }

                    cantidadCompra = parseInt(inputCantidad);

                    if (
                        isNaN(cantidadCompra) ||
                        cantidadCompra <= 0 ||
                        !Number.isInteger(cantidadCompra)
                    ) {
                        alert(
                            "Por favor, ingrese una cantidad válida como un número entero mayor a cero."
                        );
                    } else if (cantidadCompra > productoSeleccionado.stock) {
                        alert(
                            "No hay suficiente stock disponible para la cantidad solicitada."
                        );
                    }
                } while (
                    cantidadCompra === null ||
                    isNaN(cantidadCompra) ||
                    cantidadCompra <= 0 ||
                    !Number.isInteger(cantidadCompra)
                );

                if (cantidadCompra !== null) {
                    // Realiza la venta
                    maquinaExpendedora.realizarVenta(
                        productoSeleccionado,
                        cantidadCompra
                    );
                }
            } else {
                alert("Producto no encontrado.");
            }
            break;

        case "3":
            const opcionFiltrar = prompt(
                "Filtrar productos por categoría:\n1. Con Alcohol\n2. Sin Alcohol"
            );

            switch (opcionFiltrar) {
                case "1":
                    // Filtra productos con alcohol
                    maquinaExpendedora.filtrarProductosPorCategoria(true);
                    break;

                case "2":
                    // Filtra productos sin alcohol
                    maquinaExpendedora.filtrarProductosPorCategoria(false);
                    break;

                default:
                    alert("Opción no válida. Por favor, elija 1 o 2.");
            }
            break;

        case "4":
            // Sale del programa
            alert("Gracias por visitarnos. ¡Vuelva pronto!");
            break;

        default:
            // Opción no válida
            alert("Opción no válida. Por favor, elija una opción correcta.");
    }

    if (opcion === "4") {
        break;
    }
}
