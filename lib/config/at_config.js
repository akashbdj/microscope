AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    overrideLoginErrors: false,

    // Client-side Validation
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    negativeFeedback: true,
    continuousValidation: true,
    showValidating: true,

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    texts: {
      inputIcons: {
        hasSuccess: "mdi-action-done-all",
        hasError: "mdi-alert-warning",
      },
      button: {
        signUp: "Register Now!"
      },
      title: {
        forgotPwd: "Recover Your Password",
        signUp: "Create Account"
      },
    },
});


// Route Configuration

AccountsTemplates.configureRoute('signIn', {
  path: '/login',
  redirect: function(){
    var user = Meteor.user();
    if (user)
      Router.go('/user/' + user._id);
    }
});
AccountsTemplates.configureRoute('signUp', {
  path: '/signup',
  redirect: function(){
    var user = Meteor.user();
    if (user)
      Router.go('/user/' + user._id);
    }
});


// Username field added to form
if (Meteor.isServer){
  Meteor.methods({
    "userExists": function(username){
      return !!Meteor.users.findOne({username: username});
    },
  });
}

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  required: true,
  func: function(value){
    if (Meteor.isClient) {
      console.log("Validating username...");
      var self = this;
      Meteor.call("userExists", value, function(err, userExists){
        if (!userExists)
          self.setSuccess();
        else
          self.setError("Username either already exists or not valid");
        self.setValidating(false);
      });
      return;
    }
    // Server
    return Meteor.call("userExists", value);
  }
});