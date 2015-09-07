Template.login.events({
  'click .login-google': function(e){
    e.preventDefault();
    Meteor.loginWithGoogle({

    }, function(error){
      if(error){
        Session.set('errorMessage', error.reason || 'Unknown error');
      }else{
        console.log(Meteor);
      }
    });
  },
  'click .logout-google': function(e){
    e.preventDefault();
    Meteor.logout({

    }, function(error){

    });
  }
});
