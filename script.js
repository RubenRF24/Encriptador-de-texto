let botonEncriptador = document.querySelector("#boton-encriptar"); //Obtenemos las caracteristicas del boton encriptar
let botonDesencriptador = document.querySelector("#boton-desencriptar"); //Obtenemos las caracteristicas del boton desencriptador
let botonCopiar = document.querySelector("#boton-copiar") //Obtenemos las caracteristicas del boton copiar
let li = document.querySelector("li") //Obtenemos el elemento li el cual usaremos para cambiar nuestro contenedor al momento de mostrar los distintos mensajes


//Arreglos con las llaves de encriptacion para nuestros mensajes
const coincidenciasEncriptacion = [/e/gi,/i/gi,/a/gi,/o/gi,/u/gi]
const traduccionEncriptacion = ["enter","imes","ai","ober","ufat"]

const coincidenciasDesencriptacion = [/enter/gi,/imes/gi,/ai/gi,/ober/gi,/ufat/gi];
const traduccionDesencriptacion = ["e","i","a","o","u"]

function obtenerCadena() { //Con esta funcion obtenemos y retornamos el mensaje escrito por nuestro usuario
    let cadenaUsuario = document.getElementById("mensaje-principal").value; //Obtenemos el valor ingresado por nuestro usuario
    return cadenaUsuario;
}

function mensajeNoEncontrado(){ //Funcion utilizada para decirle a nuestro usuario que no existe ningun mensaje para encriptar
    li.removeAttribute("id") //Si ha encriptado un mensaje anteriormente se borrara el id el cual esta ligado con los estilos utilizados para mostrarlos 
    document.querySelector(".imagen-resultado").setAttribute("src","imagenes/animal-penguin.png")
    document.getElementById("mensaje-estado").innerHTML="Ningun mensaje fue encontrado" //Cambiamos el mensaje en nuestro <h2>
    document.getElementById("mensaje-resultado").innerHTML="Ingresa el mensaje que desses encriptar o desencriptar" ////Cambiamos el mensaje en nuestro <p>
}

function mensajeLetraMayuscula(){ //Funcion utilizada para decirle a nuestro usuario que hay una letra mayuscula en su mensaje
    li.removeAttribute("id") //Mismo funcionamiento que en la anterior function
    document.querySelector(".imagen-resultado").setAttribute("src","imagenes/pajaro-enojado.png")
    document.getElementById("mensaje-estado").innerHTML="Hay mayusculas en tu mensaje"
    document.getElementById("mensaje-resultado").innerHTML="Recuerda que no esta permitido el uso de mayusculas en tu mensaje"
}

function mensajeAcentos(){ //Funcion utilizada para decirle a nuestro usuario que hay un acento en su mensaje
    li.removeAttribute("id") //Mismo funcionamiento que en la anterior function
    document.querySelector(".imagen-resultado").setAttribute("src","imagenes/pajaro-enojado.png")
    document.getElementById("mensaje-estado").innerHTML="Hay acentos en tu mensaje"
    document.getElementById("mensaje-resultado").innerHTML="Recuerda que no esta permitido el uso de acentos en tu mensaje"
}

function esMayuscula(letra){ //Funcion utilizada para decidir si una letra es mayuscula
    if(letra === " ") return false //Condicion utilizada para obviar los espacios en el mensaje extraido
    if((letra.charCodeAt(0) >= 65) && (letra.charCodeAt(0) <= 90)) return true 
    if((letra.charCodeAt(0) < 97) || (letra.charCodeAt(0) > 122)) return false //Condiciones utilizada para obviar los signos que no sean letras

    return letra === letra.toUpperCase(); //Retornamos un  valor booleano el cual nos indica si la letra evaluada se encuentra en mayuscula
}

function detectarMayusculas(cadena) { //Funcion utilizada para evaluar todos los caracteres de la cadena extraida
    let encontrado = false;
    for(var i = 0; i < cadena.length; i++){//Evaluamos cada caracter buscando alguna mayuscula
        let letraActual = cadena.charAt(i);
        if(esMayuscula(letraActual)){
            encontrado = true;
            break;
        }
    }
    return encontrado;
}

function eliminarAcentos(texto) { //Funcion usada para eliminar los acentos de una cadena de texto
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

function detectarAcentos(cadena) { //Funcion usada para evaluar si nuestra cadena contiene algun acento en alguno de sus caracteres
    return cadena === eliminarAcentos(cadena)
}

function verificaciones() { //Funcion usada para evaluar si el mensaje escrito por nuestro usuario cumple con todos los requisitos para encriptar su mensaje
    let cadena = obtenerCadena(); //Obtenemos el mensaje
    if(cadena === "") {mensajeNoEncontrado()
        throw new Error("El texto debe tener almenos una letra")} //Evaluamos si es una cadena vacia
    if(detectarMayusculas(cadena)){
        mensajeLetraMayuscula()
        throw new Error("El mensaje no puede contener letras mayusculas")} //Evaluamos si el mensaje contiene letras mayusculas 
    if(!detectarAcentos(cadena)){
        mensajeAcentos()
        throw new Error("El mensaje no puede contener acentos")} //Evaluamos si el mensaje contiene acentos

    return cadena //Retornamos la cadena obtenida
}

function obtenerMensaje(coincidencias,traduccion,cadena){ //Funcion usada para obtener el mensaje Encriptado o Desencriptado
    for(var i = 0; i < coincidencias.length; i++){
        cadena = cadena.replace(coincidencias[i],traduccion[i]) //Reemplazamos las llaves de encriptacion para obtener nuestro mensaje
    }

    return cadena //Retornamos la cadena encriptada o desencriptada
}

function mostrarResultado(cadena) { //Funcion usada para mostrar el resultado al usuario
    li.setAttribute("id","mensaje-encriptado") //Usamos esta propiedad para añadirle un id a nuestro elementos <li> y asi aplicar los estilos necesarios para mostrar el resultado al usuario
    document.getElementById("mensaje-resultado").innerHTML=cadena; //Mostramos la cadena obtenida en pantalla
}

function encriptarMensaje() { //Funcion usada para encriptar los mensajes
    let cadena = verificaciones() //Verificamos todos los requisitos
    cadena = obtenerMensaje(coincidenciasEncriptacion,traduccionEncriptacion,cadena) //Obtenemos la cadena encriptada
    mostrarResultado(cadena) //Mostramos el resultado en pantalla
}

function desencriptarMensaje() { //Funcion usada para desencriptar los mensajes
    let cadena = verificaciones()
    cadena = obtenerMensaje(coincidenciasDesencriptacion,traduccionDesencriptacion,cadena)
    mostrarResultado(cadena)
}

function copiar() { //Funcion usada para copiar el resultado en pantalla
    var codigoACopiar = document.getElementById('mensaje-resultado'); //Seleccionamos lo que queremos copiar
    var seleccion = document.createRange(); //Creamos un rango de seleccion
    seleccion.selectNodeContents(codigoACopiar); //Seleccionamos el contenido
    window.getSelection().removeAllRanges(); //Removemos todos los rangos seleccionados
    window.getSelection().addRange(seleccion); //Añadimos el rango que obtuvimos en la variable seleccion
    var res = document.execCommand('copy'); //Copiamos el texto
    window.getSelection().removeRange(seleccion); //Removemos el rango para que no quede seleccionado el texto en nuestra pantalla
}

//Capturamos los eventos de nuestros botones
botonEncriptador.onclick = encriptarMensaje; 
botonDesencriptador.onclick = desencriptarMensaje;
botonCopiar.onclick = copiar;