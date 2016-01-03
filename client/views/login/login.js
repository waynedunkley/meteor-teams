Template.login.events({
  'click #login-google': function(e){
    e.preventDefault();
    Meteor.loginWithGoogle({

    }, function(error){
      if(error){
        throw new Meteor.Error("Goolge login failed");
      }else{
        Router.go('dashboard');
      }
    });
  },
  'click #login-facebook': function(e) {
    e.preventDefault();
      Meteor.loginWithFacebook({

      }, function(error){
        if (error) {
          throw new Meteor.Error("Facebook login failed");
        }else{
          Router.go('dashboard');
        }
      });
    }
});
