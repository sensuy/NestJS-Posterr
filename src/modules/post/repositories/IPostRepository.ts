import { IPaginationByDate } from "shared/interfaces/IPagination";
import { CreatePostDto } from "../dtos/createPost.dto";
import Post from './typeorm/entities/Post';


interface IPostRepository {
  create(data: CreatePostDto): Post;
  save(post: Post): Promise<Post>;
  listById(postid: string): Promise<Post | null>;
  listPostsByUserId(userid: string, queryParams: IPaginationByDate): Promise<Post[]>;
  listLatestPosts(queryParams: IPaginationByDate): Promise<Post[]>;
  verifyRepostById(postid: string): Promise<Post | null>;
  verifyQuoteById(quoteId: string): Promise<Post | null>;
  countUserPostByDate(fkUserId: string, init: Date, final: Date): Promise<number>;
}

export default IPostRepository;