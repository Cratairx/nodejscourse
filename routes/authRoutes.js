const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google/',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/',(req,res) => {
        res.send('Hej du är på start sidan')
    });
    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
        (req, res) =>res.redirect('/'));

    app.get('/api/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect('/');
        });
    });
    app.get('/api/current_user', (req,res) => {
        res.send(req.user);

    })

};