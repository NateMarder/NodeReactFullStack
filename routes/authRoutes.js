const passport = require('passport');

module.exports = (app) => {
  /**
   * This endpoint binds the /auth/google route to the passport strategy flow. The keyword
   * 'google' indicates to passport to use the google strategy. This is just the way passport
   * works.
   */
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  // google strategy should see that there is a code and respond appropriately
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
