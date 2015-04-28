Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', { name: "postsList"}, function(){
  this.render('postsList');
});
Router.route('/posts/:_id', function(){
  this.render('showPost', {
    data: function() { return Posts.findOne(this.params._id); }
  });
}, {name: "showPost"});
