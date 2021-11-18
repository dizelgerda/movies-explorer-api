const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(), // Придумать что-то с ссылками
    trailer: Joi.string().required(), // Придумать что-то с ссылками
    thumbnail: Joi.string().required(), // Придумать что-то с ссылками
    owner: Joi.string().required().min(24).max(24).hex(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().min(24).max(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
