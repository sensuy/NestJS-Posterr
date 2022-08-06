
import Repost from "./typeorm/entities/Repost";

interface IRepostRepository {
  save(repost: Repost): Promise<Repost>;
}

export default IRepostRepository;