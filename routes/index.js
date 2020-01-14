var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../db');
var tokenStorage = require('../utils/remember-me-token');
var ObjectID = require('mongodb').ObjectID;
var GoogleAuthenticator = require('passport-2fa-totp').GoogeAuthenticator;
const ethers = require('ethers');
const {ADDRESS, ABI, PRIVATE_KEY} = require('../credentials');

var authenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/');
}

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }

    var errors = req.flash('error');
    return res.render('index', {
        errors: errors
    });
});

router.post('/', passport.authenticate('login', {
    failureRedirect: '/',
    failureFlash: true,
    badRequestMessage: 'Invalid username or password.'
}), function (req, res, next) {
    if (!req.body.remember) {
        return res.redirect('/profile');
    }

    // Create remember_me cookie and redirect to /profile page
    tokenStorage.create(req.user, function (err, token) {
        if (err) {
            return next(err);
        }

        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
        return res.redirect('/profile');
    });
});

router.get('/register', function (req, res, next) {
    var errors = req.flash('error');
    return res.render('register', {
        errors: errors
    });
});

router.post('/register', passport.authenticate('register', {
    successRedirect: '/setup-2fa',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/setup-2fa', authenticated, function (req, res, next) {
    var errors = req.flash('setup-2fa-error');
    var qrInfo = GoogleAuthenticator.register(req.user.username);
    req.session.qr = qrInfo.secret;

    return res.render('setup-2fa', {
        errors: errors,
        qr: qrInfo.qr
    });
});

router.post('/setup-2fa', authenticated, function (req, res, next) {
    if (!req.session.qr) {
        req.flash('setup-2fa-error', 'The Account cannot be registered. Please try again.');
        return res.redirect('/setup-2fa');
    }

    var users = db.get().collection('users');
    users.findOne(new ObjectID(req.user._id), function (err, user) {
        if (err) {
            req.flash('setup-2fa-error', err);
            return res.redirect('/setup-2fa');
        }

        if (!user) {
            // User is not found. It might be removed directly from the database.
            req.logout();
            return res.redirect('/');
        }

        users.update(user, { $set: { secret: req.session.qr } }, function (err) {
            if (err) {
                req.flash('setup-2fa-error', err);
                return res.redirect('/setup-2fa');
            }

            res.redirect('/profile');
        });
    });
});

router.get('/profile', authenticated, function (req, res, next) {
  var errors = req.flash('error');

    return res.render("profile", {
        user: req.user,
        errors: errors
    });
});

router.get('/logout', authenticated, function (req, res, next) {
    tokenStorage.logout(req, res, function () {
        req.logout();
        return res.redirect('/');
    });
});

router.get('/sign-server', authenticated, function(req, res, next) {

  const provider = ethers.getDefaultProvider('ropsten')
  const acc = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(ADDRESS, ABI, acc);

  contract.Sign().then((result) => {
    console.log(result);
    res.send(result.hash);
  });

});

module.exports = router;
