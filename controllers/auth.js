import User from '../models/User.js';

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send('Invalid username or password');
  }

  req.session.userId = user._id; 
  console.log('User logged in, session ID:', req.session.userId);
  res.redirect('/');
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}
