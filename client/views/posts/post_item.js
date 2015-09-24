Template.postItem.helpers({
  title: function(){
    return this.title;
  },
  description: function(){
    return this.description;
  },
  keyResults: function(){
    return this.keyResults;
  }
});

Template.postItem.events({
  'click .deleteItem' : function(e){
    e.preventDefault();

    if (confirm("Delete this post?")) {
      Meteor.call("deletePost", this._id);
    }
  }
});
