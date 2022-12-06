//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')

const welcomeStartingContent = 'Welcome to the Daily Journal, where you can text whatever you want and read it every day. Try to compose something on the top rigth of the page!'


const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

let posts = []

//!ROUTE
app.get('/', (req, res)=>{ //HOME
  res.render('home', {welcomeContent: welcomeStartingContent, posts: posts})
})

app.get('/compose', (req, res)=>{
  res.render('compose')
})

app.post('/compose', (req, res)=>{
  const post = {
    title: req.body.composeTitle,
    text: req.body.composeText
  }

  posts.push(post)

  res.redirect('/')
})

app.get('/posts/:postName', (req, res)=>{
  const requestedTitle = _.lowerCase(req.params.postName)

  posts.forEach(function(post){
    const currentTitle = _.lowerCase(post.title)
    if(currentTitle == requestedTitle){
      res.render('post', {
        title: post.title,
        text: post.text
      })
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
