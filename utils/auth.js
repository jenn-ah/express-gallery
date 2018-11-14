

 function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

  function hasAccess(req, res, next) {
    if (req.hasAccess()) {
      return next();
    }
    res.redirect('/login');
  }

module.exports = {

  isAuthenticated: isAuthenticated

}