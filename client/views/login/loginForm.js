Template.loginForm.events({
  'click #switch-to-register': function(e) {
    e.preventDefault();
    $('#login-form').hide();
    $('#register-form').show();
  },
  'submit form': function(e){
    e.preventDefault();
  }
});

Template.loginForm.onRendered(function(){
  var validator = $('#login-form').validate({
    submitHandler: function(e){
      var email = $('[name=email]').val(),
          password = $('[name=password]').val();

      Meteor.loginWithPassword(email, password, function(error){
        if(error){
          if(error.reason == "User not found"){
            validator.showErrors({
              email: "Email address not recognised"
            });
          }
          if(error.reason == "Incorrect password"){
            validator.showErrors({
              password: "Incorrect password"
            });
          }
        }else{
          if( Router.current().route.getName() === 'login' ){
            Router.go('dashboard');
          }
        }
      });
    }
  });
});
