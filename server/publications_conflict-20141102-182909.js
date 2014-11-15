//All pubs goin here

Meteor.publish('posts', function() {
  return Posts.find();
})
