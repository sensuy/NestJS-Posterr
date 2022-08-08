import ICreatePostDTO from "../dtos/ICreatePostDTO";
import Post from './typeorm/entities/Post';


interface IPostRepository {
  create(data: ICreatePostDTO): Post;
  save(post: Post): Promise<Post>;
  listById(postid: string): Promise<Post | null>;
  verifyRepostById(postid: string): Promise<Post | null>;
  countUserPostByDate(fkUserId: string, init: Date, final: Date): Promise<number>;
}

export default IPostRepository;