/*global app */

//
// Ticket view
//

app.TicketView = (function () {

    'use strict';

    var TicketView = function (model) {
        this.model = model;
        this.render();
    };

    TicketView.prototype.render = function () {

        var numbers = this.model.get('numbers'),
            numberCount = 0,
            runningColumn = 0,
            tmpTicket = '',
            i,
            column;

        tmpTicket += '<div id="ticket-' + this.model.get('id') + '" class="ticket">';
        tmpTicket += '<div class="ticket--row">';

        for (i = 0; i < 27; i += 1) {

            column = Math.floor(numbers[numberCount] / 10);

            if (column === runningColumn) {
                tmpTicket += '<span class="ticket--cell ticket--cell-' + numbers[numberCount] + '">' + numbers[numberCount] + '</span>';
                numberCount += 1;
            } else if (numbers[numberCount] === 90 && runningColumn === (column - 1)) {
                tmpTicket += '<span class="ticket--cell ticket--cell-' + numbers[numberCount] + '">' + numbers[numberCount] + '</span>';
                numberCount += 1;
            } else {
                tmpTicket += '<span class="ticket--cell empty">&nbsp;</span>';
            }

            runningColumn += 1;
            if (i === 8 || i === 17) {
                tmpTicket += '</div>';
                tmpTicket += '<div class="ticket--row">';
                runningColumn = 0;
            } else if (i === 26) {
                tmpTicket += '</div>';
            }
        }

        tmpTicket += '<div class="ticket--n-to-go"><p><span class="num-to-go">' + this.model.get('numbersToGo') + '</span> TO GO</p></div>';
        tmpTicket += '</div>';

        return tmpTicket;

    };

    return TicketView;

}());