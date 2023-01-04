let botonEncriptador = document.querySelector("#boton-encriptar");
let botonDesencriptador = document.querySelector("#boton-desencriptador");
let botonCopiar = document.querySelector("#boton-copiar")

function obtenerMensaje() {
    let cadenaUsuario = document.getElementById("mensaje-principal").value;
    return cadenaUsuario;
}

function esMayuscula(letra){
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

function encriptarMensaje() {
    let cadena = obtenerMensaje();
    if(typeof cadena !== 'string') throw new Error("El parametro obtenido debe ser un String")
    if(cadena === "") throw new Error("El texto debe tener almenos una letra");
    if(detectarMayusculas(cadena)) throw new Error("El mensaje no puede contener letras mayusculas")
    if(!detectarAcentos(cadena)) throw new Error("El mensaje no puede contener acentos")

    

    console.log(cadena)
}

function copiar() {
    var codigoACopiar = document.getElementById('mensaje-encriptado');
    var seleccion = document.createRange();
    seleccion.selectNodeContents(codigoACopiar);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(seleccion);
    var res = document.execCommand('copy');
    window.getSelection().removeRange(seleccion);
}
botonEncriptador.onclick = encriptarMensaje;
botonCopiar.onclick = copiar;


