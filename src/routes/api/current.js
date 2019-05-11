export async function get(req, res) {
  res.send(req.user);
}
