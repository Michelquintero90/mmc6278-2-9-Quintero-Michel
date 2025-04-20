function ensureAuthenticated(req, res, next) {
  console.log('Session user ID:', req.session.userId);
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

export { ensureAuthenticated };

