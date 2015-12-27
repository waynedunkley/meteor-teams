Template.createTeam.events({
  'submit form' : function(e){
    e.preventDefault();

    //Create Team to add to Collection
    var team = {
      name: $(e.target).find('[name=teamName]').val(),
      slug: $(e.target).find('[name=teamSlug]').val().toLowerCase(),
      owner: Meteor.user().profile.name,
      ownerId: Meteor.userId()
    };

    //Call Create Team Method
    Meteor.call('createTeam', team, function(error) {
      if (error)
        return alert(error);

      //Forward to Teams page
      Router.go('teams');
    });
  },
  'keydown #teamSlug' : function(e){
    if(e.which == 32){
      e.preventDefault();
    }
  },
  'keyup #teamSlug' : function(e){

    var waitClasses  = 'glyphicon glyphicon-refresh glyphicon-spin form-control-feedback',
        okClasses    = 'glyphicon glyphicon-ok form-control-feedback',
        errorClasses = 'glyphicon glyphicon-remove form-control-feedback';

    var feedback = $(e.target).siblings('.form-control-feedback'),
        errorMsg = $(e.target).siblings('#teamSlugErrorMessage');

    // Validate if feedback list exists before trying to set the classlist
    if(feedback.length){
      feedback.removeClass().addClass(waitClasses);
    }else{
      $(e.target).after('<span class="' + waitClasses + '"></span>');
      feedback = $(e.target).siblings('.form-control-feedback');
    }

    // Validate slug is not empty
    if( e.target.value === '' ){
      feedback.remove();
      return;
    }

    Meteor.call('validateTeamSlug', e.target.value, function(err, slug){
      if( err ){
        feedback.removeClass().addClass(errorClasses);
        errorMsg.html(err.reason);
      }else{
        feedback.removeClass().addClass(okClasses);
        errorMsg.html('');
      }
    });
  }
});
