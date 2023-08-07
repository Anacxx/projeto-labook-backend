import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/getPosts.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post, PostModel } from "../models/Post";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase
  ){}
     //Com DTO PRONTO FUNCIONANDO
    public getAllPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
          const postsDB = await this.postDatabase.getAllPosts()
          const postsModel: PostModel[] = []
          for (let postDB of postsDB){
            const userDatabase = new UserDatabase()
            const creatorDB = await userDatabase.findUserById(postDB.creator_id)
            if(!creatorDB){
                throw new NotFoundError("User not found")
            }
            const post = new Post(
              postDB.id,
              postDB.content,
              postDB.likes,
              postDB.dislikes,
              postDB.createdAt,
              postDB.updatedAt,
              creatorDB.id,
              creatorDB.name
            )
            postsModel.push(post.toPostModel())
          }
          const output: GetPostsOutputDTO = postsModel
          return output
      };
       //Com DTO PRONTO FUNCIONANDO.
      public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
          const { id, creator_id,content } = input 
          const userDatabase = new UserDatabase()
          const creatorDB = await userDatabase.findUserById(creator_id)
          if(!creatorDB){
              throw new NotFoundError("User not found")
          }
          const post = new Post(
            id,
            content,
            0, 
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            creatorDB.id,
            creatorDB.name
          )
          await this.postDatabase.insertPost(post.toPostDB())
          const output: CreatePostOutputDTO = undefined
          return output
      };
      //Com DTO PRONTO FUNCIONANDO
      public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
          const { id, content } = input;
    
          const existingPost = await this.postDatabase.getPostById(id);
          if (!existingPost) {
            throw new NotFoundError('Post not found'); 
          }
    
          existingPost.content = content;
          existingPost.updatedAt = new Date().toISOString();
          await this.postDatabase.updatePost(existingPost);
    
          const output: EditPostOutputDTO = undefined;
          return output;
      };
      //Com DTO PRONTO FUNCIONANDO
      public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const existingPost = await this.postDatabase.getPostById(input.id);
        if (!existingPost) {
          throw new NotFoundError('Post not found');
        }
        await this.postDatabase.deletePost(input.id);
        const output: DeletePostOutputDTO = {
          message: 'Post deleted successfully',
        };
        return output;
      };
      // NÃO FUNCIONA
      public likeDislikePost = async (input: any) => {
        const { user_id, post_id, like } = input;
    
        if (like !== true && like !== false) {
          throw new BadRequestError('Invalid like value. Use true for like or false for dislike.');
        }

          const post = await this.postDatabase.getPostById(post_id);
          if (!post) {
            throw new NotFoundError('Post not found');
          }
    
        await this.postDatabase.handleLikeDislike(user_id, post_id, like);
        const output: DeletePostOutputDTO = {
          message: `Post ${like ? 'liked' : 'disliked'} successfully`
        }
        return output
      };

}
