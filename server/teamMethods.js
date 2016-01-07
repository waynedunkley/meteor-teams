Meteor.methods({
  /**
   * Create a new team. Current user will be assigned as
   * team 'admin' & 'owner'.
   *
   * @example
   *    Meteor.call('createTeam', team)
   *
   * @method createTeam
   * @param {String} team name
   * @param {String} team slug
   */
  createTeam: function(teamName, teamSlug){
    var t,
        teamObj = {},
        newTeamId;

    t = Teams.findOne({'slug': teamSlug});
    if( t ){
      throw new Meteor.Error('Team already exists!');
    }

    teamObj = {
      name: teamName,
      slug: teamSlug,
      owner: Meteor.user().profile.name,
      ownerId: Meteor.userId(),
      members: [{
        '_id': Meteor.userId(),
        'permission': ['admin', 'owner']
      }]
    };

    newTeamId = Teams.insert(teamObj);

    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $push: {
        'teams': newTeamId
      },
      $set: {
        'activeTeam': newTeamId
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
    var t;

    t = Teams.findOne(teamId);
    if( !t ){
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
