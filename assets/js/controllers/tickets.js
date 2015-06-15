/*global app, document */

//
// Tickets controller
//

app.Tickets = (function () {

    'use strict';

    var Tickets = function () {

        this.gameTick = false;
        this.string = '011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985';
        this.tickets = [];
        this.template = 'tickets-container';
        this.views = [];
        this.numbersToCall = [];

        // Exaggerated game speed so a winning ticket can be seen
        this.markOffSpeed = 100;

        this.shuffleNumbersArray(this.populateNumbersArray());
        this.parseString();
    };

    Tickets.prototype.populateNumbersArray = function () {

        var i;
        for (i = 1; i <= 90; i += 1) {
            this.numbersToCall.push(i);
        }

        return this.numbersToCall;
    };

    Tickets.prototype.shuffleNumbersArray = function (array) {

        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    Tickets.prototype.parseString = function () {

        var arr = [],
            ticketCount = 0,
            i;
        for (i = 0; i < this.string.length; i += 2) {

            arr.push(parseInt(this.string.substr(i, 2), 10));

            if ((i + 2) % 30 === 0) {

                this.tickets[ticketCount] = new app.Ticket({
                    id: ticketCount + 1,
                    numbers: arr
                });
                arr = [];
                ticketCount += 1;
            }
        }

        return this.tickets;

    };

    Tickets.prototype.markNumber = function (nextNumberToCall) {

        if (this.numbersToCall.length === 0) {
            this.endGame();
        }

        // Get the first value from the numbers to call array, then remove it so it can't be called again.
        var ticketId = parseInt(document.querySelector('.ticket--cell-' + nextNumberToCall).parentNode.parentNode.getAttribute('id').split('-')[1], 10),
            numToGoElem = document.getElementById('ticket-' + ticketId).getElementsByClassName('num-to-go')[0];
        document.querySelector('.ticket--cell-' + nextNumberToCall).className = document.querySelector('.ticket--cell-' + nextNumberToCall).className + ' marked';

        // update numbers to go on ticket model
        this.tickets[ticketId - 1].set('numbersToGo', this.tickets[ticketId - 1].get('numbersToGo') - 1);
        numToGoElem.innerText = this.tickets[ticketId - 1].get('numbersToGo');

        if (this.tickets[ticketId - 1].get('numbersToGo') === 0) {
            document.getElementById('ticket-' + ticketId).className = document.getElementById('ticket-' + ticketId).className + ' winning-ticket';
            this.endGame();
        }
    };

    Tickets.prototype.showTickets = function () {

        var output = '',
            i;
        for (i = 0; i < 6; i += 1) {
            this.views[i] = new app.TicketView(this.tickets[i]);
            output += this.views[i].render();
        }

        document.getElementById(this.template).innerHTML = output;

    };

    Tickets.prototype.play = function () {

        // Anything inside the setInterval function will look at the window object so let's store a reference to the Tickets controller here.
        var that = this;

        this.showTickets();

        this.gameTick = setInterval(function () {
            that.markNumber(that.numbersToCall.shift());
        }, this.markOffSpeed);
    };

    Tickets.prototype.endGame = function () {

        // clear out the game tick
        clearInterval(this.gameTick);
        return false;
    };

    return Tickets;

}());