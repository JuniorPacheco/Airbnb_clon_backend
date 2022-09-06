const Users = require("../models/user.model")
 
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: "academlo", // debe estar en una variable de entorno
  };
  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      Users.findOne({where: {id: decoded.id}}, (err, user) => {
        if(err){
          return done(err, false)
        }
        if(user) {
          return done(null, user)
        }else {
          return done(null, false)
        }
      })
    })
  );
};
