/////////////////////////-------------------- Programación Asincrona ---------------////////////////////////

////////////////////////////////// Temporizadores (setTimeout y setInterval) ///////////////////////////////
/*
console.log("Inicio");

setTimeout(()=>{
    console.log("Ejecutando un setTimeout, esto se ejecuta una sóla vez");
},3000);

setInterval(()=>{
    console.log("Ejecutando un setInterval, esto se ejecuta indefinidamente cada cierto intervalo de tiempo");
},1000);


let temporizador = setTimeout(()=>{
    console.log(new Date().toLocaleTimeString());
}, 1000);

clearTimeout(temporizador);
console.log("Despues del clearTimeout")


let temporizador = setInterval(()=>{
    console.log(new Date().toLocaleTimeString());
},1000);

clearInterval(temporizador);
console.log("Después del clearInterval");
*/

//////////////////////////////////////// Asincronia y el Event Loop //////////////////////////////////////

/*
Antes de explicar como funciona el modelo de Javascript es inportante entender algunos conceptos:

    -Procesamiento Single thread y Multi thread.
        Estos son los procesamientos multihilos dependiendo el lenguaje. Javascript cuenta con un Event
        Loop que sigue un solo hilo de procesamiento de codigo. 

    -Operaciones de CPU y Operaciones I/0.
        Una es como ejecutar un while. Esta es de input ouput(se espera el recurso solicitado), es como
        cuando envias un formulario y se carga en la base de datos o cuando se hace un pago en linea y
        se tiene que esperar que la api cobre o cuando se solicita datos en una api y se lo devuelve en 
        json.
    
    -Operaciones Concurrentes y Paralelas.
        Concurrencias: Es cuando 2 o mas tareas progresan simultaneamente (avanzan a la par).
        Paralelas: Es cuando 2 o mas tareas se ejecutan al mismo tiempo.

    -Operaciones Bloqueantes y No Bloqueantes.
        Bloqueantes: No va a devolver el control a la aplicación hasta que no haya terminado su tarea.
        No Bloqueantes: Se ejecutan y devuelven inmediatamente el control al hilo principal, no 
        importando si han terminado o no la tarea (en caso de que se haya completado devolvera la info 
        solicitada, y si falla, el codigo de error).

    -Operaciones Sincronas y Asincronas.
        Sincrona: Espera el resultado en tiempo presente.
        Asincrono: El resultado se aparece en un futuro.

    Javascript usa un modelo asíncrono y no bloqueante, con un loop de eventos implementado en un sólo
    hilo, (single thread) para operaciones de entrada y salida (input/ouput).
*/

//    Codigo Sincrono Bloqueante

(()=>{
  console.log("Código Síncrono");
  console.log("Inicio");
  
  function dos(){
      console.log("Dos");
  }

  function uno(){
      console.log("Uno");
      dos();
      console.log("Tres");
  }

  uno();
  console.log("Fin");
})();

console.log("************************");

// Codigo Asincrono No Bloqueante

(()=>{
    console.log("Código Asíncrono");
    console.log("Inicio");

    function dos(){
        setTimeout(function (){
            console.log("Dos");
        },1000);
    }

    function uno(){
        setTimeout(function (){
            console.log("Uno");
        },0);
        dos();
        console.log("Tres");
    }

    uno();
    console.log("Fin");
})();