const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  keys = require("../config/keys"),
  mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// User model added to req object as req.user
//  Turns id into user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // Look into user collection and find one by google id
      const existingUser = await User.findOne({
        "google.id": profile.id,
        email: profile.emails[0].value
      });
      if (existingUser) {
        // We already have a record with given profile ID
        console.log("User already exist with that email");
        return done(null, existingUser);
      } else {
        // We dont have a user record with this id make a new record
        // Get google id from google and assign to googleId
        // .save needed to save it to DB
        const user = await new User({
          name: profile.displayName,
          email: profile.emails[0].value, // pull the first email
          google: {
            id: profile.id
          }
        }).save();
        done(null, user);
      }
    }
  )
);
