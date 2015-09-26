Template.createTeam.events({
  'submit form' : function(e){
    e.preventDefault();

    //Create Team to add to Collection
    var team = {
      name: $(e.target).find('[name=name]').val(),
      owner: Meteor.user().profile.name,
      ownerId: Meteor.userId()
    };

    //Call Create Team Method
    Meteor.call('createTeam', team, function(error) {
      if (error)
        return alert(error);

      //Forward to Teams page
      Router.go('teams');
    });
  }
});
