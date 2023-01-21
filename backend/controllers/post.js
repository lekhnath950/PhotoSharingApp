const Post = require("../models/Post")
const User = require("../models/User")
const cloudinary = require("cloudinary")

exports.createPost = async (req,res) => {
    try {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder:"posts",
        })
        const newPostData = {
            caption: req.body.caption,
            owner: req.user._id,
            image:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        }

        const post = await Post.create(newPostData);

        const user = await User.findById(req.user._id);

        user.posts.push(post._id);

        await user.save(); 

        res.status(201).json({
            success: true,
            message:"post created",
        })
        
    } catch (error) {
       res.status(500).json({
        success:false,
        message: error.message,
       }) 
    }
}




exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      if (post.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
  
      await cloudinary.v2.uploader.destroy(post.image.public_id);
  
      await post.remove();
  
      const user = await User.findById(req.user._id);
  
      const index = user.posts.indexOf(req.params.id);
      user.posts.splice(index, 1);
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Post deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.likeAndUnlikePost = async (req,res) => {
    try {

        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);

            post.likes.splice(index, 1);

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post Unliked",
            })
        }

        else {
            post.likes.push(req.user._id)

            await post.save();

            return res.status(200).json({
                success: true,
                message: "post Liked",
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.getPostOfFollowing = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner: {
                $in: user.following,
            }
        }).populate("owner likes comments.user")

        res.status(200).json({
            success: true,
            posts: posts.reverse(),
        })

        // or

        // const user = await User.findById(req.user._id).populate(
        //     "following",
        //     "posts",
        // );

        // res.status(200).json({
        //     success: true,
        //     following: user.following,
        //     // posts: user.posts
        // })

        // or
        // const user = await User.findById(req.user._id).populate("following");
        // res.status(200).json({
        //     success: true,
        //     user: user.following,
        // })

        // const post = await User.find(req.user._id.following.ObjectId);
        // res.status(200).json({
        //     success:true,
        //     post
        // })
        
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
        })
    }

}


exports.updateCaption = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }


        post.caption = req.body.caption;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated",
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


exports.addComment = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        post.comments.push({
            user: req.user._id,
            comment: req.body.comment,
        })

        await post.save();
        return res.status(200).json({
            success:true,
            message: "comment Added"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        }); 
    }
}

exports.getAllPosts = async (req,res) => {

    try {

        const posts = await Post.find({}).populate("owner likes comments.user");

        res.status(200).json({
            success:true,
            posts:posts.reverse(),
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })  
    }
}


// exports.deleteComment = async (req,res) => {

//     try {

//         const post =await Post.findById(req.params.id);

//         if(!post) {
//             return res.status(404).json({
//                 success: false,
//                 message: "post not found",
//             });
//         }

        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         }); 
//     }
// }

