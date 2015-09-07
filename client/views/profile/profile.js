Template.profile.helpers({
  name: function(){
    return Meteor.user().profile.name;
  }
});
