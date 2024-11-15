function dibujarAhorcado () {
    const canvas = document.querySelector("#ahorcadoCanvas");
    const ctx = canvas.getContext("2d");                            //Se establece el contexto o dimensiones
    ctx.fillStyle = "#D2691E";                                         //Se establece el color del dibujo
    ctx.clearRect(0,0, canvas.width, canvas.height);                //Limpia el dibujo de la posicion 0 0 a todo lo alto y ancho del canvas
   


    
   

      
          ctx.fillRect(10, 190, 180, 10);                             //Poste horizontal
          ctx.fillRect(40, 10, 10, 180);                              //Poste vertical

          ctx.fillRect(40, 0, 100, 10);                               //Arco de la horca
  
     
          ctx.fillStyle ="#B8860B";
          ctx.fillRect(130, 10, 5, 15);                               //Cuerda
      




      
          ctx.beginPath();                                            //Funcion para empezar a dibujar un circulo
          ctx.arc(132, 45, 25, 0, 2 * Math.PI);
          ctx.lineWidth = 6;                                             //Cabeza del muñeco
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
          /************* */
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
    
          ctx.strokeStyle = "black"; // Color del borde
          ctx.lineWidth = 5; // Grosor del borde
          ctx.stroke();                               //Cuerpo
      
      
          ctx.beginPath();                                            //Funcion para empezar a dibujar la linea inclinada
          ctx.ellipse(102, 100, 8, 25, Math.PI / 4, 0, Math.PI * 2);  
    
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                        //Termina el brazo izquierdo
          ctx.stroke();                                               //Confirmar el dibujar la linea
      
     
          ctx.beginPath();                                            //Funcion para empezar a dibujar la linea inclinada
          ctx.ellipse(165, 100, 8, 25, Math.PI / -4, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;
          ctx.stroke();                                               //Confirmar el dibujar la linea
      
      
          ctx.beginPath();                                            //Funcion para empezar a dibujar la linea inclinada
          ctx.ellipse(153, 160, 8, 25, Math.PI / -8, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                      
          ctx.stroke();                                              
     
    
          ctx.beginPath();                                            //Funcion para empezar a dibujar la linea inclinada
          ctx.ellipse(114, 160, 8, 25, Math.PI / 8, 0, Math.PI * 2);  
          ctx.strokeStyle = "black"; 
          ctx.lineWidth = 5;                                       //Termina el pie derecho
          ctx.stroke();                                               //Confirmar el dibujar la linea
      
    
}
dibujarAhorcado();