
//config
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound', //serves 404 to bad routes
  waitOn: function() { return Meteor.subscribe('posts'); }
});


//routes
Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
  name: 'postPage',
  //data context to use in postPage template (find post by id)
  data: function() { return Posts.findOne(this.params._id); }
  });
Router.route('/submit', {name: 'postSubmit'});



//hooks actions
var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else
	{
		this.next();
	}
}

//hooks
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
