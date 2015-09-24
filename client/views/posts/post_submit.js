Template.postSubmit.onCreated(function() {
  //Create a keyResultArray session variable so it can be accessed by Template.postSubmit.events
  Session.set('keyResultArray', [{}]);
});

Template.postSubmit.helpers({
  inputs: function () {
    //Get from session so it can be Reactive
    return Session.get('keyResultArray');
  }
});

Template.postSubmit.events({
  'submit form' : function(e){
    e.preventDefault();
    var keyResults = [];

    //Iterate over keyResults and build Array
    $('.keyResultItem', e.target).each(function(index, value){
      if( $(this).val() ){
        keyResults.push({
          title: $(this).val(),
          completed: 0,
          tags: []
        });
      }
    });

    //Create Post to add to Collection
    var post = {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      keyResults: keyResults
    };

    Meteor.call('post', post, function(error, id) {
      if (error)
        return alert(error.reason);

      Router.go('postPage', {_id: id});
    });
  },
  'click .addKeyResult': function(e){
    e.preventDefault();

    //Add new Key Results field
    var keyResultArray = Session.get('keyResultArray');
    keyResultArray.push({});
    Session.set('keyResultArray', keyResultArray);

    //Must use Timeout to allow time for input to be rendered before :focus
    setTimeout(function(){
      $('.keyResultsList li').last().find('input').focus();
    }, 10);
  }
});
