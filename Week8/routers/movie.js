var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (_, res) {
        Movie
        .find()
        .populate('actors')
        .exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                actor.movies.push(req.params.id);
                actor.save((err) => {
                    if (err) return res.status(500).json(err);
                });
                movie.actors.push(movie._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    getRange: (req, res) => {
        const year1 = parseInt(req.params.year1);
        const year2 = parseInt(req.params.year2);
        console.log('yr1', year1, 'yr2', year2);
        if (year1 > year2) {
            Movie.find({ year: { $gte: year2, $lte: year1 } })
            .populate('actors')
            .exec((err, movies) => {
                if(err) return res.status(400).json();
                res.json(movies);
            });
        } else {
            return res.status(400).json('Wrong usage of endpoint!');
        }
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    removeActor: (req, res) => {
        Movie.updateOne({ _id: req.params.movieId }, { $pull: { movies: req.params.actorId } }, (err) => {
            if(err) return res.status(400).json(err);
            res.json();
        });
        Actor.updateOne({ _id: req.params.actorId }, { $pull: { movies: req.params.movieId } }, (err) => {
            if(err) return res.status(400).json(err);
            res.json();
        });
    }
};