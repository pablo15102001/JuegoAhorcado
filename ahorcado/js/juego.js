//referencias a botones
let enviarLetra = document.querySelector("#enviarLetra");







function dibujarAhorcado (intento) {
    const canvas = document.querySelector("#ahorcadoCanvas");
    const ctx = canvas.getContext("2d");                            //Se establece el contexto o dimensiones
    ctx.fillStyle = "blue";                                         //Se establece el color del dibujo
    ctx.clearRect(0,0, canvas.width, canvas.height);                //Limpia el dibujo de la posicion 0 0 a todo lo alto y ancho del canvas
    if (intento <= intentos -1) {
        ctx.fillRect(10, 190, 180, 10);                             //Poste horizontal
    }
    if (intento <= intentos -2) {
        ctx.fillRect(40, 10, 10, 180);                              //Poste vertical
    }
    if (intento <= intentos -3) {
        ctx.fillRect(40, 0, 100, 10);                               //Arco de la horca
    }
    if (intento <= intentos -4) {
        ctx.fillStyle ="Black";
        ctx.fillRect(130, 10, 5, 15);                               //Cuerda
    }
    if (intento <= intentos -5) {
        ctx.beginPath();                                            //Funcion para empezar a dibujar un circulo
        ctx.arc(132, 42, 17, 0, 2 * Math.PI);                       //Cabeza del muñeco
        ctx.stroke();                                               //Confirmar el dibujar circulo
    }
    if (intento <= intentos -6) {
        ctx.fillRect(131, 59, 2, 70);                               //Cuerpo
    }
    if (intento <= intentos -7) {
        ctx.beginPath();                                            //Funcion para empezar a dibujar la linea inclinada
        ctx.moveTo(131, 70);                                        //Inicio del brazo izquierdo
        ctx.lineTo(110, 100);                                       //Termina el brazo izquierdo
        ctx.stroke();                                               //Confirmar el dibujar la linea
    }
    if (intento <= intentos -8) {
        ctx.beginPath();                                            //Funcion para empezar a dibujar la linea inclinada
        ctx.moveTo(133, 70);                                        //Inicio del brazo derecho
        ctx.lineTo(155, 100);                                       //Termina el brazo derecho
        ctx.stroke();                                               //Confirmar el dibujar la linea
    }
    if (intento <= intentos -9) {
        ctx.beginPath();                                            //Funcion para empezar a dibujar la linea inclinada
        ctx.moveTo(131, 129);                                       //Inicio del pie izquierdo
        ctx.lineTo(110, 160);                                       //Termina el pie izquierdo
        ctx.stroke();                                               //Confirmar el dibujar la linea
    }
    if (intento <= intentos -10) {
        ctx.beginPath();                                            //Funcion para empezar a dibujar la linea inclinada
        ctx.moveTo(133, 129);                                       //Inicio del pie derecho
        ctx.lineTo(155, 160);                                       //Termina el pie derecho
        ctx.stroke();                                               //Confirmar el dibujar la linea
    }
}


//Definicion de clases

class Ahorcado {
    //definimos las propiedades
    palabra = "";
    intentos = "";
    constructor (palabra, intentos) {
        this.palabra = palabra;
        this.intentos = intentos;
        this.letrasAdivinadas = [];
        this.letrasIncorrectas = [];
        this.estado = "jugando";
    }

    obtenerPalabra () {
        let palabraMostrada = "";
        for (const letra of this.palabra) {
            if (this.letrasAdivinadas.includes(letra)) {
                palabraMostrada += letra + " ";
            } else {
                palabraMostrada += "_ ";
            }
        }
        return palabraMostrada.trim();
    }

    obtenerPalabrasIncorrectas(){
        letrasIncorrectas.textContent = this.letrasIncorrectas;
    }

    actualizarPalabraMostrada () {
        document.querySelector("#palabra").textContent = this.obtenerPalabra();
    }



    verificarLetra () {
        let letraEnviada = document.getElementById("letra").value;
        console.log(letraEnviada);
        if(this.palabra.includes(letraEnviada)){
            this.letrasAdivinadas.push(letraEnviada);
            this.actualizarPalabraMostrada();
            document.getElementById("letra").value="";
        }else {
            this.intentos--;
            this.letrasIncorrectas.push(letraEnviada);
            intentosRestantes.textContent = this.intentos;
            dibujarAhorcado(this.intentos);
            document.getElementById("letra").value="";
           this.obtenerPalabrasIncorrectas();
            
            
        }
}
}

//Referencias al html

let intentosRestantes = document.querySelector("#intentos");
let letrasIncorrectas = document.querySelector("#letrasPulsadas");
//Inicializar el juego

function empezar () {
    juego.actualizarPalabraMostrada();
    juego.estado = "jugando";
    juego.intentos = 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector("#letra").value = "";
    document.querySelector("#letra").focus();
}

document.getElementById("enviarLetra").addEventListener("click", function() {
    
    juego.verificarLetra();
    
});




const juego = new Ahorcado("alcachofa", 10);
intentosRestantes.textContent = juego.intentos;
intentos = juego.intentos;
juego.actualizarPalabraMostrada();
