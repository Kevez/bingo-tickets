/*global app */

//
// Ticket model
//

app.Ticket = (function () {

    'use strict';

    var Ticket = function (opts) {
        this.id = opts.id;
        this.numbers = opts.numbers;
        this.numbersToGo = 15;
    };

    Ticket.prototype.set = function (key, val) {
        this[key] = val;
        return this[key];
    };

    Ticket.prototype.get = function (attr) {
        return this[attr];
    };

    Ticket.prototype.numbersToGo = function (numbersCalled) {

        var numbersToGo = this.numbers.length,
            i;
        for (i = 0; i < numbersCalled.length; i += 1) {

            if (this.numbers.indexOf(numbersCalled[i]) !== -1) {
                numbersToGo -= 1;
            }
        }

        return numbersToGo;
    };

    return Ticket;

}());