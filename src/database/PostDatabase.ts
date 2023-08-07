import { PostModel } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"
    public async getAllPosts() {
        const posts = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).select();
        return posts
    }
    public insertPost = async (postDB: any): Promise<void> => {
        await BaseDatabase
          .connection(PostDatabase.TABLE_POSTS)
          .insert(postDB)
    }
    public getPostById = async (id: string): Promise<PostModel | null> => {

          const post = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).where({ id }).first();
          if (!post) {
            return null;
          }
          return {
            id: post.id,
            content: post.content,
            likes: post.likes,
            dislikes: post.dislikes,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            creator: {
              id: post.creator_id,
              name: post.creator_name,
            },
          }
    }
    public updatePost = async(input: any) => {
        const {id, content} = input
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where({ id })
        .update({ content, updatedAt: new Date().toISOString() });
    }
    public deletePost = async(id: string) => {
      await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id })
      .del();
    }
    public getLikeByUserAndPost = async (user_id: string, post_id: string): Promise<any | null> => {
        const like = await BaseDatabase.connection('likes_dislikes')
          .where({ user_id, post_id })
          .first();
  
        return like || null;
    };
    public deleteLikeByUserAndPost = async (user_id: string, post_id: string): Promise<void> => {
        await BaseDatabase.connection('likes_dislikes')
          .where({ user_id, post_id })
          .del();
    };
    public updateLikeByUserAndPost = async (user_id: string, post_id: string, like: boolean): Promise<void> => {
      await BaseDatabase.connection('likes_dislikes')
        .where({ user_id, post_id })
        .update({ like: like ? 1 : 0 });
    };
    public insertLike = async (user_id: string, post_id: string, like: boolean): Promise<void> => {
      try {
        await BaseDatabase.connection('likes_dislikes').insert({ user_id, post_id, like: like ? 1 : 0 });
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    public handleLikeDislike = async (user_id: string, post_id: string, like: boolean): Promise<void> => {
      const existingLike = await this.getLikeByUserAndPost(user_id, post_id);
  
      if (existingLike) {
        if ((like && existingLike.like) || (!like && !existingLike.like)) {
          await this.deleteLikeByUserAndPost(user_id, post_id);
        } else {
          await this.updateLikeByUserAndPost(user_id, post_id, like);
        }
      } else {
        await this.insertLike(user_id, post_id, like);
      }
    };
  
    public updateLikesCount = async (post_id: string, like: boolean): Promise<void> => {
      const columnToUpdate = like ? 'likes' : 'dislikes';
      await BaseDatabase.connection('posts').where({ id: post_id }).increment(columnToUpdate, 1);
    };
  }

