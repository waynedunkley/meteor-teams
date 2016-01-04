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

  /**
   * Create a new team. Current user will be assigned as
   * team 'admin' & 'owner'.
   *
   * @example
   *    Meteor.call('createTeam', team)
   *
   * @method createTeam
   * @param {Object} team Object
   */
  createTeam: function(team){
    var team_id,
        newTeam;

    t = Teams.findOne({'slug': team.slug});
    if( t ){
      throw new Meteor.Error('Team already exists!');
    }

    team_id = Teams.insert(team);
    newTeam = {
      'name': team.name,
      '_id': team_id,
      'roles': ['admin', 'owner']
    };

    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $push: {
        'teams': newTeam
      },
      $set: {
        'activeTeam': newTeam._id
      }
    }, { multi: true });
  },

  /**
   * Set users active team. If team does not exist,
   * remove it from the users teams list.
   *
   * @example
   *    Meteor.call('setActiveTeam', teamId)
   *
   * @method setActiveTeam
   * @param {String} team Id
   */
  setActiveTeam: function(teamId){
    if( !Teams.findOne(teamId) ){
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $pull: {
          "teams": { "_id": teamId }
        }
      }, { multi: true });
      throw new Meteor.Error('Team no longer exists and may have been deleted by its owner');
    }

    Meteor.users.update({
      _id:Meteor.userId()
    }, {
      $set: {
        "activeTeam": {
          "_id" : teamId,
          "name" : t.name
        }
      }
    }, { multi: true });
  },

  /**
   * Validate team slug is a valid string and that
   * it does not already exist.
   *
   * @example
   *    Meteor.call('validateTeamSlug', 'slug')
   *
   * @method validateTeamSlug
   * @param {String} team slug
   * @return {String} team slug
   */
  validateTeamSlug: function(slug){

    var regexpchar  = /^[a-z0-9-]+$/i,
        regexpstart = /^-|-$/i;

    if( ! regexpchar.test(slug) ){
      throw new Meteor.Error('invalid-slug', 'Slugs can only have letters, number, and dashes.');
    }

    if( regexpstart.test(slug) ){
      throw new Meteor.Error('invalid-slug', 'Slugs cannot start or end with a dash.');
    }

    if( Teams.findOne({'slug': slug}) ){
      throw new Meteor.Error('team-exists', 'This name is not available');
    }

    return slug;
  }
});
