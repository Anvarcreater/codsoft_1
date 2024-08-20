const express = require('express');
const {User,Blog,Comment} = require('../Models/db');
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const router = express.Router();

router.post('/signup',async(req,res)=>{
    const { username,email,password } = req.body;
    if(username === '' ||email === '' || password === ''){
        return res.json({message:"Input fields should not be Empty..."});
    }
    if(password.length < 7){
        return res.json({message:"Password should have atleast 8 character"});
    }
    const email_id =await User.findOne({email});
    const user =await User.findOne({username});
    if(user || email_id){
        return res.json({message:"user already exist"});
    }
    const hashedpassword = await bcrypt.hash(password,10);
    const newuser= new User({
        username,
        email,
        password:hashedpassword,
    })
    await newuser.save();
    const token = jwt.sign({id:newuser._id,username:username},process.env.SECRETKEY,{expiresIn:'1h'});
    res.cookie("token",token,{httpOnly:true,maxAge:3600000});
    return res.json({status:true,message:"Signup successfully"});
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    if(email === '' || password === ''){
        return res.json({message:"Input fields should not be Empty..."});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.json({message:"user not found"});
    }
    const validpassword = await bcrypt.compare(password,user.password);
    if(!validpassword){
        return res.json({message:"incorrect password"});
    }else{
        const token = jwt.sign({id:user._id,username:user.username},process.env.SECRETKEY,{expiresIn:'1h'});
        res.cookie("token",token,{httpOnly:true,maxAge:3600000});
        return res.json({status:true,message:"login succesfully"});
    }
})

const verifyuser= async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({status:false,message:"Login first"});
        }
        const decoded =await jwt.verify(token,process.env.SECRETKEY);
        next();

    }catch(err){
        return res.json(err);
    }

}
router.get('/verify',verifyuser,(req,res)=>{
    return res.json({status:true,message:"Authorized"});
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({status:true,message:"logout successfully"});
})

router.get('/currentuser',async (req,res)=>{
    const token=req.cookies.token;
    if(! token){
        return res.json({message:"unable to get token"});
    }else{
    const decoded= await jwt.verify(token,process.env.SECRETKEY);
    const id=decoded.id;
    const user = await User.findOne({_id:id});
    return res.json({status:true,data:{user:user.username,email:user.email,photourl:user.profilepic},message:"success"});}
})
router.put('/updateuser',async(req,res)=>{
    const token = req.cookies.token;
    const {updateuser,updateemail,updatepass,updateprofpic} = req.body;
    try{
        const decoded = await jwt.verify(token,process.env.SECRETKEY);
        const id=decoded.id;
        const hashedpassword = await bcrypt.hash(updatepass,10);
        await User.findByIdAndUpdate({_id:id},{username:updateuser,email:updateemail,password:hashedpassword,profilepic:updateprofpic});
        return res.json({status:true,message:"Profile Updated Successfully......"});
    }catch(err){
        return res.json({message:"invalid token"});
    }
})
router.post('/createblog',async (req,res)=>{
    const token = req.cookies.token;
    const {title,category,postpicurl,description}= req.body;
    try{
        const decoded = await jwt.verify(token,process.env.SECRETKEY);
        const id=decoded.id;
        const newblog = new Blog({
            title,
            category,
            postpicurl,
            userid:id,
            description
        })
        await newblog.save();
        return res.json({status:true,message:"Post Created Successfully....."}); 
    }catch(err){
        return res.json({message:"invalid token or login again"});
    }
})

router.get('/getallblogs',async (req,res)=>{
    try{
        const Allblogs = await Blog.find();
        return res.json({status:true,data:Allblogs,message:"successfully retrieved"})
    }catch(err){
        return res.json({error:err});
    }
})

router.get('/getmyblogs',async(req,res)=>{
    const token = req.cookies.token;
    try{
        const decoded = await jwt.verify(token,process.env.SECRETKEY);
        const id=decoded.id;
        const myblogs = await Blog.find({userid:id});
        return res.json({status:true,data:myblogs,message:"successfully retrieved"});
    }catch(err){
        return res.json({error:err});
    }
})

router.get('/viewpostdetails/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const details = await Blog.findOne({_id:id});
        return res.json({status:true,data:details,message:"view post details"})
    }catch(err){
        return res.json({message:err});
    }
})

router.get('/viewcomments/:id',async(req,res)=>{
    const postid=req.params.id;
    try{
        const comments = await Comment.find({postid:postid}).populate('userid');
        return res.json({status:true,comments:comments,message:"comment retrived"})
    }catch(err){
        return res.json({message:err});
    }
})

router.post('/commentpost', async(req,res)=>{
    const token = req.cookies.token;
    const {postid,content} = req.body;
    try{
        const decoded = await jwt.verify(token,process.env.SECRETKEY);
        const userid = decoded.id;
        const newcomment = new Comment({
            postid,
            userid,
            content
        })
        await newcomment.save();
        return res.json({status:true,message:"comment added successfully"});
    }catch(err){
        return res.json({message:err});
    }
})

router.post('/searchresult',async (req,res)=>{
    const {query} = req.body;
    try{
        const value = query.trim().toLowerCase();
        const blogs = await Blog.find();
        const result = blogs.filter(item=> item.title.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value) || item.description.toLowerCase().includes(value));
        return res.json({status:true,data:result,message:"result"});
    }catch(err){
        return res.json({message:err});
    }
})

module.exports=router;