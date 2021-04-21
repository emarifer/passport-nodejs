const express = require('express');
const router = express.Router();
const passport = require('passport');

const envVar = (envVar = process.env.PREFIX_APP) => envVar.length === 0 ? '/' : envVar;

const prefix = (prefix = process.env.PREFIX_APP) => prefix.length === 0 ? '' : prefix;

router.get(`${envVar()}`, (req, res, next) => {
    res.render('index');
});

router.get(`${prefix()}/signup`, (req, res, next) => {
    res.render('signup');
});

router.post(`${prefix()}/signup`, passport.authenticate('local-signup', {
    successRedirect: `${prefix()}/profile`,
    failureRedirect: `${prefix()}/signup`,
    failureFlash: true
    // passReqToCallback: true
}));

router.get(`${prefix()}/signin`, (req, res, next) => {
    res.render('signin');
});

router.post(`${prefix()}/signin`, passport.authenticate('local-signin', {
    successRedirect: `${prefix()}/profile`,
    failureRedirect: `${prefix()}/signin`,
    failureFlash: true
    // passReqToCallback: true
}));

router.get(`${prefix()}/logout`, (req, res, next) => {
    req.logout();
    res.redirect(`${envVar()}`);
});

// router.use((req, res, next) => {
//     isAuthenticated(req, res, next);
//     next();
// }); // Esto funciona como un middleware que "protege" a todas las routas que vengan detras

router.get(`${prefix()}/profile`, isAuthenticated, (req, res, next) => {
    res.render('profile');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect(`${envVar()}`);  
}

module.exports = router;