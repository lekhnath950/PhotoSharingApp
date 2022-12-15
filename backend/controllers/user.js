const User = require("../models/User");
const Post = require("../models/Post")

exports.register = async (req,res) => {

    try {
        
        const {name, email, password} = req.body;

        let user = await User.findOne({email});
        if(user) { 
            return res
            .status(400)
            .json({ 
                success: false,  
                message: "User already exists"
            });
        }
        user = await User.create({
             name, 
             email,
             password,
             avatar: {public_id:"sample_id", url:"sampleurl"}
        });

        // res.status(201).json({ success: true, user})
        // const token = await user.generateToken();

        res.status(201).json({
            success: true,
            message:"User created"
            // user,
            // token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}

exports.login = async (req,res) => {
    try {

        const { email, password} = req.body;

        const user = await User.findOne({ email }).select("+password").populate("posts followers following");

        if (!user) {
            return res.status(400).json({
                success:false,
                message: "User does not exist"
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        const token = await user.generateToken();

        res.status(200)
        .cookie("token", token, {expires: new Date(Date.now()+ 90* 24* 60* 60* 1000),
        httpOnly: true
        })
        .json({
            success: true,
            user,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.logout = async (req, res) => {
    
    try {

        res.status(200).cookie("token", null, {expires: new Date(Date.now()), httpOnly:true}).json({
            success: true,
            message: "Logged Out"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.followUser = async (req, res) => {
    try {

        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if(!userToFollow){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if(loggedInUser.following.includes(userToFollow._id)) {
            const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
            loggedInUser.following.splice(indexfollowing,1);

            const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id)
            userToFollow.followers.splice(indexfollowers,1)

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "user unfollowed",
            })
        }

        else{
            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);
    
            await loggedInUser.save();
            await userToFollow.save();
    
            res.status(200).json({
                success: true,
                message: "user followed",
            })
        }

          
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.updatePassword = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("+password");

        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "please provide old and new password",
            })
        }

        const isMatch = await user.matchPassword(oldPassword)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password",
            })
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.updateProfile = async (req,res) => {

    try {
        
        const user = await User.findById(req.user._id)

        const {name, email} = req.body;

        if(name){
            user.name = name;
        }

        if(email){
            user.email = email;
        }

        //avatar todo

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.deleteMyProfile = async (req,res) => {

    try {

        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const followers = user.followers;
        const followings = user.followings;
        const userId = user._id;

        await user.remove();

        // after remove user logged out immediately
        res.cookie("token", null, {expires: new Date(Date.now()), httpOnly:true}).json({
            success: true,
            message: "Logged Out"
        })

        // delete users all posts
        for(let i = 0; i< posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await post.remove();
        }

        // removing all followers and following
        for(let i = 0; i < followers.length; i++){
            const follower = await User.findById(followers[i])

            const index = follower.following.indexOf(userId);
            follower.following.splice(index,1)
            await follower.save();
        }

        for(let i = 0; i < followings.length; i++){
            const follows = await User.findById(followings[i])

            const index = follows.followers.indexOf(userId);
            follows.followers.splice(index,1)
            await follows.save();
        }

        res.status(200).json({
            success: true,
            message: "Profile deleted"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.myProfile = async (req,res) => { 

    try {

        const user = await User.findById(req.user._id).populate("posts followers following");

        res.status(200).json({
            success: true,
            user,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
}


exports.getUserProfile = async (req,res) => {
    
    try {

        const user = await  User.findById(req.params.id).populate("posts followers following");

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }

        res.status(200).json({
            success: true,
            user,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
}

exports.getAllUsers = async (req,res) => {

    try {

        const users = await User.find({}).populate("posts");

        res.status(200).json({
            success:true,
            users,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })  
    }
}

exports.getAlluser = async (req,res) => {

    try {

        const users = await User.find({
            name: { $regex: req.query.name, $options: "i" }
        })

        res.status(200).json({
            success:true,
            users,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })  
    }
}


exports.getMyPost = async (req,res) => {

    try {

        const user = await User.findById(req.user._id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++){
            const post = await Post.findById(user.posts[i]).populate("likes comments.user owner");
            posts.push(post)
        }

        res.status(200).json({ 
            success:true,
            posts,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })  
    }
}

exports.getUserPost = async (req,res) => {

    try {

        const user = await User.findById(req.params.id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++){
            const post = await Post.findById(user.posts[i]).populate("likes comments.user owner");
            posts.push(post)
        }

        res.status(200).json({ 
            success:true,
            posts,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })  
    }
}