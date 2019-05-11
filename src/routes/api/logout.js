export async function get(req, res) {
  req.logout();
  res.send(req.user);
}
