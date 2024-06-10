// Declaración de variables
let numeroSecreto = 0; // Número secreto generado aleatoriamente
let intentos = 0; // Contador de intentos del usuario
let listaNumerosSorteados = []; // Lista de números sorteados
let numeroMaximo = 10; // Número máximo para el juego

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Función para verificar el intento del usuario
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        // Si el usuario adivina el número
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilitar el botón de reinicio
    } else {
        // Si el usuario no adivina el número
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja(); // Limpiar el campo de entrada
    }
    return;
}

// Función para limpiar el campo de entrada
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Función para generar el número secreto
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    // Si ya se sortearon todos los números posibles
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        // Si el número generado ya está en la lista de números sorteados
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); // Generar otro número
        } else {
            listaNumerosSorteados.push(numeroGenerado); // Agregar el número generado a la lista
            return numeroGenerado; // Devolver el número generado
        }
    }
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!'); // Título del juego
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`); // Instrucciones para el usuario
    numeroSecreto = generarNumeroSecreto(); // Generar el número secreto
    intentos = 1; // Inicializar el contador de intentos
}

// Función para reiniciar el juego
function reiniciarJuego() {
    limpiarCaja(); // Limpiar el campo de entrada
    condicionesIniciales(); // Restablecer las condiciones iniciales del juego
    document.querySelector('#reiniciar').setAttribute('disabled','true'); // Deshabilitar el botón de reinicio
}

// Establecer las condiciones iniciales del juego al cargar la página
condicionesIniciales();
