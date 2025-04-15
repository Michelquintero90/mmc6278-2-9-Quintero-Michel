import User from '../models/User.js';

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send('Invalid credentials');
  }
  req.session.userId = user._id;
  res.redirect('/');
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}
