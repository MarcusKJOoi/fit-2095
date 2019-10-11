const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (_, res) {
        Actor
        .find()
        .populate('movies')
        .exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            if (!err) res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                movie.actors.push(req.params.id);
                movie.save((err) => {
                    if (err) return res.status(500).json(err);
                });
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    deleteCascade: (req, res) => {
        Actor.findOne({ _id: req.params.id }, (err, actor) => {
            if(err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();
            Movie.deleteMany({ _id: { $in: actor.movies } }, (err) => {
                if(err) return res.status(500).json(err);
                Actor.deleteOne({ _id: req.params.id }, (err) => {
                    if (err) return res.status(500).json(err);
                    res.json();
                });
            });
        })
    },
    removeMovie: (req, res) => {
        Actor.updateOne({ _id: req.params.actorId }, { $pull: { movies: req.params.movieId } }, (err) => {
            if(err) return res.status(400).json(err);
            res.json();
        });
        Movie.updateOne({ _id: req.params.movieId }, { $pull: { movies: req.params.actorId } }, (err) => {
            if(err) return res.status(400).json(err);
            res.json();
        });
    }
};