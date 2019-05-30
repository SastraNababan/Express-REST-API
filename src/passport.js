import { Strategy, ExtractJwt } from 'passport-jwt';
import BearerStrategy from 'passport-http-bearer';

import { jwtSecret } from './vars';
import authProviders from './services/authProviders';
import User from './models/user.model';

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwtX = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

const oAuth = service => async (token, done) => {
  try {
    const userData = await authProviders[service](token);
    const user = await User.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const jwt = new Strategy(jwtOptions, jwtX);
const facebook = new BearerStrategy(oAuth('facebook'));
const google = new BearerStrategy(oAuth('google'));
// export {
//   jwt: new JwtStrategy(jwtOptions, jwtX)
// };
export {
  jwt,
  facebook,
  google,
};
