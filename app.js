const express = require("express");

const https = require("https")

const app = express();

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=6d76d29d42d25f4b3d105ee2b00ef54e";

    https.get(url, function(response){
        console.log(response.statusCode); 

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const desc = weatherData.weather[0].description;
            console.log(desc);

        });
    });
    res.send("Server is running");
});

app.listen(3000, function(){
    console.log("server running");
});