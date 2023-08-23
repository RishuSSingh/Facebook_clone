const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const posts = require('./database/script/posts');
const { v4: uuidv4 } = require('uuid');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/login',(req,res)=>{
    res.redirect('/index');
})



app.get('/index',(req,res)=>{
    res.render('index',{
        title:"Facebook"
    });
})

app.get('/createpost',(req,res)=>{
    res.render('createpost');
})

app.post('/createpost',async (req,res,next)=>{
    const {title,imageurl} = req.body;
    console.log(title,imageurl);
    try{
        let post = await posts.addpost({
            title,
            imageurl,
            id:uuidv4(),
        })
        // cosnole.log(JSON.parse(posts))
        res.render('home',{
            post
        })
    }
    catch(err) {
        next();
    }
})

app.get('/deleteitem',async(req,res,next)=>{
    const {id} = req.query;
    try{
        const post = await posts.deletepost(id);
        res.render('home',{
            post
        })
    }catch(err){
        next();
    }
})

app.get('/home',async(req,res,next)=>{
    try{
        const post = await posts.getallpost();
        res.render('home',{
            post
        })

    }catch(err){
        next();
    }
})

app.use((req,res)=>{
    res.render('error');
})


app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT);
})