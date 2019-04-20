//Comando para establecer la comunicacion

var socket = io();
var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('estadoActual', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

});
socket.on('disconnet', function() {
    console.log('Desconectado al servidor');
});

$('button').on('click', function() {

    socket.emit('nuevoTicket', null, function(siguienteTicket) {

        //console.log(siguienteTicket);
        label.text(siguienteTicket);
    });
});