const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://eto.mesto.tut.nomoredomainsrocks.ru/',
  'https://eto.mesto.tut.nomoredomainsrocks.ru/',
];

module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);

  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    return res.end();
  }

  return next();
};
