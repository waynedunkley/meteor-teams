Template.manageTeam.helpers({
  team: function(){
    var teamDetails = Teams.getActiveTeam(),
        team = Meteor.teams.findOne(teamDetails._id);
    return team;
  }
});

Template.manageTeam.events({
  'submit .editTeam' : function(e){
    e.preventDefault();

    var team = {
      _id: Meteor.user().activeTeam._id,
      name: $(e.target).find('[name=teamName]').val(),
      slug: $(e.target).find('[name=teamSlug]').val().toLowerCase(),
    };

    Meteor.call('updateTeam', team, function(error) {
      if (error)
        return alert(error);

    });
  }
});
