import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/createPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/getPosts.dto";
import { Post, PostModel } from "../models/Post";

export class PostBusiness {
  // recebe o input da controller e devolve a informaçao
    public getAllPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
          const postDatabase = new PostDatabase()
          const postsDB = await postDatabase.getAllPosts()
          const postsModel: PostModel[] = []
          for (let postDB of postsDB){
            const userDatabase = new UserDatabase()
            const creatorDB = await userDatabase.findUserById(postDB.creator_id)
            if(!creatorDB){
                throw new Error("Usuário não encontrado")
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

      public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
          // recebe o input da controller
          const { id, creator_id,content } = input 
          //Faz conexão com o Database
          const userDatabase = new UserDatabase()
          const creatorDB = await userDatabase.findUserById(creator_id)
          if(!creatorDB){
              throw new Error("Usuário não encontrado")
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
          const postDatabase = new PostDatabase()
          await postDatabase.insertPost(post.toPostDB())
          const output = undefined
          return output
      };
      public editPost = async (input: any) => {
          const { id, content } = input;
          const postDatabase = new PostDatabase();
    
          const existingPost = await postDatabase.getPostById(id);
          if (!existingPost) {
            throw new Error('Post not found'); // Throw an error if the post with the given id doesn't exist
          }
    
          // Update the post content and set the updatedAt timestamp
          existingPost.content = content;
          existingPost.updatedAt = new Date().toISOString();
    
          // Save the updated post to the database using the updatePost method
          await postDatabase.updatePost(existingPost);
    
          const output = undefined;
          return output;
      };
      public deletePost = async (id: string) => {
          const postDatabase = new PostDatabase()
          const existingPost = await postDatabase.getPostById(id);
          if(!existingPost) {
            throw new Error('Post not found')
          }
          await postDatabase.deletePost(id)
      };
      public likeDislikePost = async (input: any) => {
        const { user_id, post_id, like } = input;
    
        if (like !== true && like !== false) {
          throw new Error('Invalid like value. Use true for like or false for dislike.');
        }
    
        const postDatabase = new PostDatabase();
          const post = await postDatabase.getPostById(post_id);
          if (!post) {
            throw new Error('Post not found');
          }
    
        await postDatabase.handleLikeDislike(user_id, post_id, like);
        const output = {
          message: `Post ${like ? 'liked' : 'disliked'} successfully`
        }
        return output
      };

}
