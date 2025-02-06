//import modules
import { postServices } from '../Services/post.service'
import { Request, Response } from 'express'
import {PostschemaValidate} from '../Models/posts'

class postController {
    //add post controller
    addpost = async (req: Request, res: Response) => {
        //data to be saved in database
        const data = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            // datetime: req.body.datetime,
            published: req.body.published
        }
        //validating the request
        const {error, value} = PostschemaValidate.validate(data)

        if(error){
            res.send(error.message)

        }else{
            //call the create post function in the service and pass the data from the request
            const post = await postServices.createPost(value)
            res.status(201).send(post)          
        }
        
    }

 //get all posts
getPosts = async (req: Request, res: Response) => {
    const search = req.query.search;
    console.log("search: " + search);
    let posts;
    if (search) {
        // handle search logic here if needed
        posts = await postServices.searchPosts(search);

        console.log("posts: " + posts.length);
        res.send(posts);
    } else {
        posts = await postServices.getPosts();
        res.send(posts);
    }
}






//get a single post
getAPost = async (req: Request, res: Response) => {
    //get id from the parameter
    const id = req.params.id
    const post = await postServices.getPost(id)
    res.send(post)
}

//update post
updatePost = async (req: Request, res: Response) => {
    const id = req.params.id
   const post = await postServices.updatePost(id, req.body)  
    res.send(post)
}


//delete a post
deletePost = async (req: Request, res: Response) => {
    const id = req.params.id
    await postServices.deletePost(id)
    res.send('post deleted')
}
// search for po
searchPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postServices.searchPosts(req.query);
        res.send(posts);
    } catch (error) {
        res.status(500).send("Error searching posts");
    }
};

}


//export class
export const PostController = new postController()