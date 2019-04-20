const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-contrl');

const ticketControl = new TicketControl();



io.on('connection', (cliente) => {

    cliente.on('nuevoTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        callback(siguiente); //Esto lo mandara al Front-End
        console.log(siguiente); //Esto lo ejecutara en la terminal
    });

    //Emitir un evento "estado Actual"
    cliente.on('estadoActual', (data, callback) => {
        let estadoActual = ticketControl.getUltimoTicket();
        let ultimos4 = ticketControl.getUltimos4();
        callback({ estadoActual, ultimos4 });
    });


    cliente.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        cliente.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });
        //actualizar/notificar cambios en los ultimos 4
    });

});