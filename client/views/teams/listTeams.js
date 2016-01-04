Template.listTeams.helpers({
  teams: function(){
    return Meteor.user().teams;
  },
  activeTeam: function(currentTeamId){
    var activeTeamId = Meteor.user().activeTeam;
    if( activeTeamId == currentTeamId ){
      return true;
    }else{
      return false;
    }
  }
});

Template.listTeams.events({
  'click .switch-team' : function(e){
    e.preventDefault();
    var teamId = $(e.target).closest('.team-name').attr('data-teamId');
    Meteor.call('setActiveTeam', teamId, function(error) {
      if (error)
        return alert(error);
    });
  }
});
