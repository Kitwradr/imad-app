var express = require('express');
var morgan = require('morgan');//output logs
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'suhas2ab' ,
    database:'suhas2ab',
    host: 'db.imad.hasura-app.io',
    port: '8080',
    password: process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config)

app.get('test-db',function(req,res){
    //make a select requesst
    //return a  response
    pool.query('SELECT * FROM test' , function(err,result){
        if(err){
        res.status(500).send(err.toString());
    }else{
        res.send(JSON.strings(result));
    }
    });
});

var articles  = {
articleOne : {
  title:'Suhas HE| Article one' , 
  heading:'Article one' ,
  date : 'Feb 19 2018'  ,
  content:`
  <p>
      This is the content for my first article.This is the content for my first article.
      This is the content for my first article.This is the content for my first article.
      This is the content for my first article.
  </p>
  <p>
      This is the content for my first article.This is the content for my first article.
      This is the content for my first article.This is the content for my first article.
      This is the content for my first article.
  </p>
  <p>
      This is the content for my first article.This is the content for my first article.
      This is the content for my first article.This is the content for my first article.
      This is the content for my first article.
  </p>
  `
} , 
articleTwo:{
  title:'Suhas HE| Article two' , 
  heading:'Article two' ,
  date : 'Feb 20 2018'  ,
  content:`
  <p>
      This is the content for my second article.This is the content for my first article.
  
  `
},
articleThree: {
  title:'Suhas HE| Article three' , 
  heading:'Article three' ,
  date : 'Feb 20 2018'  ,
  content:`
  <p>
      This is the content for my third article.This is the content for my first article.
  
  `
}
};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;

    var htmlTemplate = `
    <html>
      <head>
          <title>
              ${title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head>
      <body>
          <div class="container">
              <div>
                  <a href="/">Home</a>
              </div>
              <hr/>
              <h3>
                  ${heading}
              </h3>
              <div>
                  ${date.toDateString()}
              </div>
              <div>
                ${content}
              </div>              
          </div>
      </body>
    </html>
    `;
    return htmlTemplate;
}

var counter =0;

app.get('/counter' , function(req,res){
  counter = counter +1;
  res.send(counter.toString());

});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/:articleName' , function(req ,res){
  var articleName = req.param.articleName;
  res.send(createTemplate(articles[articleName]));
  //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

// app.get('/article-two' , function(req ,res){
//   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
// });
// app.get('/article-three' , function(req ,res){
//   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
// });
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/Portrait.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Portrait.jpg'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
