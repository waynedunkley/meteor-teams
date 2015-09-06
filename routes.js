// Define default app layout
Router.configure({
    layoutTemplate: 'applicationLayout',
    onBeforeAction: function() {
        if (!Meteor.userId()) {
        	this.layout('loginLayout');
            this.next();
        } else {
            this.next();
        }
    },
});




Router.route('/', function() {
	this.render('app', {

	});
});

Router.route('/profile', function() {
    this.render('profile', {

    });
});
