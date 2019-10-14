//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const path = require('path');
const app = express();
mongoose.set('useFindAndModify', false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/Week11")));
mongoose.connect('mongodb://localhost:27017/FIT2095', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connected to DB.');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id', actors.deleteOne);
//Movie RESTFul endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//Tasks
//Delete a movie by its id
app.delete('/movies/:id', movies.deleteOne);
//Delete actor and all their movies
app.delete('/actors/movies/:id', actors.deleteCascade);
//Remove a movie from an actor's list of movies
app.put('/actors/:actorId/:movieId', actors.removeMovie);
//Remove an actor from a movie's list of actors
app.put('/movies/:movieId/:actorId', movies.removeActor);
//Add an existing actor to a movie's list of actors 
app.post('/movies/:id/actors', movies.addActor);
//Get all movies within a certain range of year
app.get('/movies/:year1/:year2', movies.getRange);
// Question 3
app.post('/movies/increment', movies.incrementYear);
//Delete movies before a given year
app.delete('/movies/year/:year', movies.deletePreceeding);
// Get all actors born after the yera 1980
app.get('/actors/year/:year', actors.getBornAfter);
app.listen(8080);