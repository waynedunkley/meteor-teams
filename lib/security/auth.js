/**
 * Authenticate the user has the required permissions
 *
 * @example
 *    authenticateUser('admin');
 *
 * @method createTeam
 * @param {String} authentication level owner|admin
 * @param {String} team slug
 * @return {Boolean}
 */
authenticateUser = function(role){
  var user,
      activeTeamId,
      teamObj;

  user = Meteor.user();
  if( _.has( user, 'activeTeam') ){
    activeTeamId = user.activeTeam._id;
  }

  teamObj = Teams.find({
   '_id': activeTeamId,
    'members': {
      $elemMatch: {
        '_id': Meteor.userId(),
        'permission': role
      }
    }
  }).fetch();

  if( teamObj.length < 1 ){
    return false;
  }else{
    return true;
  }
};
