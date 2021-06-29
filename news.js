const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
// static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(__dirname + '/public/css'));
var urlencoded = bodyParser.urlencoded({ extended: true });
// setting views
app.set("view engine", "ejs");
app.set('views', './view');
// port
app.listen(5000);

var spec = "";
var cat = "";
var headlines = ""
app.get('/', (req, res) => {
    res.render('news', { cat, spec, headlines });
});

app.post('/', urlencoded, async (req, res) => {
    const key = "your_api_key"
    spec = req.body.specification;
    cat = req.body.category;
    var url = 'https://newsapi.org/v2/top-headlines?' + 'q=' + spec + '&' + 'category=' + cat + '&' + 'country=in&' + 'apiKey=' + key;
    try {
        const response = await axios.get(url);
        headlines = response.data;
        if ((headlines["articles"].length)==0){
            headlines="empty";
        }
    }
    catch (e) {
        console.log("Oh no,Oh no, OH no no no no no!");
        console.log(e);
    }
    console.log("redirecting");
    res.redirect('/');
});
