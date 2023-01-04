let botonEncriptador = document.querySelector("#boton-encriptar");
let botonDesencriptador = document.querySelector("#boton-desencriptar");
let botonCopiar = document.querySelector("#boton-copiar")
let li = document.querySelector("li")

function obtenerMensaje() {
    let cadenaUsuario = document.getElementById("mensaje-principal").value;
    return cadenaUsuario;
}

function mensajeNoEncontrado(){
    li.removeAttribute("id")
    document.getElementById("mensaje-resultado").innerHTML="Ingresa el mensaje que desses encriptar o desencriptar"
}

function esMayuscula(letra){
    if(letra === " ") return false
    if((letra.charCodeAt(0) >= 65) && (letra.charCodeAt(0) <= 90)) return true
    if((letra.charCodeAt(0) < 97) || (letra.charCodeAt(0) > 122)) return false

    return letra === letra.toUpperCase();
}

function detectarMayusculas(cadena) {
    let encontrado = false;
    for(var i = 0; i < cadena.length; i++){
        let letraActual = cadena.charAt(i);
        if(esMayuscula(letraActual)){
            encontrado = true;
            break;
        }
    }
    return encontrado;
}

function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

function detectarAcentos(cadena) {
    return cadena === eliminarDiacriticos(cadena)
}

function mostrarResultado(cadena) {
    li.setAttribute("id","mensaje-encriptado")
    document.getElementById("mensaje-resultado").innerHTML=cadena;
}

function encriptarMensaje() {
    let cadena = obtenerMensaje();
    if(typeof cadena !== 'string') throw new Error("El parametro obtenido debe ser un String")
    if(cadena === "") {
        mensajeNoEncontrado()
        throw new Error("El texto debe tener almenos una letra")}
    if(detectarMayusculas(cadena)) throw new Error("El mensaje no puede contener letras mayusculas")
    if(!detectarAcentos(cadena)) throw new Error("El mensaje no puede contener acentos")

    const coincidencias = [/e/gi,/i/gi,/a/gi,/o/gi,/u/gi];
    const traduccion = ["enter","imes","ai","ober","ufat"]
    for(var i = 0; i < coincidencias.length; i++){
        cadena = cadena.replace(coincidencias[i],traduccion[i])
    }

    mostrarResultado(cadena)
}

function desencriptarMensaje() {
    let cadena = obtenerMensaje();
    if(typeof cadena !== 'string') throw new Error("El parametro obtenido debe ser un String")
    if(cadena === "") {
        mensajeNoEncontrado()
        throw new Error("El texto debe tener almenos una letra")}
    if(detectarMayusculas(cadena)) throw new Error("El mensaje no puede contener letras mayusculas")
    if(!detectarAcentos(cadena)) throw new Error("El mensaje no puede contener acentos")

    const coincidencias = [/enter/gi,/imes/gi,/ai/gi,/ober/gi,/ufat/gi];
    const traduccion = ["e","i","a","o","u"]
    for(var i = 0; i < coincidencias.length; i++){
        cadena = cadena.replace(coincidencias[i],traduccion[i])
    }

    mostrarResultado(cadena)
}

function copiar() {
    var codigoACopiar = document.getElementById('mensaje-resultado');
    var seleccion = document.createRange();
    seleccion.selectNodeContents(codigoACopiar);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(seleccion);
    var res = document.execCommand('copy');
    window.getSelection().removeRange(seleccion);
}

botonEncriptador.onclick = encriptarMensaje;
botonDesencriptador.onclick = desencriptarMensaje;
botonCopiar.onclick = copiar;