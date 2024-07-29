const requireLogin = (req, res, next) => {
  // Redirect to the login page if the user is not logged in
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const apiRequireLogin = (req, res, next) => {
  // Return a 403 error if the user is not logged in for API requests
  if (!req.session.logged_in) {
    res.status(403).json({ msg: 'You need to be logged in to access this.' });
  } else {
    next();
  }
};

const allowGuests = (req, res, next) => {
  // Allow access for users who are not logged in; redirect logged-in users to the home page
  if (!req.session.logged_in) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { requireLogin, apiRequireLogin, allowGuests };
