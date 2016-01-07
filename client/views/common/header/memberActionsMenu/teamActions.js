Template.teamActions.helpers({
  teams: function(){
    var teams = Meteor.teams.find({},{ fields: { _id: 1, name: 1 } }).fetch();
    return teams;
  },
  activeTeam: function(){
    var activeTeam = Teams.getActiveTeam();
    return Roles.userIsInRole(Meteor.userId(), 'admin', activeTeam._id);
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
    });
  }
});
