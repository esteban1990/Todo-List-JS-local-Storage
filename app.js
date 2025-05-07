//definir variables
const contenido = document.querySelector("#contenido");
console.log(contenido);
const formulario = document.querySelector("#formulario"); //formulario
console.log(formulario)
const listaTweets = document.querySelector("#lista-tweets"); //lista de tweets  
console.log(listaTweets)
let tweetsArray = []




//definir EventListeners
loadedEventsListeners();

function loadedEventsListeners(){

    formulario.addEventListener("submit",agregarTweet);

   //Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || []; //obtener los tweets del local storage o un array vacio si no hay nada
        console.log(tweets);
        crearHtml(); //crear el html
    })

};





// Definir funciones
function agregarTweet(e){
    e.preventDefault();
    //validar el area de texto
    const tweet = document.querySelector("#tweet").value
    // si el area de texto esta vacio
    // mostrar un mensaje de error
    if(tweet.trim() === ""){
        mostrarError("El area de texto debe estar con palabras");
        return
    }
    //llamo a la funcion pára crear el objeto y que se guarde en el array tweetsArray
    leerDatosCuros(tweet);

    console.log(tweetsArray);
    formulario.reset();

    //LLAMO A LA FUNCION CREAR HTML PARA QUE SE ME RENDERIZE EN EL DIV CON ID #LISTA-TWEETS
    crearHtml();

}

function mostrarError(errorMsge){
    console.log(errorMsge)
    //crear el mensaje de error
    const error = document.createElement("p");
   
    error.textContent = errorMsge;
    //agregar clase al mensaje de error 
    error.classList.add("error");

    contenido.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 3000);
}

function leerDatosCuros(mensaje){
    console.log(mensaje);

    //Creo el obbjeto tweet seleccionado
    const objTweet = {
        id:Date.now(),
        texto:mensaje
    }
    // y lo guardo en el array tweetsArray
    // para que se muestre en el html
    tweetsArray = [...tweetsArray,objTweet]

}

function crearHtml() {

    limpiarHtml();

    if(tweetsArray.length > 0){

    tweetsArray.forEach((t) => {
        //agregar boton para cada elemento li
        const btnEliminar = document.createElement("a")
        btnEliminar.classList.add("borrar-tweet")
        btnEliminar.innerText = "X"
        
        btnEliminar.onclick = () => {
            // llamo a la funcion borrarTweet y le paso el id del tweet que quiero eliminar
            // para que se elimine del array tweetsArray    
            borrarTweet(t.id);
        }

        //crear el elemento li
        // y agregarle el texto del tweet   
        const li = document.createElement("li");
        li.innerText = t.texto;
        li.appendChild(btnEliminar);

        //agregar el boton al li
        //agregar el tweet a la lista
        listaTweets.appendChild(li);

        
    })
}
    sincronizarStorage(); //sincronizar el local storage con el array de tweets

}


function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets)); //convertir el array de tweets a un string y guardarlo en el local storage
}   


function borrarTweet(id){

    tweetsArray = tweetsArray.filter((tweet) => {
        return tweet.id !== id
    })

    // NUEVAMENTE LLAMO A LA FUNCION CREAR HTML PARA QUE SE ME RENDERIZE EN EL DIV CON ID #LISTA-TWEETS
    // Y SE ME ELIMINE EL TWEET QUE SE BORRO
    crearHtml();
}


function limpiarHtml(){

    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}





























































// //Variabales
// const container = document.querySelector("#contenido");
// console.log(container);
// const formulario = document.querySelector("#formulario");
// console.log(formulario);
// const listaTweets = document.querySelector("#lista-tweets");
// console.log(listaTweets);
// let tweets = [];    //Array de tweets

// //EventListeners
// loadedEventsListeners();



// function loadedEventsListeners(){

//     //Cuando el usuario agrega un  nuevo tweet    
//     formulario.addEventListener("submit", agregarTweet);

//     // Cuando el documento esta listo
//     document.addEventListener("DOMContentLoaded", () => {
//         tweets = JSON.parse(localStorage.getItem("tweets")) || []; //obtener los tweets del local storage o un array vacio si no hay nada
//         console.log(tweets);
//         crearHtml(); //crear el html
//     })

// };


// //funciones
// function agregarTweet(e) {
//     e.preventDefault();
//     //textarea 
//     const tweet = document.querySelector("#tweet").value;
//     // console.log(tweet);
//     //Validar el tweet
//     if(tweet.trim() === ""){
//         mensajeError("no puede ir vacio")
//         return; // termina la funcion
//     }
//     const objTweet = {
//         id:Date.now(), //id unico para cada tweet
//         texto:tweet //texto del tweet   
//     }
//     // console.log("agregando tweet")
//     tweets = [...tweets, objTweet]; //spread operator para agregar el tweet al array
//     // console.log(tweets); 

//     crearHtml(); //crear el html

//     //Reiniciar el formulario
//     formulario.reset(); //reiniciar el formulario   

// } 


// function mensajeError(mensaje){
//     const mensajeError = document.createElement("P");
//     mensajeError.textContent = mensaje;
//     mensajeError.classList.add("error");
//     //insertar en el contenido

//     container.appendChild(mensajeError);
//     //Eliminar el mensaje de error luego de 3 segundos
//     setTimeout(() => {
//         mensajeError.remove();
//     }, 3000); //3 segundos


// }


// function crearHtml() {


//     limpiarHtml(); //limpiar el html antes de agregar los nuevos tweets

//     if(tweets.length > 0){
//         tweets.forEach((t)=>{
//             //agregar boton para cada elemento li
//             const btnEliminar = document.createElement("a");
//             btnEliminar.classList.add("borrar-tweet"); //agregar clase al boton
//             btnEliminar.textContent = "X"; //texto del boton

//             //Añadir funcion para elimjinar el tweet
//             btnEliminar.onclick = () => {
//                 borrarTweet(t.id)
//             }
//             const li = document.createElement("li");
//             li.innerText = t.texto; //texto del tweet

//             //asignar el boton a cada elemento li
//             li.appendChild(btnEliminar); //agregar el boton al li   )


//             listaTweets.appendChild(li); //agregar el tweet a la lista
            
//         })
//     }
//     sincronzarStorage(); //sincronizar el local storage con el array de tweets
// }

// //argega los tweets acutalses al local storage
// function sincronzarStorage(){
//     localStorage.setItem("tweets", JSON.stringify(tweets)); //convertir el array de tweets a un string y guardarlo en el local storage
// }   



// //elimina el twet

// function borrarTweet(id){

//     tweets = tweets.filter((tweet) => {
//         return tweet.id !== id; //filtrar los tweets que no son iguales al id del tweet que se quiere eliminar 
//     })
//     crearHtml(); //crear el html
//     // console.log(tweets);
// }

// function limpiarHtml(){
//     while(listaTweets.firstChild){ //mientras haya un hijo en la lista
//         listaTweets.removeChild(listaTweets.firstChild); //eliminar el primer hijo
//     }
// }






