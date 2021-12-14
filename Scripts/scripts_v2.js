const aCBoton = document.querySelectorAll(".mainProd__producto__card__boton");
aCBoton.forEach(boton => {
    boton.addEventListener("click", añadirCarritoClick);
})

const carritoContainer = document.querySelector(".mainProd__prodCarrito__table__body");

const botonCompra = document.querySelector(".mainProd__prodCarrito__table__footer__tr__td__button");
botonCompra.addEventListener("click", comprarClicked);

function añadirCarritoClick(event) {

    const button = event.target;
    const card = button.closest(".mainProd__producto__card");
    const cardTitle = card.querySelector(".mainProd__producto__card__title").textContent;
    const cardPrecio = card.querySelector(".mainProd__producto__card__precio").textContent;
    const cardImg = card.querySelector(".mainProd__producto__card__img").src;
    const id = button.id;


    let producto = {
        id,
        cardTitle,
        cardPrecio, 
        cardImg
    }
    let storage = JSON.parse(localStorage.getItem("carrito"));
    if (storage) {
        storage.push(producto);
        localStorage.setItem("carrito", JSON.stringify(storage));
    }
    else { 
        let carrayto = []
        carrayto.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrayto));
    }

    añadirAlCarritoFull(cardTitle, cardImg, cardPrecio, id)

}

function añadirAlCarritoFull(cardTitle, cardImg, cardPrecio, id) {

    const tituloItem = carritoContainer.getElementsByClassName("mainProd__prodCarrito__table__body__tr__td__name");

    for (let i = 0; i < tituloItem.length; i++) {
        if (tituloItem[i].innerText === cardTitle) {
            let cantidadItem = tituloItem[i].parentElement.parentElement.querySelector(".mainProd__prodCarrito__table__body__tr__td__inp");
            cantidadItem.value++;
            actualizarPrecio();
            return;
        }
    }

    const filaCarrito = document.createElement(`tr`);
    filaCarrito.className += "mainProd__prodCarrito__table__body__tr"
    const filaCarritoCont = `
            <td class="mainProd__prodCarrito__table__body__tr__td">
                <img src=${cardImg} class="mainProd__prodCarrito__table__body__tr__td__img" alt=""></td>
            <td class="mainProd__prodCarrito__table__body__tr__td">
                <h5 class="mainProd__prodCarrito__table__body__tr__td__name">${cardTitle}</h5></td>
            <td class="mainProd__prodCarrito__table__body__tr__td">
                <p class="mainProd__prodCarrito__table__body__tr__td__precio">${cardPrecio}</p></td>
            <td class="mainProd__prodCarrito__table__body__tr__td">
                <input class="mainProd__prodCarrito__table__body__tr__td__inp" type="number" value="1"></td>
            <td class="mainProd__prodCarrito__table__body__tr__td">
                <button class="mainProd__prodCarrito__table__body__tr__td__button" id="${id}">X</button></td>
            `;

    filaCarrito.innerHTML = filaCarritoCont;
    carritoContainer.append(filaCarrito);

    filaCarrito.querySelector(".mainProd__prodCarrito__table__body__tr__td__button").addEventListener("click", eliminarProductoCarrito);

    filaCarrito.querySelector(".mainProd__prodCarrito__table__body__tr__td__inp").addEventListener("change", actualizarCantidad);

    actualizarPrecio();

}

function actualizarPrecio() {
    let total = 0;
    const carritoTotal = document.querySelector(".mainProd__prodCarrito__table__footer__tr__td__total");
     
    const carritoItems = document.querySelectorAll(".mainProd__prodCarrito__table__body__tr");
     
    carritoItems.forEach(itemCarrito => {
        const itemCarritoPElement = itemCarrito.querySelector(".mainProd__prodCarrito__table__body__tr__td__precio");
        const itemCarritoPrecio = parseInt(itemCarritoPElement.textContent.replace(`$` , ``));
        const itemCarritoCElement = itemCarrito.querySelector(".mainProd__prodCarrito__table__body__tr__td__inp");
        const itemCarritoCantidad = parseInt(itemCarritoCElement.value);
        total = total + itemCarritoPrecio * itemCarritoCantidad;
    });

    carritoTotal.innerHTML = `$${total.toFixed(2)}`;

}

function eliminarProductoCarrito(event) {
    const botonEliminar = event.target;
    botonEliminar.closest(".mainProd__prodCarrito__table__body__tr").remove();
    actualizarPrecio();

    let storage = JSON.parse(localStorage.getItem("carrito"));
    let storageNuevo = storage.filter(producto => producto.id != botonEliminar.id);
    localStorage.setItem("carrito", JSON.stringify(storageNuevo));

}

function actualizarCantidad(event) {
    const input = event.target;
    
    if (input.value <= 0) {
        input.value = 1;
    }

    actualizarPrecio();

}

function comprarClicked() {

    
    carritoContainer.innerHTML = ``;
    actualizarPrecio();

    Swal.fire(
        'Gracias por su compra'
    )
}

localStorage.clear();


