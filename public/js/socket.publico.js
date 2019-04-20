var socket = io();

var labelticket1 = $('#lblTicket1');
var labelticket2 = $('#lblTicket2');
var labelticket3 = $('#lblTicket3');
var labelticket4 = $('#lblTicket4');

var lblescritorio1 = $('#lblEscritorio1');
var lblescritorio2 = $('#lblEscritorio2');
var lblescritorio3 = $('#lblEscritorio3');
var lblescritorio4 = $('#lblEscritorio4');


var lblTickets = [labelticket1, labelticket2, labelticket3, labelticket4];
var lblescritorios = [lblescritorio1, lblescritorio2, lblescritorio3, lblescritorio4];


socket.emit('estadoActual', null, function(resp) {
    console.log(resp.ultimos4);
    actualizaHTML(resp.ultimos4);
});



socket.on('ultimos4', function(ultimos4) {

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(ultimos4.ultimos4);
});



function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblescritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}