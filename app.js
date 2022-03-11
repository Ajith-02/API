const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const req = require("express/lib/request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    // console.log(req.body.cityName);
    // const query = "chennai";
    const query = req.body.cityName;
    const appKey = "6d76d29d42d25f4b3d105ee2b00ef54e";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode); 

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently "+ desc + " </p>")
            res.write("<h1>The temperature in "+ query +" is " + temp + "</h1>")  
            res.write("<img src=" + imgUrl + ">" );
            // res.send()   
        });
    });
    
})
app.listen(3000, function(){
    console.log("server running");
});



