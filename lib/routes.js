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
  this.route('manageTeam', { path: '/manageTeam' });
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

var OnBeforeActions = {
  loginRequired: function() {
    if (!Meteor.userId()) {
      this.render('login');
    }else{
      this.next();
    }
  },
  isOwner: function(){
    var authorised = authenticateUser('owner');
    if( !authorised ){
      this.render('restrictedAccess');
    }else{
      this.next();
    }
  },
  isAdmin: function(){
    var authorised = authenticateUser('admin');
    if( !authorised ){
      this.render('restrictedAccess');
    }else{
      this.next();
    }
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  except: ['home', 'login']
});

Router.onBeforeAction(OnBeforeActions.isOwner, {

});

Router.onBeforeAction(OnBeforeActions.isAdmin, {
  only: ['manageTeam']
});
