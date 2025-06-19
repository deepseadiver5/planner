const User = require('../model/user')

module.exports.renderLogin = (req, res) => {
    res.render('user/login');
}

module.exports.login = async (req, res) => {
    const { user } = req.body;
    // search for username - needs to be unique
    const response = await User.findOne({ name: user.name }).populate('lists');
    if (response) {
        // check password correct
        if (user.password == response.password) {
            req.session.userId = response._id;
            req.user = response;
            req.flash('success', 'Successfully logged in')
            return res.redirect('/lists')
        }
        req.flash('error', 'Usrname or password incorrect. Please try again')
        return res.redirect('/login')
    }
    else {
        req.flash('error', 'Usrname or password incorrect. Please try again')
        return res.redirect('/login')
    }
}

module.exports.logout = (req, res) => {
    // req.flash('success', 'You have been logged out.');
    // req.session.save(() => {
    //     req.session.destroy(() => {
    //         res.redirect('/login');
    //     });
    // });
    try {
        req.session.destroy(err => {
            if (err) {
                req.flash('error', 'There was an error logging out');
                return res.redirect('/');
            }
            // find a way of showing a flash message after redirecting to the login screen - maybe you destory the session after that
            return res.redirect('/login');
        })
    }
    catch (err) {
        next(err); // gets caught by global error handler
    }
}

module.exports.renderRegister = (req, res) => {
    res.render('user/register');
}

module.exports.register = async (req, res) => {
    const { user } = req.body;
    const newUser = await User.insertOne({ name: user.name, email: user.email, password: user.password })
    // need to validate the username - check it doesn't already exist
    // encrypt the password - don't store a password in a db eve
    req.session.userId = newUser._id;
    req.user = newUser;
    req.flash('success', 'New user successfully created')
    res.redirect('/lists')
}