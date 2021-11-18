const Movie = require('../models/movie');

function getMovies(req, res, next) {
  const owner = req.user;

  Movie.find({ owner })
    .then((movies) => res.status(200).send({ movies }))
    .catch(next);
}

function addMovie(req, res, next) {
  const data = req.body;
  const owner = req.user;

  Movie.create({ ...data, owner })
    .then((movie) => res.status(200).send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Данные невалидны');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

// Ошибка
function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const owner = req.user;

  Movie.deleteOne({ movieId, owner })
    .then(() => req.status(200).send({ massage: 'Фильм удалён' }))
    .catch(next);
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
