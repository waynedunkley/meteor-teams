Template.loginButtonHeader.events({
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
