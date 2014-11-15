Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound', //serves 404 to bad routes
  waitOn: function() { return Meteor.subscribe('posts'); }
});


Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
  name: 'postPage',
  //data context to use in postPage template (find post by id)
  data: function() { return Posts.findOne(this.params._id); }
  });
Router.route('/submit', {name: 'postSubmit'});




//serves 404 for bad ids inside routes
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
