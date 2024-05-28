
import { servicesProducts } from "../product-services.js";
 import esunUrlImg from "../validando-form.js"; 
import { tiposError, mensajes } from "../error-tipos.js";
// renderizando productos
const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const validarFormulario = document.querySelectorAll("[required]");
const limpiarFormulario = document.querySelector(".button_clear");
const validarUrl = document.querySelector("#img");

function createCard(name,price,image,id) {
    const card = document.createElement("div"); //variale para crear el elemento div dinamicamente
    card.classList.add("card__container"); //Agregamos una clase para la estilización

    //backsticks para colocar variables dentro de un html en un javascript
    card.innerHTML = `
    <div class="picture_container">
    <img  class="picture__style" src="${image}" alt="${name}">
  </div> 

  <div class="info_container">
    <p class="title_info">${name}</p>

    <div class="info_contenido_container">
      <p>$ ${price} pesos</p>
      <button class="delete_button" data-id="${id}"><img src="/img/delete.png" alt="delete button"></button>
    </div>
    `;
    
    
    const buttonDelete = card.querySelector("[data-id]");
    buttonDelete.addEventListener("click", async () => {
        try {
           await servicesProducts.deleteProducts(id);
        card.remove();
            
        } catch (error) {
            console.error("error al borrar el producto:")
        }
        
    });
    productContainer.appendChild(card);
    return card;

}
//lista de productos es una funcion asíncrona
const render = async () => {
    //trycatch para ver error y recibir la información
    try {
        const listproducts = await servicesProducts.productList(); //etsa variable espera a que se reciba la información de la API
        //console.log(listproducts); //Revisamos en la consola para ver si estamos recibiendo la información
        //Utilizamos un foreach para recorrer el array
        listproducts.forEach(product => {   
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });
    } catch (error) {   
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name,price,image)
    .then((res) => console.log(res))
    .catch((err) =>console.log(err));
});


render();

// Validando el formulario
validarFormulario.forEach((campo) => {
    campo.addEventListener("blur",() => verificarCampo(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault);
});



function verificarCampo(campo) {
    
    let mensaje = ""
    campo.setCustomValidity("")

    if (campo.name == "img" && campo.value !="") {
        /* esunUrlImg(campo); */
        let valueUrl = validarUrl.value
        
    if (esunUrlImg(valueUrl)){
        console.log("URL valida");
    }else{
        campo.setCustomValidity("Escribe una URL válida");
    }
    }

    tiposError.forEach (error =>{
        if (campo.validity [error]) {
            mensaje = mensajes [campo.name][error]

        }
    })
    const mensajeError = campo.parentNode.querySelector(".mensaje-error");
    const validarInputCheck = campo.checkValidity();
    if (!validarInputCheck) {
        mensajeError.textContent = mensaje
        
    }else {
        mensajeError.textContent =""
    }
}

 
limpiarFormulario.addEventListener("click", (campo)=>{
   campo.value = "";
})
