const mongoose =require('mongoose');


const mongourl='mongodb+srv://naveen_166:naveen123@resumeshortlist.nh03e.mongodb.net/?retryWrites=true&w=majority&appName=resumeshortlist';
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('mongodb connected'))
    .catch(err=>{console.log(err)});

