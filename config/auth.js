module.exports = {
  facebookAuth: {
    clientID: "your-secret-clientID-here", // your App ID
    clientSecret: "your-client-secret-here", // your App Secret
    callbackURL: "https://localhost:5000/auth/facebook/callback",
    profileURL:
      "https://graph.facebook.com/v2.11/me?fields=first_name,last_name,email",
    profileFields: ["id", "email", "name"] // For requesting permissions from Facebook API
  },

  googleAuth: {
    clientID: "your-secret-clientID-here",
    clientSecret: "your-client-secret-here",
    callbackURL: "http://localhost:5000/auth/google/callback"
  }
};
