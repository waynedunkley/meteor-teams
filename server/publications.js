Meteor.publish('posts', function() {
  return Posts.find({'userId':this.userId});
});

Meteor.publish('teams', function() {
  return Teams.find();
});

Meteor.publish('userData', function () {
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
