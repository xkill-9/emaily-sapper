export async function get(req, res) {
  req.logout();
  res.redirect('/');
}
