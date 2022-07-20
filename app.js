const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

const app = express();
const port = 8000;


//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
 });

const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
// app.use(express.static('static', options))
app.use('/static', express.static('static'))    //for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set("view engine", 'pug')
app.set("views", path.join(__dirname, 'views'))     //set the view directory

//ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);     //home.pug is template inheritance
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);     //home.pug is template inheritance
})

app.post('/contact', (req, res)=>{
    // const params = {}
    var myData = new Contact(req.body);
    myData.save().then(()=>{[
        res.send("This item has been saved to the database")
    ]}).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');     //home.pug is template inheritance
})

app.listen(port, ()=>{
    console.log(`Application Successfully running at ${port}`);
})