Template.header.helpers({
  firstName: function(){
    return Meteor.user().services.google.given_name;
  },
  profileImageUrl: function(){
    return Meteor.user().profile.picture;
  }
});
