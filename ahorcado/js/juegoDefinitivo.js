//referencias al html y creacion de variables globales
let enviarLetra = document.querySelector("#enviarLetra");
let facil = document.querySelector("#facil");
let medio = document.querySelector("#medio");
let dificil = document.querySelector("#dificil");
let imposible = document.querySelector("#imposible");
let reiniciar = document.querySelector("#reiniciar");
let palabrasJson=[];
let canvas = document.querySelector("#ahorcadoCanvas");
let ctx = canvas.getContext("2d");
let mensaje = document.querySelector("#mensaje");
let palabraJuego;
let intentos;
let dificultadSeleccionada;
let puntuaciones = document.querySelector("#puntuaciones");
let intentosRestantes = document.querySelector("#intentos");
let letrasIncorrectas = document.querySelector("#letrasPulsadas");
var audio = document.getElementById("acierto");

let puntuacionJugador = document.createElement("li");
 
/**************************************** */
//defino la dificultad con un array asociativo para despues usar la dificultad de distintas formas
let dificultad = {
    "facil" : 10,
    "media" : 6 ,
    "dificil" : 4,
    "imposible" : 1

};

/************************************************************************************************* */
//creo la clase ahorcado
class Ahorcado {
    //definimos las propiedades
    palabra ="";
    intentos = "";
    constructor (palabra, intentos) {
        this.palabra = palabra;
        this.intentos = intentos;
        this.letrasAdivinadas = [];
        this.letrasIncorrectas = [];
        this.estado = "jugando";
    }
    //funcion letras correctas
    letrasCorrectas(){
      return this.letrasAdivinadas;
    }
    //funcion obtenerPalabra
    obtenerPalabra () {
        let palabraMostrada = "";
        //recorremos con un for of la palabra
        for (const letra of this.palabra) {
          //ponemos la palabra como espacios y _
            if (this.letrasAdivinadas.includes(letra)) {
                palabraMostrada += letra + " ";
            } else {
                palabraMostrada += "_ ";
            }
        }
        return palabraMostrada.trim();
    }
    //obtenemos las letras incorectas
    obtenerPalabrasIncorrectas(){
      //las ponemos en el html
        letrasIncorrectas.textContent = this.letrasIncorrectas;
    }
    //actualizamos la palabra si han adivinado alguna letra
    actualizarPalabraMostrada () {
        document.querySelector("#palabra").textContent = this.obtenerPalabra();
    }


       


//verificamos cada letra que nos envian por el textare
    verificarLetra () {
      //definimos la variable letraEnviada
        let letraEnviada = document.getElementById("letra").value;
      //creamos un condicional y dependiendo de si la letra esta o no esta hacemos una cosa u otra
        if(this.palabra.includes(letraEnviada)){
          //si la letra esta en la palabra la incluimos a letrasAdivinadas y con el includes hacemos que no se puedan repetir
            if(this.letrasAdivinadas.includes(letraEnviada)==false){
                this.letrasAdivinadas.push(letraEnviada);
                //reproducimos el sonido de acierto 
                acierto.play();
            } 
            //actualizamos la palabra
            this.actualizarPalabraMostrada();
            document.getElementById("letra").value="";
        }else {
          //si es incorrecta restamos intento y enviamos la letra a incorrectas el includes sirve para lo mismo de antes
            if(this.letrasIncorrectas.includes(letraEnviada)==false){  
            this.intentos--;     
            this.letrasIncorrectas.push(letraEnviada);
            intentosRestantes.textContent = this.intentos;
            //dibujamos el ahorcado
            dibujarAhorcado(this.intentos);
            document.getElementById("letra").value="";
           this.obtenerPalabrasIncorrectas();
           //sonido de error
           error.play();
        } 
        document.getElementById("letra").value="";
        
        }
        //definimos que si pierde ponga el mensaje
        if(this.intentos ==0){
          mensaje.innerHTML="has perdido x_x";
          //sonido de perder
          perdedor.play();
          //compruebo si ha ganado el jugador recorriendo el array y comparandolo letra a letra evitando letras repetidas
        }else if (this.palabra.split("").every(letra => this.letrasAdivinadas.includes(letra))) {
          //creo la puntuacion
            let puntuacion = 100 + this.intentos * 10 + 100 / dificultad[dificultadSeleccionada];
            //mensaje de ganador con sus puntos
            mensaje.innerHTML = "Has ganado has conseguido " + puntuacion + " Puntos";
            //sonido ganador
            ganador.play();
           puntuacionJugador.textContent = "Puntuacion anterior "+puntuacion+" "+dificultadSeleccionada;
           document.getElementById("puntuaciones").appendChild(puntuacionJugador);
            
        }

        

    }

//funcion reiniciar
    reiniciar() {
      //pongo las letras adivinadas a 0 y las incorrectas igual
        this.letrasAdivinadas = [];
        this.letrasIncorrectas = [];
        //establezco la dificulta que sea la misma que la anterior por si el jugador intenta jugar directamente en vez de selecionar dificultad
        this.intentos = dificultad[dificultadSeleccionada];
        //pongo que establezca los intentos
        document.querySelector("#intentos").innerHTML = intentos;
        //borro el mensaje de ganar o perder
        mensaje.innerHTML="";
        //establezco una nueva palabra por lo mismo de antes
        this.palabra = palabraAlAzar();
        //actualizo palabra
        this.actualizarPalabraMostrada();
        //obtengo palabras incorrectas
        this.obtenerPalabrasIncorrectas();
        //obtengo las letras correctas
        this.letrasCorrectas();
        
        
}
}

/***************************************************************************************** */
//creo la funcion numero aleatiorio para elegir la palabra
function numeroAleatorio() {
    return Math.floor(Math.random() * 98) + 1;
}
//creo la funcion palabra al azar que genera una palabra del array que voy a crear en el fecht
function palabraAlAzar(){

    let palabraJuego ; 

    palabraJuego = palabrasJson[numeroAleatorio()];

    return palabraJuego;
}

/********************************************************************************* */
//funcion para borrar el ahorcado
function borrarAhoracado(){
                                                                    
    ctx.clearRect(0,0, canvas.width, canvas.height);                
}

//funcion para dibujar el ahoracado
function dibujarAhorcado (intento) {
  //referenciamos el canvas del html
    const canvas = document.querySelector("#ahorcadoCanvas");
    //creamos el contexto
    const ctx = canvas.getContext("2d");
    //definimos el color                           
    ctx.fillStyle = "#D2691E";
    //limpiamos el canvas                                         
    ctx.clearRect(0,0, canvas.width, canvas.height);                
   


    //establecemos que si la dificultad es facil se pinte de uno en uno al ser 10 intentos 
    if(dificultadSeleccionada=="facil"){
      //palo horizontal 
      if (intento <= intentos -1) {
          ctx.fillRect(10, 190, 180, 10);                             
      }//palo vertical
      if (intento <= intentos -2) {
          ctx.fillRect(40, 10, 10, 180);                              
      }//palo horizontal de arriba
      if (intento <= intentos -3) {
          ctx.fillRect(40, 0, 100, 10);                               
      }//horca
      if (intento <= intentos -4) {
        ctx.fillStyle ="#B8860B";
          ctx.fillRect(130, 10, 5, 15);                               
      }//cabeza
      if (intento <= intentos -5) {
        ctx.beginPath();                                            
        ctx.arc(132, 45, 25, 0, 2 * Math.PI);
        ctx.lineWidth = 6;                                             
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 4;                                            
        ctx.moveTo(131, 40);                                        
        ctx.lineTo(120, 55);                                       
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 4;                                            
        ctx.moveTo(120, 40);                                        
        ctx.lineTo(131, 55);                                       
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 4;                                            
        ctx.moveTo(146, 40);                                        
        ctx.lineTo(135, 55);                                       
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 4;                                            
        ctx.moveTo(135, 40);                                        
        ctx.lineTo(146, 55);                                       
        ctx.stroke();                                               
      }//cuerpo
      if (intento <= intentos -6) {
        ctx.beginPath();
        ctx.ellipse(133, 110, 15, 40, 0, 0, Math.PI * 2); 
  
        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 5; 
        ctx.stroke();                               
      }//brazo derechi
      if (intento <= intentos -7) {
        ctx.beginPath();                                            
        ctx.ellipse(102, 100, 8, 25, Math.PI / 4, 0, Math.PI * 2);  
  
        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 5;                                        
        ctx.stroke();                                               
      }//brazo izquierdo
      if (intento <= intentos -8) {
        ctx.beginPath();                                            
        ctx.ellipse(165, 100, 8, 25, Math.PI / -4, 0, Math.PI * 2);  
        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 5;
        ctx.stroke();                                               
      }//pierna derecha
      if (intento <= intentos -9) {
        ctx.beginPath();                                            
        ctx.ellipse(153, 160, 8, 25, Math.PI / -8, 0, Math.PI * 2);  
        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 5;                                      
        ctx.stroke();                                               
      }//pierna izquierda
      if (intento <= intentos -10) {
        ctx.beginPath();                                            
        ctx.ellipse(114, 160, 8, 25, Math.PI / 8, 0, Math.PI * 2);  
        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 5;                                       
        ctx.stroke();                                               
      }

      //aquí exactamente igual pero se pintan para el nivel medio
    } if(dificultadSeleccionada=="media"){
        if (intento <= intentos -1) {
            ctx.fillRect(10, 190, 180, 10);                             
            ctx.fillRect(40, 10, 10, 180);
        }
        if (intento <= intentos -2) {
            ctx.fillRect(40, 0, 100, 10);                              
            ctx.fillStyle ="#B8860B";
            ctx.fillRect(130, 10, 5, 15);                               
        }
        if (intento <= intentos -3) {
          ctx.beginPath();                                            
          ctx.arc(132, 45, 25, 0, 2 * Math.PI);
          ctx.lineWidth = 6;                                             
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(131, 40);                                        
          ctx.lineTo(120, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(120, 40);                                        
          ctx.lineTo(131, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(146, 40);                                        
          ctx.lineTo(135, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(135, 40);                                        
          ctx.lineTo(146, 55);                                       
          ctx.stroke();                                               
          ctx.beginPath();
          ctx.ellipse(133, 110, 15, 40, 0, 0, Math.PI * 2); 
    
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5; 
          ctx.stroke();                               
        }
        if (intento <= intentos -4) {
          ctx.beginPath();                                            
          ctx.ellipse(102, 100, 8, 25, Math.PI / 4, 0, Math.PI * 2);  
    
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                        
          ctx.stroke();                                               
          ctx.beginPath();                                            
          ctx.ellipse(165, 100, 8, 25, Math.PI / -4, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;
          ctx.stroke();                                               
        }
        if (intento <= intentos -5) {
          ctx.beginPath();                                            
          ctx.ellipse(153, 160, 8, 25, Math.PI / -8, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                      
          ctx.stroke();                                              
        }
        if (intento <= intentos -6) {
          ctx.beginPath();                                            
          ctx.ellipse(114, 160, 8, 25, Math.PI / 8, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                      
          ctx.stroke();                                              
        }




        //aquí exactamente igual pero se pintan para el nivel dificil
    }if(dificultadSeleccionada=="dificil"){

        if (intento <= intentos -1) {
            ctx.fillRect(10, 190, 180, 10);                            
        
        
            ctx.fillRect(40, 10, 10, 180);                              
        
       
            ctx.fillRect(40, 0, 100, 10);                               
        
       
          ctx.fillStyle ="#B8860B";
            ctx.fillRect(130, 10, 5, 15);                               
        }
        if (intento <= intentos -2) {
          ctx.beginPath();                                           
          ctx.arc(132, 45, 25, 0, 2 * Math.PI);
          ctx.lineWidth = 6;                                             
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(131, 40);                                        
          ctx.lineTo(120, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(120, 40);                                        
          ctx.lineTo(131, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(146, 40);                                        
          ctx.lineTo(135, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(135, 40);                                        
          ctx.lineTo(146, 55);                                       
          ctx.stroke();                                               
        
        
          ctx.beginPath();
          ctx.ellipse(133, 110, 15, 40, 0, 0, Math.PI * 2); 
    
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5; 
          ctx.stroke();                               
        
        
          ctx.beginPath();                                            
          ctx.ellipse(102, 100, 8, 25, Math.PI / 4, 0, Math.PI * 2);  
    
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                        
          ctx.stroke();                                               
        }
        if (intento <= intentos -3) {
          ctx.beginPath();                                            
          ctx.ellipse(165, 100, 8, 25, Math.PI / -4, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;
          ctx.stroke();                                               
        
        
          ctx.beginPath();                                            
          ctx.ellipse(153, 160, 8, 25, Math.PI / -8, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                      
          ctx.stroke();                                               
        }
        if (intento <= intentos -4) {
          ctx.beginPath();                                            
          ctx.ellipse(114, 160, 8, 25, Math.PI / 8, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                       
          ctx.stroke();                                               
        }

        //aquí exactamente igual pero se pintan para el nivel imposible todo de golpe
    }if(dificultadSeleccionada == "imposible"){

        if (intento <= intentos -1) {
            ctx.fillRect(10, 190, 180, 10);                             
        
        
            ctx.fillRect(40, 10, 10, 180);                             
        
        
            ctx.fillRect(40, 0, 100, 10);                               
        
        
          ctx.fillStyle ="#B8860B";
            ctx.fillRect(130, 10, 5, 15);                              
        
        
          ctx.beginPath();                                            
          ctx.arc(132, 45, 25, 0, 2 * Math.PI);
          ctx.lineWidth = 6;                                             
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(131, 40);                                        
          ctx.lineTo(120, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(120, 40);                                        
          ctx.lineTo(131, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(146, 40);                                        
          ctx.lineTo(135, 55);                                       
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 4;                                            
          ctx.moveTo(135, 40);                                        
          ctx.lineTo(146, 55);                                       
          ctx.stroke();                                               
        
       
          ctx.beginPath();
          ctx.ellipse(133, 110, 15, 40, 0, 0, Math.PI * 2); 
    
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5; 
          ctx.stroke();                               
        
        
          ctx.beginPath();                                            
          ctx.ellipse(102, 100, 8, 25, Math.PI / 4, 0, Math.PI * 2);  
    
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                        
          ctx.stroke();                                               
        
        
          ctx.beginPath();                                            
          ctx.ellipse(165, 100, 8, 25, Math.PI / -4, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;
          ctx.stroke();                                               
        
        
          ctx.beginPath();                                            
          ctx.ellipse(153, 160, 8, 25, Math.PI / -8, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                      
          ctx.stroke();                                               
        
        
          ctx.beginPath();                                            
          ctx.ellipse(114, 160, 8, 25, Math.PI / 8, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                       
          ctx.stroke();                                               
        }



    }
    
  }


/******************************************************************************************************** */

//referenciamos con fetch el json donde se encuentran nuestras palabras para tener acceso a distintas palabras
//Creamos un array con las palabras y lo guardamos

fetch('http://localhost:3000/palabras')
  .then(respuesta => respuesta.json())
  .then(datos => {
    mostrarDatos(datos);
/************************************************************************************************************* */    
//creo un addEventListener del boton facil que:
    facil.addEventListener("click", function (){
      //estalece la dificultad en facil define los intentos correspondientes
        dificultadSeleccionada = "facil";
        intentos = dificultad[dificultadSeleccionada];
        //crea una nueva palabra aleatoria
       palabraJuego =palabraAlAzar();
        //llama a la funcion empezar juego
        empezarJuego();
        
       
       });
       //creo un addEventListener del boton media que:
       medio.addEventListener("click", function (){
        //estalece la dificultad en media define los intentos correspondientes
           dificultadSeleccionada = "media";
           intentos = dificultad[dificultadSeleccionada];
           //crea una nueva palabra aleatoria
           palabraJuego = palabraAlAzar();
           //llama a la funcion empezar juego
           empezarJuego();
           
          
          });
       //creo un addEventListener del boton dificil que:
       dificil.addEventListener("click", function (){
        //estalece la dificultad en dificil define los intentos correspondientes
           dificultadSeleccionada = "dificil";
           intentos = dificultad[dificultadSeleccionada];
           //crea una nueva palabra aleatoria
           palabraJuego = palabraAlAzar();
           //llama a la funcion empezar juego
           empezarJuego();
           
          
          });
          //creo un addEventListener del boton imposible que: 
          imposible.addEventListener("click", function (){
          //estalece la dificultad en imposible define los intentos correspondientes
           dificultadSeleccionada = "imposible";
           intentos = dificultad[dificultadSeleccionada];
           //crea una nueva palabra aleatoria
           palabraJuego = palabraAlAzar();
           //llama a la funcion empezar juego
           empezarJuego();
          });

          //creo un addEventListener del boton reiniciar que:
          reiniciar.addEventListener("click", function (){
            //llama a la funcion borrar ahorcado
            borrarAhoracado();
            //llama a la funcion reiniciar de juego
            juego.reiniciar();
            //llama a la funcion obtener palabra
            juego.obtenerPalabra();
            //llama a la funcion actualizar palabra de juego 
            juego.actualizarPalabraMostrada();
            //actualizamos la palabra 
            juego.actualizarPalabraMostrada();
            //obtenemos las palabras incorrectas
            juego.obtenerPalabrasIncorrectas();
            //defino que la dificultad sea la misma por si al jugador le da por jugar directamente evitando asi posibles errores
            juego.intentos = dificultad[dificultadSeleccionada];
            //pongo el mensaje predefinido en el html para que selecionen la dificultad
            document.querySelector("#intentos").innerHTML="Selecione dificultad";
          
          });

  //con la funcion mostrar datos recogeos las palabras y las introducimos en el array palabras json
    function mostrarDatos(datos){
  
        function recogerPalabras(datos){
          for(const dato of datos){
              palabrasJson.push(dato.palabra);
              
          }
          console.log(palabrasJson);
          
        }
        recogerPalabras(datos);
        return palabrasJson;
      }
      
      //creamos la funcion empezar juego en la que creamos la instancia de la clase ahoracado llamado juego          
      function empezarJuego(){
        //creamos la instancia juego con la variable palabaJuego y la variable intentos
        juego = new Ahorcado(palabraJuego,intentos);
        
        //hacemos que el contenido de intentosRestantes en el html se establezca con los intentos del juego
        intentosRestantes.textContent = juego.intentos;
        //actualizamos la palabra mostrada
        juego.actualizarPalabraMostrada();
        //obtenemos la palabra mostrada
        juego.obtenerPalabra();
        //creo un addEventListener del boton combrobar letra que llama a la funcion verificar letra de juego
        document.getElementById("enviarLetra").addEventListener("click", function() {
          
          juego.verificarLetra();
          
      });
      
              
      }
      

  });
  



 




