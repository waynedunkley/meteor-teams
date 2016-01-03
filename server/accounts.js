Accounts.onCreateUser(function(options, user) {
  if ( user.services ) {
    if( options.profile === undefined ){
      options.profile = {};
    }
    if( user.services.facebook ){
      options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }else if( user.services.google ){
      options.profile.picture = user.services.google.picture;
    }else{
      options.profile.picture = 'img/avatar.jpg';
    }
  }else{
    options.profile.picture = 'img/avatar.jpg';
  }

  user.profile = options.profile;

  return user;
});
