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
    }
});

Router.map(function(){
  this.route('dashboard', { path: '/' });
  this.route('profile', { path: '/profile' });
});
