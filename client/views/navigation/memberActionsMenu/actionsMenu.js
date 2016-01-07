Template.actionsMenu.helpers({
  profileImageUrl: function(){
    return Meteor.user().profile.picture;
  },
  activeTeamName: function(){
    var user = Meteor.user();
    if( _.has( user, 'activeTeam') ){
      return user.activeTeam.name;
    }else{
      return "Menu";
    }
  }
});

Template.actionsMenu.events({
  'click .logout-header': function(e){
    e.preventDefault();
    Meteor.logout(function(error){
      if(error){
        throw new Meteor.Error("Logout failed");
      }
      else{
        Router.go('home');
      }
    });
  }
});
