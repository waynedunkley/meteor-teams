Meteor.publish('posts', function() {
  return Posts.find();
});

// Meteor.publish('userData', function () {
//   if (this.userId) {
//     return Meteor.users.find({
//       _id: this.userId
//     },{
//       createdAt: 1,
//       services: false
//     });
//   } else {
//     this.ready();
//   }
// });
