//Carrito//

//variables//
  
  
  const buyContainer = document.getElementById("buy-container");
  
  const emptyButton = document.getElementById("emptybuy");
  
  const countItem  = document.getElementById("counter");

  const numbers = document.getElementById("numbers")

  const totalPrice = document.getElementById("totalPrice");

  const booksContainer = document.getElementById("books-container");
  

  
  let carrito = [];
    
  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Async - await- fetch// 

  const addStock = async () => {
  const answer = await fetch("./stockProductos.json");
  const stockProductos = await answer.json();


  stockProductos.forEach((producto) => {
  const div = document.createElement('div');
  div.className = ('producto');
  div.innerHTML = ` <img src=${producto.img} alt ="">
                    <h3>${producto.nombre}</h3>
                    <p> Precio: $ ${producto.precio}</p>
                    <button id = "Agregar ${producto.id}" class ="boton-agregar"> Agregar <i class="fa fa-shopping-cart"></i></buttton>
                   `

  booksContainer.appendChild(div);

  const boton = document.getElementById(`Agregar ${producto.id}`);

  // Incorporando Toastify//

  boton.addEventListener("click", () => {

    agregarAlCarrito(producto.id)
    Toastify({
      text: "Agregado al carrito",
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #edc967 , #efd282)",
        right: -150,
        
      },
      }).showToast();

    
  });

  });

      //Agregando Items al carrito//

  const agregarAlCarrito = (prodId) => {


    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){
      const prod = carrito.map (prod => { 
          if (prod.id === prodId){
              prod.numbers++
          }
      })
  } else { 
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item);

  };
  

  actualizarCarrito();

};

};

addStock()

  
    //Eliminando Items del carrito//

    const eliminarDelCarrito = (prodId) => {
  
      const item = carrito.find((prod) => prod.id === prodId)
      const indice = carrito.indexOf(item);
      const existe = carrito.some (prod => prod.id === prodId) 

    if (existe&&item.numbers>1){
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.numbers--
            }
        })
    }
    else{carrito.splice(indice, 1) 
      

    }
        
    actualizarCarrito()
  
    };

    //Vaciar carrito//

    emptyButton.addEventListener("click", () => {
      carrito.length = 0
      actualizarCarrito()
    });
  
    const actualizarCarrito =() => { 
      
      buyContainer.innerHTML= ""  
  
        carrito.forEach((prod) => {
          const div = document.createElement("div")
          div.className = ("productoEnCarrito")
          div.innerHTML = `<p>${prod.nombre}</p>
                           <p>Precio: ${prod.precio}</p>
                           <p>Cantidad: <span id="numbers">${prod.numbers}</span></p>
                           <button onclick= "eliminarDelCarrito(${prod.id})" class ="boton-eliminar"><i class= fas fa-trash-alt"></i></button>
                          `
          buyContainer.appendChild(div);
    
          localStorage.setItem("carrito", JSON.stringify(carrito))
          })
  
  
      // Sumatoria de Items y de Importe total//  
    
      countItem.innerText = carrito.length
      totalPrice.innerText = carrito.reduce((acc, prod) => acc + prod.numbers * prod.precio, 0)
    };