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
/*
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
*/

//////////////////////////////////////////////// Callbacks ///////////////////////////////////////////////
// "|" este toma el segundo valor si el primero es nulo. Sino lo suma. 
/*
function cuadradoCallback(value, callback){
    setTimeout(()=>{
        callback(value, value*value);
    }, 0|Math.random()*1000);
}

cuadradoCallback(0, (value, result)=>{
    console.log("Inicia Callback");
    console.log(`Callback: ${value}, ${result}`);
    cuadradoCallback(1, (value, result)=>{
        console.log(`Callback: ${value}, ${result}`);
        cuadradoCallback(2, (value, result)=>{
            console.log(`Callback: ${value}, ${result}`);
            cuadradoCallback(3, (value, result)=>{
                console.log(`Callback: ${value}, ${result}`);
                cuadradoCallback(4, (value, result)=>{
                    console.log(`Callback: ${value}, ${result}`);
                    cuadradoCallback(5, (value, result)=>{
                        console.log(`Callback: ${value}, ${result}`);
                        console.log("Fin del Callback!!");
                    });
                });
            });
        });
    });
});
*/
/////////////////////////////////////////////// Promesas ////////////////////////////////////////////////
// CONVIENE USAR CUANDO HAY UNA CONCATENACION DE VARIOS PROCESOS ASINCRONOS
/*
function cuadradoPromise(value){
    if(typeof value !== "number") 
    return Promise.reject(`Error, el valor "${value}" ingresado no es un número`);
    
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({
                value,
                result:value*value
            });
        }, 0|Math.random()*1000);
    });
};

cuadradoPromise(0)
.then(obj=>{
    //console.log(obj);
    console.log("Inicia Promise");
    console.log(`Promise ${obj.value}, ${obj.result}`);
    return cuadradoPromise(1);
})
.then(obj=>{
    console.log(`Promise ${obj.value}, ${obj.result}`)
    return cuadradoPromise(2);
})
.then(obj=>{
    console.log(`Promise ${obj.value}, ${obj.result}`)
    return cuadradoPromise("3");
})
.then(obj=>{
    console.log(`Promise ${obj.value}, ${obj.result}`)
    return cuadradoPromise(4);
})
.then(obj=>{
    console.log(`Promise ${obj.value}, ${obj.result}`)
    return cuadradoPromise(5);
})
.then(obj=>{
    console.log(`Promise ${obj.value}, ${obj.result}`)
    console.log("Fin del Promise");
})
.catch(err=>console.error(err));
*/

///////////////////////////////// Funciones Asincronas (Async - Await) ////////////////////////////////////
//Estas complementan a las promises
/*
function cuadradoPromise(value){
    if(typeof value !== "number") 
    return Promise.reject(`Error, el valor "${value}" ingresado no es un número`);
    
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({
                value,
                result:value*value
            });
        }, 0|Math.random()*1000);
    });
};

async function funcionAsincronaDeclarada (){
    try{
        console.log("Inicio Async Function");

        let obj = await cuadradoPromise(0);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);
    
        obj = await cuadradoPromise(1);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);

        obj = await cuadradoPromise(2);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);
        
        obj = await cuadradoPromise(3);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);
        
        obj = await cuadradoPromise("4");
        console.log(`Async Function: ${obj.value}, ${obj.result}`);

        obj = await cuadradoPromise(5);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);

        console.log("Fin de la Async Function");
    }catch(err){
        console.error(err)
    }
}

funcionAsincronaDeclarada();

const funcionAsincronaExpresada = async ()=>{
    try{
        console.log("Inicio Async Function");

        obj = await cuadradoPromise(6);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);
    
        obj = await cuadradoPromise(7);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);

        obj = await cuadradoPromise(8);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);
        
        obj = await cuadradoPromise("9");
        console.log(`Async Function: ${obj.value}, ${obj.result}`);
        
        obj = await cuadradoPromise(10);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);

        console.log("Fin de la Async Function");
    }catch(err){
        console.error(err)
    }
}

funcionAsincronaExpresada();
*/
