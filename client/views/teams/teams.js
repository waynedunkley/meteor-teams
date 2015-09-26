Template.teams.helpers({
  teams: function(){
    return Meteor.user().teams;
  }
});
