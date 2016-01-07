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
    var user = Meteor.user(),
        team = Teams.getActiveTeam();
    if( Roles.userIsInRole(user._id, 'owner', team._id) ){
      this.next();
    }else{
      this.render('restrictedAccess');
    }
  },
  isAdmin: function(){
    var user = Meteor.user(),
        team = Teams.getActiveTeam();
    if( Roles.userIsInRole(user._id, 'admin', team._id) ){
      this.next();
    }else{
      this.render('restrictedAccess');
    }
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  except: ['home', 'login']
});

Router.onBeforeAction(OnBeforeActions.isOwner, {
  only: []
});

Router.onBeforeAction(OnBeforeActions.isAdmin, {
  only: ['manageTeam']
});
