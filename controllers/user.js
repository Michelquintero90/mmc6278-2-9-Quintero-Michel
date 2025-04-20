import User from '../models/User.js';

export async function create(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.redirect('/signup?error=Must include username and password');

    const user = await User.create({ username, password });

    if (!user) return res.redirect('/signup?error=Error creating new user');

    req.session.isLoggedIn = true;
    req.session.save(() => res.redirect('/?success=Account created successfully'));
  } catch (err) {
    console.log(err);
    return res.redirect(`/signup?error=${err.message}`);
  }
}
