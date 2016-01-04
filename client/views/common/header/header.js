Template.header.helpers({
  firstName: function(){
    return Meteor.user().services.google.given_name;
  },
  profileImageUrl: function(){
    return Meteor.user().profile.picture;
  }
});

Template.header.events({
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
