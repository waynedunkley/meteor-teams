Template.registerForm.events({
  'click #switch-to-login': function(e) {
    e.preventDefault();
    $('#login-form').show();
    $('#register-form').hide();
  },
  'submit form': function(e){
    e.preventDefault();
  }
});

Template.registerForm.onRendered(function(){
  var validator = $('#register-form').validate({
    submitHandler: function(event){
      var email = $('[name=email]').val(),
          password = $('[name=password]').val();

      Accounts.createUser({
        email: email,
        password: password
      }, function(error){
        if(error){
          if(error.reason == "Email already exists."){
            validator.showErrors({
              email: "Email address is already registered"
            });
          }
        }else{
          var currentRoute = Router.current().route.getName();
          if(currentRoute == 'login'){
            Router.go('dashboard');
          }
        }
      });
    }
  });
});
