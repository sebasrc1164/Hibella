const contenedor = document.getElementById("productos-grid");

const contadorProductos = document.getElementById("contador-productos");


// ========================================
// PRODUCTOS SELECCIONADOS
// ========================================

let productosSeleccionados = [];

function mostrarProductos(categoria = "Recomendados") {

    contenedor.innerHTML = "";

   let lista = productos;

const nombresRecomendados = [
    "Espuma Facial de Arroz Bioqua",
    "Suero de Arroz Bioqua",
    "Crema Hidratante de Arroz Bioqua",
    "Kit de Arroz Bioqua",
    "Base Líquida Lulú By Atenea",
    "Allure Dúo de Rubor en Crema y Compacto Atenea - Pinkcrush",
    "Pestañina Trópico Ruby Rose",
    "Iluminador Samy Diamond Glow"
];

if (categoria === "Recomendados") {

    lista = productos.filter(producto =>
        nombresRecomendados.includes(producto.nombre)
    );

}

if (categoria !== "Recomendados") {

    lista = productos.filter(producto => {

        const cat = (producto.categoria || "").toLowerCase();
        const nombre = (producto.nombre || "").toLowerCase();

        if (categoria === "Maquillaje") {
            return (
                cat === "maquillaje" &&
                !nombre.includes("gloss") &&
                !nombre.includes("tinta") &&
                !nombre.includes("labio") &&
                !nombre.includes("pestañ") &&
                !nombre.includes("ceja")
            );
        }

        if (categoria === "Cuidado facial") {
            return (
                cat.includes("skincare") ||
                cat.includes("facial") ||
                cat.includes("serum") ||
                cat.includes("crema") ||
                cat.includes("velo") ||
                cat.includes("micelar") ||
                nombre.includes("sérum") ||
                nombre.includes("suero") ||
                nombre.includes("limpiador")
            );
        }

        if (categoria === "Labios") {
            return (
                nombre.includes("labio") ||
                nombre.includes("gloss") ||
                nombre.includes("lip ") ||
                nombre.includes("tinta") ||
                nombre.includes("bálsamo")
            );
        }

        if (categoria === "Ojos y cejas") {
            return (
                nombre.includes("pestañ") ||
                nombre.includes("máscara") ||
                nombre.includes("delineador") ||
                nombre.includes("ceja") ||
                nombre.includes("sombras") ||
                nombre.includes("paleta")
            );
        }

        if (categoria === "Accesorios") {
            return (
                cat.includes("accesorios") ||
                nombre.includes("brocha") ||
                nombre.includes("cosmetiquera") ||
                nombre.includes("encrespador") ||
                nombre.includes("perfilador") ||
                nombre.includes("aplicador") ||
                nombre.includes("cepillo") ||
                nombre.includes("pomo")
            );
        }

        return false;
    });
}



const ordenar = document.getElementById("ordenar");

if (ordenar) {

    if (ordenar.value === "precio-menor") {
        lista = [...lista].sort((a, b) => a.precio - b.precio);
    }

    if (ordenar.value === "precio-mayor") {
        lista = [...lista].sort((a, b) => b.precio - a.precio);
    }

    if (ordenar.value === "az") {
        lista = [...lista].sort((a, b) =>
            a.nombre.localeCompare(b.nombre, "es")
        );
    }

    if (ordenar.value === "za") {
        lista = [...lista].sort((a, b) =>
            b.nombre.localeCompare(a.nombre, "es")
        );
    }

}

if (contadorProductos) {

    if (categoria === "Recomendados") {

        contadorProductos.textContent =
            `${lista.length} productos recomendados`;

    } else {

        contadorProductos.textContent =
            `${lista.length} productos encontrados`;

    }

}

const productosAMostrar = lista;

productosAMostrar.forEach(producto => {

        contenedor.innerHTML += `
            <div class="card-producto">

                <div class="imagen-producto">
    <img
        src="${producto.imagen}"
        data-original="${producto.imagen}"
        data-hover="${producto.imagen2 || producto.imagen}"
        alt="${producto.nombre}">
</div>

                <h3>${producto.nombre}</h3>

${producto.variantes ? `
    <select class="selector-variante">
        ${producto.variantes.map((variante, index) => `
            <option
                value="${index}"
                data-precio="${variante.precio}"
                data-tamano="${variante.tamaño}">
                ${variante.tamaño}
            </option>
        `).join("")}
    </select>
` : ""}

<p class="precio">
    $${producto.precio.toLocaleString("es-CO")}
</p>

<button
    type="button"
    class="btn-principal btn-agregar ${
        productosSeleccionados.some(item =>
            item.nombre === producto.nombre
        )
            ? "agregado"
            : ""
    }"
    data-nombre="${producto.nombre}">
    ${
        productosSeleccionados.some(item =>
            item.nombre === producto.nombre
        )
            ? "✓ Agregado"
            : "+ Agregar"
    }
</button>
            </div>
        `;



    });

}

mostrarProductos();

const botones = document.querySelectorAll(".categorias button");

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        document.querySelector(".categorias .activo")?.classList.remove("activo");

        boton.classList.add("activo");

        mostrarProductos(boton.dataset.categoria);

    });

});



const buscar = document.getElementById("buscar");

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

buscar.addEventListener("input", () => {

    const texto = normalizarTexto(buscar.value.trim());

    if (texto !== "") {

        const resultados = productos.filter(producto => {

            const nombre = normalizarTexto(producto.nombre || "");
            const categoria = normalizarTexto(producto.categoria || "");

            return (
                nombre.includes(texto) ||
                categoria.includes(texto)
            );

        });

        contenedor.innerHTML = "";

        if (contadorProductos) {
            contadorProductos.textContent =
                `${resultados.length} producto${resultados.length !== 1 ? "s" : ""} encontrado${resultados.length !== 1 ? "s" : ""}`;
        }

        resultados.forEach(producto => {

            contenedor.innerHTML += `
                <div class="card-producto">

                    <div class="imagen-producto">
                        <img
                            src="${producto.imagen}"
                            data-original="${producto.imagen}"
                            data-hover="${producto.imagen2 || producto.imagen}"
                            alt="${producto.nombre}">
                    </div>

                    <h3>${producto.nombre}</h3>

                    ${producto.variantes ? `
                        <select class="selector-variante">
                            ${producto.variantes.map((variante, index) => `
                                <option
                                    value="${index}"
                                    data-precio="${variante.precio}"
                                    data-tamano="${variante.tamaño}">
                                    ${variante.tamaño}
                                </option>
                            `).join("")}
                        </select>
                    ` : ""}

                    <p class="precio">
                        $${producto.precio.toLocaleString("es-CO")}
                    </p>

                    <button
    type="button"
    class="btn-principal btn-agregar ${
        productosSeleccionados.some(item =>
            item.nombre === producto.nombre
        )
            ? "agregado"
            : ""
    }"
    data-nombre="${producto.nombre}">
    ${
        productosSeleccionados.some(item =>
            item.nombre === producto.nombre
        )
            ? "✓ Agregado"
            : "+ Agregar"
    }
</button>

                </div>
            `;

        });

        const botonVerTodos = document.getElementById("ver-todos");

        if (botonVerTodos) {
            botonVerTodos.style.display = "none";
        }

    } else {

        // Si borra la búsqueda, volvemos a los productos recomendados
mostrarProductos("Recomendados");



    }

});

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {

    menu.classList.toggle("activo");

});

document.addEventListener("mouseover", (e) => {
    if (!e.target.matches(".imagen-producto img")) return;

    e.target.src = e.target.dataset.hover;
});

document.addEventListener("mouseout", (e) => {
    if (!e.target.matches(".imagen-producto img")) return;

    e.target.src = e.target.dataset.original;
});

document.addEventListener("click", (e) => {
    if (!e.target.matches(".imagen-producto img")) return;

    const img = e.target;

    if (img.src.endsWith(img.dataset.original)) {
        img.src = img.dataset.hover;
    } else {
        img.src = img.dataset.original;
    }
});

document.addEventListener("change", (e) => {
    if (!e.target.matches(".selector-variante")) return;

    const selector = e.target;
    const card = selector.closest(".card-producto");

    const opcion = selector.options[selector.selectedIndex];
    const precio = Number(opcion.dataset.precio);

    card.querySelector(".precio").textContent =
        "$" + precio.toLocaleString("es-CO");
});

const selectorOrden = document.getElementById("ordenar");

selectorOrden.addEventListener("change", () => {

    const categoriaActiva =
    document.querySelector(".categorias .activo")?.dataset.categoria || "Recomendados";

    mostrarProductos(categoriaActiva);

});

const filtroMarca = document.getElementById("filtro-marca");

filtroMarca.addEventListener("change", () => {

    const marca = normalizarTexto(filtroMarca.value);

    // Si selecciona "Todas las marcas"
    if (marca === "todas") {

       

        return;
    }

    // Buscar la marca entre TODOS los productos
    const resultados = productos.filter(producto => {

        const nombre = normalizarTexto(producto.nombre || "");

        return nombre.includes(marca);

    });

    contenedor.innerHTML = "";

    // Actualizar contador
    if (contadorProductos) {
        contadorProductos.textContent =
            `${resultados.length} producto${resultados.length !== 1 ? "s" : ""} encontrado${resultados.length !== 1 ? "s" : ""}`;
    }

    resultados.forEach(producto => {

        contenedor.innerHTML += `
            <div class="card-producto">

                <div class="imagen-producto">
                    <img
                        src="${producto.imagen}"
                        data-original="${producto.imagen}"
                        data-hover="${producto.imagen2 || producto.imagen}"
                        alt="${producto.nombre}">
                </div>

                <h3>${producto.nombre}</h3>

                ${producto.variantes ? `
                    <select class="selector-variante">
                        ${producto.variantes.map((variante, index) => `
                            <option
                                value="${index}"
                                data-precio="${variante.precio}"
                                data-tamano="${variante.tamaño}">
                                ${variante.tamaño}
                            </option>
                        `).join("")}
                    </select>
                ` : ""}

                <p class="precio">
                    $${producto.precio.toLocaleString("es-CO")}
                </p>

                <button
    type="button"
    class="btn-principal btn-agregar ${
        productosSeleccionados.some(item =>
            item.nombre === producto.nombre
        )
            ? "agregado"
            : ""
    }"
    data-nombre="${producto.nombre}">
    ${
        productosSeleccionados.some(item =>
            item.nombre === producto.nombre
        )
            ? "✓ Agregado"
            : "+ Agregar"
    }
</button>

            </div>
        `;
    });

    // Cuando filtramos por marca no necesitamos "Ver todos"
    const botonVerTodos = document.getElementById("ver-todos");

    if (botonVerTodos) {
        botonVerTodos.style.display = "none";
    }

});

// ========================================
// SELECCIÓN DE PRODUCTOS
// ========================================

document.addEventListener("click", (e) => {

    const boton = e.target.closest(".btn-agregar");

    if (!boton) return;

    const card = boton.closest(".card-producto");
    const nombre = boton.dataset.nombre;

    // Tomar el precio que aparece actualmente en la tarjeta
    const precioTexto = card.querySelector(".precio").textContent.trim();

    // Revisar si el producto tiene variante
    const selector = card.querySelector(".selector-variante");

    let variante = "";

    if (selector) {
        variante = selector.options[selector.selectedIndex].textContent.trim();
    }

    // Revisar si ya está seleccionado
    const indice = productosSeleccionados.findIndex(
        producto =>
            producto.nombre === nombre &&
            producto.variante === variante
    );

    if (indice === -1) {

        productosSeleccionados.push({
            nombre: nombre,
            precio: precioTexto,
            variante: variante
        });

        boton.textContent = "✓ Agregado";
        boton.classList.add("agregado");

    } else {

        productosSeleccionados.splice(indice, 1);

        boton.textContent = "+ Agregar";
        boton.classList.remove("agregado");

    }

    actualizarBarraSeleccion();

});

// ========================================
// BARRA DE SELECCIÓN
// ========================================

function actualizarBarraSeleccion() {

    const barra = document.getElementById("barra-seleccion");
    const cantidad = document.getElementById("cantidad-seleccionados");

    if (!barra || !cantidad) return;

    const total = productosSeleccionados.length;

    cantidad.textContent =
        `${total} producto${total !== 1 ? "s" : ""} seleccionado${total !== 1 ? "s" : ""}`;

    if (total > 0) {
        barra.classList.add("visible");
    } else {
        barra.classList.remove("visible");
    }
}

// ========================================
// CONSULTAR SELECCIÓN POR WHATSAPP
// ========================================

const botonConsultar = document.getElementById("consultar-whatsapp");

botonConsultar.addEventListener("click", () => {

    if (productosSeleccionados.length === 0) return;

    let mensaje = `Hola HiBella ✨

Quisiera consultar la disponibilidad de los siguientes productos:

`;

    productosSeleccionados.forEach((producto, index) => {

        mensaje += `${index + 1}. ${producto.nombre}
`;

        if (producto.variante) {
            mensaje += `Presentación: ${producto.variante}
`;
        }

        mensaje += `Precio: ${producto.precio}

`;
    });

    mensaje += `¿Se encuentran disponibles?

¡Gracias!`;

    const numeroWhatsApp = "573003806319";

    const urlWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(urlWhatsApp, "_blank");

});

// ========================================
// PANEL DE PRODUCTOS SELECCIONADOS
// ========================================

const panelSeleccion = document.getElementById("panel-seleccion");
const listaSeleccion = document.getElementById("lista-seleccion");
const cerrarSeleccion = document.getElementById("cerrar-seleccion");
const resumenSeleccion = document.querySelector(".resumen-seleccion");

function mostrarPanelSeleccion() {

    if (productosSeleccionados.length === 0) return;

    listaSeleccion.innerHTML = "";

    productosSeleccionados.forEach((producto, index) => {

        listaSeleccion.innerHTML += `
            <div class="producto-seleccionado">

                <div class="producto-seleccionado-info">

                    <strong>${producto.nombre}</strong>

                    ${
                        producto.variante
                            ? `<span>${producto.variante}</span>`
                            : ""
                    }

                    <span>${producto.precio}</span>

                </div>

                <button
                    type="button"
                    class="eliminar-seleccion"
                    data-index="${index}"
                    aria-label="Eliminar ${producto.nombre}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;
    });

    panelSeleccion.classList.add("visible");
}

resumenSeleccion.addEventListener("click", mostrarPanelSeleccion);

cerrarSeleccion.addEventListener("click", () => {
    panelSeleccion.classList.remove("visible");
});

document.addEventListener("click", (e) => {

    const botonEliminar = e.target.closest(".eliminar-seleccion");

    if (!botonEliminar) return;

    const index = Number(botonEliminar.dataset.index);

    productosSeleccionados.splice(index, 1);

    actualizarBarraSeleccion();

    if (productosSeleccionados.length === 0) {

        panelSeleccion.classList.remove("visible");

    } else {

        mostrarPanelSeleccion();

    }

    // Actualizar visualmente los botones del catálogo
    document.querySelectorAll(".btn-agregar").forEach(boton => {

        const nombre = boton.dataset.nombre;

        const seleccionado = productosSeleccionados.some(
            producto => producto.nombre === nombre
        );

        if (seleccionado) {
            boton.textContent = "✓ Agregado";
            boton.classList.add("agregado");
        } else {
            boton.textContent = "+ Agregar";
            boton.classList.remove("agregado");
        }

    });

});
