import ICreatePostDTO from "../dtos/ICreatePostDTO";
import Post from './typeorm/entities/Post';


interface IPostRepository {
  create(data: ICreatePostDTO): Post;
  save(post: Post): Promise<Post>;
}

export default IPostRepository;