const fs = require('fs');


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {

        this.ultimoT = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];


        let data = require('../data/data.json');

        if (data.Hoy === this.hoy) {
            this.ultimoT = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimoT += 1;
        let ticket = new Ticket(this.ultimoT, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimoT}`;
    }
    getUltimoTicket() {
        return `Ticket ${this.ultimoT}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }
        let numeroTicket = this.tickets[0].numero; //Extraemos el numero para romper la referencia
        this.tickets.shift(); //Eliminamos el primer ticket

        let atenderTicket = new Ticket(numeroTicket, escritorio); //crea un nuevo ticket a atender

        this.ultimos4.unshift(atenderTicket); //Agregar al inicio

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //Esto borra el ultimo elemento
        }

        this.grabarArchivo();
        console.log(this.ultimos4);
        return atenderTicket;
    }
    reiniciarConteo() {
        this.ultimoT = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimoT,
            Hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}