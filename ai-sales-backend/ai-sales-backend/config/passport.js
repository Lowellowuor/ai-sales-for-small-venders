// config/passport.js
// Commenting out social strategies to run without client IDs
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GitHubStrategy = require('passport-github2').Strategy;
// const User = require('../models/User'); // Import your User model

module.exports = function(passport) {
  // --- Google Strategy (DISABLED) ---
  // passport.use(new GoogleStrategy({
  //     clientID: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     callbackURL: '/api/auth/google/callback', // This must match your Google Console redirect URI
  //     passReqToCallback: true // Allows us to access req for session management
  //   },
  //   async (request, accessToken, refreshToken, profile, done) => {
  //     try {
  //       let user = await User.findOne({ googleId: profile.id });

  //       if (user) {
  //         return done(null, user);
  //       } else {
  //         // Create new user if not found
  //         user = new User({
  //           googleId: profile.id,
  //           email: profile.emails[0].value,
  //           username: profile.displayName || profile.emails[0].value.split('@')[0]
  //           // You might want to add a default password or handle it differently for social logins
  //         });
  //         await user.save();
  //         return done(null, user);
  //       }
  //     } catch (err) {
  //       console.error('Google OAuth error:', err);
  //       return done(err, null);
  //     }
  //   }
  // ));

  // --- GitHub Strategy (DISABLED) ---
  // passport.use(new GitHubStrategy({
  //     clientID: process.env.GITHUB_CLIENT_ID,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
  //     callbackURL: '/api/auth/github/callback', // This must match your GitHub OAuth App redirect URI
  //     scope: ['user:email'] // Request email access
  //   },
  //   async (accessToken, refreshToken, profile, done) => {
  //     try {
  //       let userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
  //       if (!userEmail && profile._json.email) {
  //           userEmail = profile._json.email;
  //       }
  //       if (!userEmail) {
  //           console.warn(`GitHub user ${profile.username} did not provide a public email.`);
  //           userEmail = `${profile.username}@github.com`; 
  //       }

  //       let user = await User.findOne({ githubId: profile.id });

  //       if (user) {
  //         return done(null, user);
  //       } else {
  //         user = new User({
  //           githubId: profile.id,
  //           email: userEmail,
  //           username: profile.username || profile.displayName || userEmail.split('@')[0]
  //         });
  //         await user.save();
  //         return done(null, user);
  //       }
  //     } catch (err) {
  //       console.error('GitHub OAuth error:', err);
  //       return done(err, null);
  //     }
  //   }
  // ));

  // Passport session serialization/deserialization (still needed for email/password login)
  // These functions are called by Passport to save and retrieve user data from the session.
  // They rely on the User model.
  const User = require('../models/User'); // Ensure User model is imported here

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
