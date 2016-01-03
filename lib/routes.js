// Define default app layout
Router.configure({
    layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.map(function(){
  this.route('home', { path: '/' });
  this.route('login', { path: '/login' });
  this.route('dashboard', { path: '/dashboard' });
  this.route('createTeam', { path: '/createTeam' });
  this.route('teams', { path: '/teams' });
  this.route('profile', { path: '/profile' });
  this.route('postPage', {
    path: '/posts/:_id',
    data: function() {
      return Posts.findOne(this.params._id);
    }
  });
  this.route('postSubmit', {
    path: '/submit'
  });
});

var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
  }else{
    this.next();
  }
};

Router.onBeforeAction(requireLogin, {only: ['postSubmit']});
