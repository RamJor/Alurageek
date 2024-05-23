const productList = () => { // función para crear una Get
    return fetch("http://localhost:3000/product")
         //Trabajamos con promesas
           .then((res) => res.json()) // Debe ser leída en formato json
           .catch((err) => console.log(err)); // En caso de error se muestra en la consola
};
// Exportamos las funciones para usarlas en otros archivos utilizadon modulos
export const servicesProducts = {
    productList,
}