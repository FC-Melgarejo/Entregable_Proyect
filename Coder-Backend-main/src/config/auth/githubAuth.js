const GitHubStrategy = require('passport-github2');
const userModel = require('../dao/models/userModel');

module.exports = (passport) => {
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.35f480523459289a',
        clientSecret: 'fe23b9a92bdf57fc37dbe19091d6f705e8de408a',
        callbackURL: 'http://localhost:8080/api/sessions/github-callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email });

            if (user) {
                console.log('Usuario ya existe');
                return done(null, user);
            }

            const newUser = await userModel.create({
                username: profile._json.login,
                email: profile._json.email
            });

            return done(null, newUser);
        } catch (e) {
            return done(e);
        }
    }));
};
