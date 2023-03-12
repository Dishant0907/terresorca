const mongoose=require("mongoose");

const DB='mongodb+srv://terresorca:dishant@cluster0.op212m5.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB,{
    useNewUrlParser: true,
  useUnifiedTopology: true
//   useCreateIndex:true,
//   useFindAndModify:false
}).then(()=>{
    console.log('connection successful');
}).catch((err)=> console.log(err));