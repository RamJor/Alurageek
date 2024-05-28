const productList = () => { // función para crear una Get
    return fetch("http://localhost:3000/product")
         //Trabajamos con promesas
           .then((res) => res.json()) // Debe ser leída en formato json
           .catch((err) => console.log(err)); // En caso de error se muestra en la consola
};

//requisición POST
 const createProducts = (name, price, image)=> {
    return fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
         //Este archivo JSON lo tranformamos en strng para leerlo
        body: JSON.stringify({
            name,
            price,
            image,
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
 };

 //DELETE
 const deleteProducts = (id) => {
    return fetch(`http://localhost:3000/product/${id}`,{
        method: "DELETE",
        headers:{
            "Content-Type":
            "application/json",

        },
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
 };

// Exportamos las funciones para usarlas en otros archivos utilizadon modulos
export const servicesProducts = {
    productList, 
    createProducts,
    deleteProducts,
};