export function renderIndex(req, res) {
  const success = req.session.success; 
  delete req.session.success; 
  res.render('index', { isLoggedIn: !!req.session.userId, success });
}

export function renderLogin(req, res) {
  res.render('login');
}

export function renderSignup(req, res) {
  res.render('signup');
}

export function renderProtected(req, res) {
  res.render('protected', { isLoggedIn: !!req.session.userId });
}