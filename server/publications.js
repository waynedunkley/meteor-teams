Meteor.publish('posts', function() {
  return Posts.find({'userId':this.userId});
});

Meteor.publish('teams', function() {
  if( !this.userId ){
    return null;
  }

  var usersTeams = Meteor.teams.find({
    'members': {
      $elemMatch: {
        '_id': this.userId
      }
    }
  });
  return usersTeams;
});

Meteor.publish('userData', function () {
  Meteor.users.findOne();
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    },{
      createdAt: 1
    });
  } else {
    this.ready();
  }
});
