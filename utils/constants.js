const regUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\\/\w.-]*)*\/?$/i;

const optionsCORS = {
  origin: [
    'http://localhost:3001',
    'https://kovalenko.diploma.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  regUrl,
  optionsCORS,
};
