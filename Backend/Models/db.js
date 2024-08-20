const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true 
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
},{timestamps:true}
);

const User=new mongoose.model("User",user);

const blog = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    postpicurl:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    description:{
        type:String,
        required:true
    }
});

const Blog = new mongoose.model("Blog",blog); 

const comment = new mongoose.Schema({
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        required:true 
    }
});

const Comment = new mongoose.model("Comment",comment);

module.exports={
    User,
    Blog,
    Comment,
};