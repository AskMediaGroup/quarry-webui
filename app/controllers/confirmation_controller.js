/*global console, App, Em, $ */
App.ConfirmationController = Em.ObjectController.extend({
    content: {},

    operator: function () {
        switch (this.get('randomOperator')) {
        case 0:
            return '+';
        case 1:
            return '-';
        case 2:
            return '*';
        }
    }.property('randomOperator'),

    answer: function () {
        var operandOne, operandTwo, randomOperator;
        operandOne = this.get('operandOne');
        operandTwo = this.get('operandTwo');
        randomOperator = this.get('randomOperator');
        switch (randomOperator) {
        case 0:
            return (operandOne + operandTwo);
        case 1:
            return (operandOne - operandTwo);
        case 2:
            return (operandOne * operandTwo);
        }
    }.property('operandOne', 'operandTwo', 'randomOperator'),

    reset: function () {
        this.setProperties({
            status: undefined,
            riddleAnswer: undefined,
            operandOne: Math.floor(Math.random() * 10),
            operandTwo: Math.floor(Math.random() * 10),
            randomOperator: Math.floor(Math.random() * 3)
        });
    },

    ready: function () {
        return (parseInt(this.get('riddleAnswer'), 10) === this.get('answer'));
    }.property('riddleAnswer', 'answer')
});