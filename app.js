const express = require("express");
const axios = require('axios').default;

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res) {

  console.log(req.body.movieID);

  const query = req.body.movieID;

  const apiKey = "5833c270";

  const url = "https://www.omdbapi.com/?i=" + query + "&apikey=" + apiKey + "&type=movie";

  axios.get(url)
    .then(function (response) {
    // console.log(response);
    const movieData = response.data
    
    const movieTitle = movieData.Title;

    const runTime = movieData.Runtime;

    const moviePlot = movieData.Plot;


    res.write("<h1>This movie is called '" + movieTitle + "'. </h1>");
  
    res.write("<h1>This movie is " + runTime + " long.</h1>");
  
    res.write("<h1>Here is the movie's plot: " + moviePlot + "</h1>")
  
    res.send();
  })

});

console.log("Post Received!")

app.listen(process.env.PORT || 3000, function () {

  console.log("Server is running!");

});