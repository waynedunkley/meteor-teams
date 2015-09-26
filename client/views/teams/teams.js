Template.teams.helpers({
  teams: function(){
    return Meteor.user().teams;
  },
  activeTeam: function(){
    var activeTeamId = Meteor.user().activeTeam;
    return Teams.findOne(activeTeamId);
  }
});

Template.teams.events({
  'click .switch' : function(e){
    e.preventDefault();
    var teamId = $(e.target).closest('.team-name').attr('data-id');
    Meteor.call('setActiveTeam', teamId, function(error) {
      if (error)
        return alert(error.reason);
    });
  }
});
