Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', {name: 'postsList'}, function(){
  this.render('postsList');
});
