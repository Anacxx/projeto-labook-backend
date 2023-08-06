
import { Response, Request } from "express";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/getPosts.dto";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostOutputDTO, CreatePostSchema } from "../dtos/createPost.dto";
import { PostDatabase } from "../database/PostDatabase";
export class PostController{
    
      //responsavel por receber o input da requisição
      //responsavel por enviar p/ a business o input
      // responsavel por receber a resposta da business
      // responsavel por devolver a resposta
      public getAllPosts = async (req: Request, res: Response) => {
        try {
          const input: GetPostsInputDTO = undefined
          const postBusiness = new PostBusiness()
          const output: GetPostsOutputDTO = await postBusiness.getAllPosts(input)
          return res.status(200).send(output);
        } catch (error) {
          console.log(error)
      
          if (req.statusCode === 200) {
              res.status(500)
          }
  
          if (error instanceof Error) {
              res.send(error.message)
          } else {
              res.send("Unexpected error")
          }
        }
      };
      //responsavel por receber o input da requisição
      //responsavel por enviar p/ a business o input
      // responsavel por receber a resposta da business
      // responsavel por devolver a resposta
      public createPost = async (req: Request, res: Response) => {
        try {
          //recebendo input da requisição.
          const input = CreatePostSchema.parse({ 
            id: req.body.id, 
            creator_id: req.body.creator_id, 
            content: req.body.content 
          })
          //Enviando input p/ a business
          const postBusiness = new PostBusiness()
          const output:CreatePostOutputDTO = await postBusiness.createPost(input)
          return res.status(201).send(output);
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error")
            }
        }
      };
      //responsavel por receber o input da requisição
      //responsavel por enviar p/ a business o input
      // responsavel por receber a resposta da business
      // responsavel por devolver a resposta 
      public editPost = async (req: Request, res: Response) => {
        try {
          //recebendo o input
          const input = {
            id: req.params.id,
            content: req.body.content
          }
          //enviar para a business
          const postBusiness = new PostBusiness()
          await postBusiness.editPost(input)
          // resposta..
          return res.status(200).send('Post updated successfully');
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error")
            }
        }
      };
      //responsavel por receber o input da requisição
      //responsavel por enviar p/ a business o input
      // responsavel por receber a resposta da business
      // responsavel por devolver a resposta 
      public deletePost = async (req: Request, res: Response) => {
        try {
          //recebendo input da requisição
          const id = req.params.id
          const postBusiness = new PostBusiness()
          await postBusiness.deletePost(id)
          return res.status(200).send('Post deleted successfully');
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error")
            }
        }
      };

      public likeDislikePost = async (req: Request, res: Response) => {
        try {
          const input = {
             user_id: req.body.user_id,
             post_id: req.params.post_id,
             like: req.body.like
           }
          const postBusiness = new PostBusiness();
          const output = await postBusiness.likeDislikePost(input);
          return res.status(200).send(output);
        } catch (error) {
          console.log(error);
          throw error;
        }
      };
}
