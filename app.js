const path = require('path');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("637375744780bf500914f25f")
    .then(user => {
      req.user = user ; 
      next();
    })
    .catch(err => console.log(err));
 
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://ramu:123@cluster1.2wgivty.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{

  User.findOne().then(user =>{
    if(!user){
      const user = new User({
        name:"sameer",
        email:'a@a.com',
        cart:{
          items: []
        }
      })
      user.save();
    }
  })
  
  app.listen(3000 , (req,res)=>{
    console.log('running')
  })
})
