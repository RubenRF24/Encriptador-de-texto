let botonEncriptador = document.querySelector('#boton--encriptar'); //Obtenemos las caracteristicas del boton encriptar
let botonDesencriptador = document.querySelector('#boton--desencriptar'); //Obtenemos las caracteristicas del boton desencriptador
let botonCopiar = document.querySelector('#boton--copiar'); //Obtenemos las caracteristicas del boton copiar

//Arreglos con las llaves de encriptacion para nuestros mensajes
const encriptar = [/e/gi, /i/gi, /a/gi, /o/gi, /u/gi];
const encriptarResultado = ['enter', 'imes', 'ai', 'ober', 'ufat'];

const desencriptar = [/enter/gi, /imes/gi, /ai/gi, /ober/gi, /ufat/gi];
const desencriptarResultado = ['e', 'i', 'a', 'o', 'u'];

const mayuscula = /([A-Z])/g;
const acentos = /[\u00C0-\u017F]/g;

function obtenerCadena() {
	//Con esta funcion obtenemos y retornamos el mensaje escrito por nuestro usuario
	let cadenaUsuario = document.getElementById(
		'contenido-entrada__textarea'
	).value; //Obtenemos el valor ingresado por nuestro usuario
	return cadenaUsuario;
}

function borrarClases() {
	document
		.getElementById('contenido-salida__img')
		.classList.remove('contenido-salida__img--activado');
	document
		.getElementById('contenido-salida__titulo')
		.classList.remove('contenido-salida__titulo--activado');
	document
		.getElementById('contenido-salida__texto')
		.classList.remove('contenido-salida__texto--activado');
}

function mensajeNoEncontrado() {
	//Funcion utilizada para decirle a nuestro usuario que no existe ningun mensaje para encriptar
	borrarClases();
	document
		.querySelector('#contenido-salida__img')
		.setAttribute('src', 'imagenes/animal-penguin.png');
	document.getElementById('contenido-salida__titulo').innerHTML =
		'Ningun mensaje fue encontrado'; //Cambiamos el mensaje en nuestro <h2>
	document.getElementById('contenido-salida__texto').innerHTML =
		'Ingresa el mensaje que desees encriptar o desencriptar'; ////Cambiamos el mensaje en nuestro <p>
}

function mensajeLetraMayuscula() {
	//Funcion utilizada para decirle a nuestro usuario que hay una letra mayuscula en su mensaje
	borrarClases();
	document
		.querySelector('#contenido-salida__img')
		.setAttribute('src', 'imagenes/pajaro-enojado.png');
	document.getElementById('contenido-salida__titulo').innerHTML =
		'Hay mayusculas en tu mensaje';
	document.getElementById('contenido-salida__texto').innerHTML =
		'Recuerda que no esta permitido el uso de mayusculas en tu mensaje';
}

function mensajeAcentos() {
	//Funcion utilizada para decirle a nuestro usuario que hay un acento en su mensaje
	borrarClases();
	document
		.querySelector('#contenido-salida__img')
		.setAttribute('src', 'imagenes/pajaro-enojado.png');
	document.getElementById('contenido-salida__titulo').innerHTML =
		'Hay acentos en tu mensaje';
	document.getElementById('contenido-salida__texto').innerHTML =
		'Recuerda que no esta permitido el uso de acentos en tu mensaje';
}

function verificaciones() {
	//Funcion usada para evaluar si el mensaje escrito por nuestro usuario cumple con todos los requisitos para encriptar su mensaje
	let cadena = obtenerCadena(); //Obtenemos el mensaje
	if (cadena === '') {
		mensajeNoEncontrado();
		throw new Error('El texto debe tener almenos una letra');
	} //Evaluamos si es una cadena vacia
	if (mayuscula.test(cadena)) {
		mensajeLetraMayuscula();
		throw new Error('El mensaje no puede contener letras mayusculas');
	} //Evaluamos si el mensaje contiene letras mayusculas
	if (acentos.test(cadena)) {
		mensajeAcentos();
		throw new Error('El mensaje no puede contener acentos');
	} //Evaluamos si el mensaje contiene acentos

	return cadena; //Retornamos la cadena obtenida
}

function obtenerMensaje(coincidencias, traduccion, cadena) {
	//Funcion usada para obtener el mensaje Encriptado o Desencriptado
	for (var i = 0; i < coincidencias.length; i++) {
		cadena = cadena.replace(coincidencias[i], traduccion[i]); //Reemplazamos las llaves de encriptacion para obtener nuestro mensaje
	}

	return cadena; //Retornamos la cadena encriptada o desencriptada
}

function mostrarResultado(cadena) {
	//Funcion usada para mostrar el resultado al usuario
	document
		.getElementById('contenido-salida__img')
		.classList.add('contenido-salida__img--activado');
	document
		.getElementById('contenido-salida__titulo')
		.classList.add('contenido-salida__titulo--activado');
	document
		.getElementById('contenido-salida__texto')
		.classList.add('contenido-salida__texto--activado');
	document.getElementById('contenido-salida__texto').innerHTML = cadena; //Mostramos la cadena obtenida en pantalla
}

function encriptarMensaje() {
	//Funcion usada para encriptar los mensajes
	let cadena = verificaciones(); //Verificamos todos los requisitos
	cadena = obtenerMensaje(encriptar, encriptarResultado, cadena); //Obtenemos la cadena encriptada
	mostrarResultado(cadena); //Mostramos el resultado en pantalla
}

function desencriptarMensaje() {
	//Funcion usada para desencriptar los mensajes
	let cadena = verificaciones();
	cadena = obtenerMensaje(desencriptar, desencriptarResultado, cadena);
	mostrarResultado(cadena);
}

function copiar() {
	//Funcion usada para copiar el resultado en pantalla
	var codigoACopiar = document.getElementById('contenido-salida__texto'); //Seleccionamos lo que queremos copiar
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
