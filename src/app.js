const express = require("express");
const request = require('request')
const hbs = require("hbs");
const app = express();
const port = 3000;
const url = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=27800bb0a3d8435e8ef8e01f1585e7a0'

const path = require("path");

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

const viewpath = path.join(__dirname, "../templets/views");
app.set("views", viewpath);

const partialpath = path.join(__dirname, "../templets/partials");
hbs.registerPartials(partialpath);


app.get("/", (req, res) => {
    const url = 'https://newsapi.org/v2/top-headlines?country=eg&category=entertainment&apiKey=27800bb0a3d8435e8ef8e01f1585e7a0'
    request({ url, json: true }, (error, response, body) => {
        // console.log(response.body.articles)
        // response.body.articles[0].title=document.getElementById()
        // var data = JSON.parse(body);
        res.render('index', { data: response.body.articles })
    })
})



app.get("/blabla", (req, res) => {
    res.render("index", {
        data: {
            image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
            author: 'asmaa',
            description: "bla bla bla bla"
        },
        title: "Home Page from hbs",
        name: "omar",
        footer: "",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "help Page from hbs",
        name: "omar",
        footer: "footer",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "about Page from hbs",
        name: "omar",
        footer: "footer",
    });
});

// ///////////////////////
// localhost:3000/products?search=egypt
app.get("/products", (req, res) => {
    console.log(req.query);
    console.log(req.query.search);
    res.send({
        product: [],
    });
});
// localhost:3000/products?address=egypt
app.get("/products", (req, res) => {
    if (req.query.address) {
        console.log(req.query);
        console.log(req.query.address);
        res.send({
            forecast: "raining",
            location: req.query.address,
        });
    } else {
        res.send("you must ptovide address");
    }
});

const geocode = require("./tools/geocode");
const forecast = require("./tools/forecast");

//  app.get('/weather',(req,res)=>{
//     if(!req.query.address){
//         return res.send({
//             error:'must provide address'
//         })
//     }
//     res.send({
//         forecast:'it is raining',
//         location:req.query.address
//     })
//  })

// //////////////////////
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "must provide address",
        });
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ geocodeerror: error });
        }
        forecast(data.latitude, data.longtiude, (error, forecastdata) => {
            if (error) {
                return res.send({ forecasterror: error });
            }
            res.send({
                location: data.location,
                forecast: forecastdata,
            });
        });
    });
});
// /////////////////////////////////
app.get("*", (req, res) => {
    res.render("404", {
        title: "about Page from hbs",
        name: "page  not found",
        footer: "footer",
    });
});

app.listen(port, () => {
    console.log("listening on port 3000 .....server is up");
});