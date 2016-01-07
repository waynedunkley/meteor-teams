if( !Meteor.teams ){
  Meteor.teams = new Mongo.Collection('teams');
}

/**
 * Global Namespace for storing Team related methods
 *
 * @class Teams
 * @constructor
 */
if ('undefined' === typeof Teams) {
  Teams = {};
}

_.extend(Teams, {

  /**
   * Get users current active team
   *
   * @example
   *    Teams.getActiveTeam()
   *
   * @method getActiveTeam
   * @return {Object} Object containing active team and and Id
   */
  getActiveTeam: function(){
    var teamId,
        activeTeam,
        user = Meteor.user();

    if( !_.has( user, 'activeTeam') ){
      return false;
    }
    teamId = user.activeTeam;

    return Meteor.teams.findOne({ _id: teamId },{ fields: { name: 1 } });
  }
});

Meteor.methods({
  /**
   * Delete team
   *
   * @example
   *    Meteor.call('deleteTeam', teamId)
   *
   * @method deleteTeam
   * @param {string} team Id
   */
  deleteTeam: function(teamId){

    //Check user has valid permissions to delete team

    //Delete team from collection
    Meteor.teams.remove({_id: teamId});
  },

  /**
   * Update team details
   *
   * @example
   *    Meteor.call('deleteTeam', teamId)
   *
   * @method deleteTeam
   * @param {Object} team object
   */
  updateTeam: function(team){

    //Delete team from collection
    Meteor.teams.update(team._id, {
      $set: {name: team.name}
    });
  }
});
