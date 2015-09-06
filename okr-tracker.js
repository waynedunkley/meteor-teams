Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}


if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("tasks");


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




  Template.profile.helpers({
    name: function(){
      return Meteor.user().profile.name;
    }
  });









  Template.body.helpers({

  });

  Template.task.helpers({

  });

  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

     // Insert a task into the collection
      Meteor.call("addTask", text);

      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });


  Template.task.events({
    "click .toggle-checked": function () {
     // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
       Meteor.call("deleteTask", this._id);
     },
    "click .toggle-private": function () {
      Meteor.call("setPrivate", this._id, ! this.private);
    }
  });


}
