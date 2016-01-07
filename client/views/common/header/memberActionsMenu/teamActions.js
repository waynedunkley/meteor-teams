Template.teamActions.helpers({
  teams: function(){
    return Teams.find().fetch();
  },
  activeTeam: function(currentTeamId){
    if( Session.get('activeTeam') == currentTeamId ){
      return true;
    }else{
      return false;
    }
  }
});

Template.teamActions.events({
  'click .switch-team' : function(e){
    e.preventDefault();
    var teamId = $(e.target).closest('.team-name').attr('data-teamId');
    Meteor.call('setActiveTeam', teamId, function(error, newTeamId) {
      if (error){
        return alert(error);
      }

      Session.set('activeTeam', newTeamId);
    });
  }
});
