const mongoose= require('mongoose');
const express=require('express');
const nodemailer=require('nodemailer');
const hbs=require('hbs');
var bodyParser = require('body-parser');

const path=require('path');
const app=express();
require('./db/conn');
// const DB='mongodb+srv://terresorca:dishant@cluster0.op212m5.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect(DB,{
//     useNewUrlParser: true,
//   useUnifiedTopology: true
// //   useCreateIndex:true,
// //   useFindAndModify:false
// }).then(()=>{
//     console.log('connection successful');
// }).catch((err)=> console.log(err));

const User=require('./models/contact.js');


const port=process.env.PORT || 8000;
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,'../templates/views');
// console.log(path.join(__dirname,"../public"));
const partials_path =path.join(__dirname,'../templates/partials');


app.set('view engine','hbs');
// app.set('views',template_path);
app.set("views", template_path);
// hbs.registerPartials(partials_path);

app.use(express.static(static_path)); 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,resp)=>{
    resp.render("index");
})
app.post('/',(req,resp)=>{
    const user= new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message,
        website:req.body.website,
        // emailId:req.body.emailId
    });
    user.save().then(()=>{
        resp.status(201).render('index');
    }).catch((err)=> console.log(err));


    // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'terresorca@gmail.com', // sender email
        pass: 'dpimlkbxmmtkzcfo' // sender password
    }
});

// setup email data
let mailOptions = {
    from: 'terresorca@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Thanks for your interest', // Subject line
    text: 'welcome sir', // plain text body
    // html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});

    

})
// app.get('/about',(req,resp)=>{
//     resp.render('about');
// })
// app.get('/weather',(req,resp)=>{
//     resp.render("weather");
// })
// app.get('*',(req,resp)=>{
//     resp.render("404_error_page");
// })

app.listen(port,()=>{
    console.log(`listening to the port at ${port}`);
})