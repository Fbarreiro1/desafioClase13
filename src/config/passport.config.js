const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secreto',
};

const initializePassport = () => {
  const strategy = new Strategy(options, async (jwtPayload, done) => {
    try {
      const { email, role } = jwtPayload;
      const user = { email, role };
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(strategy);
};

module.exports = { initializePassport };
