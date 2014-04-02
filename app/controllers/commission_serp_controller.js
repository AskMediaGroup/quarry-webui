/*global App, Em */
App.CommissionSerpController = Em.ArrayController.extend({
    content: [],
    needs: 'commissionVm',

    actions: {
        confirm: function () {
            this.transitionToRoute('commissionVm.specs', this.get('content'));
        },
        freshCommission: function () {
            this.get('controllers.commissionVm').freshen();
            this.transitionToRoute('commissionVm.index');
        }
    }
});
