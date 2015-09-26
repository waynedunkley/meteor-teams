Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { checked: setChecked} });
  },
  setPrivate: function (taskId, setToPrivate) {
    var task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
  deletePost: function (postId) {
    var post = Posts.findOne(postId);

    if( post.userId !== Meteor.userId() ) {
      // Only allow owner to delete post
      throw new Meteor.Error("not-authorized");
    }
    Posts.remove(postId);
    Router.go('dashboard');
  },
  createTeam: function(team){
    //Check Team name does not already exist
    var t = Teams.findOne({'name': team.name});

    if( t ){
      //If team already exists, throw error
      throw new Meteor.Error('Team already exists!');
    }

    var team_id = Teams.insert(team);

    var newTeam = {
      'name': team.name,
      '_id': team_id
    };

    Meteor.users.update({
      _id:Meteor.userId()
    }, {
      $push: {
        "teams": newTeam
      },
      $set: {
        "activeTeam": newTeam._id
      }
    }, { multi: true });
  },
  setActiveTeam: function(teamId){
    //Confirm team exists
    var t = Teams.findOne(teamId);
    if( !t ){
      //if team does not exist, remove team from users profile and invoke error
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $pull: {
          "teams": { "_id": teamId }
        }
      }, { multi: true });
      throw new Meteor.Error('Team no longer exists and may have been deleted by its owner');
    }

    //set active team marker
    Meteor.users.update({
      _id:Meteor.userId()
    }, {
      $set: {
        "activeTeam": teamId
      }
    }, { multi: true });
  }
});
