Template.postList.helpers({
  posts: function(){
    return Posts.find();
  }
});

Template.postListItem.helpers({
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
