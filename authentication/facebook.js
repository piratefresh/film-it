const passport = require("passport"),
  GoogleStrategy = require("passport-facebook").Strategy,
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
      clientID: keys.fbClientToken,
      clientSecret: keys.fbClientSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // Look into user collection and find one by google id
      const existingUser = await User.findOne({
        facebook: {
          id: profile.id
        }
      });
      if (existingUser) {
        // We already have a record with given profile ID
        return done(null, existingUser);
      } else {
        // We dont have a user record with this id make a new record
        // Get google id from google and assign to googleId
        // .save needed to save it to DB
        const user = await new User({
          facebook: {
            id: profile.id,
            token,
            name: profile.name.givenName + "" + profile.name.familyName,
            email: profile.emails[0].value
          }
        }).save();
        done(null, user);
      }
    }
  )
);
