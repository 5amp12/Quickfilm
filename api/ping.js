//testing

module.exports = (req, res) => {
  res.status(200).json({ pong: true, now: new Date().toISOString() });
};