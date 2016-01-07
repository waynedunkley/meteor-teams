Template.actionsMenu.helpers({
  profileImageUrl: function(){
    return Meteor.user().profile.picture;
  },
  activeTeamName: function(){
    var team = Teams.getActiveTeam();

    if(team.name){
      return team.name;
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
