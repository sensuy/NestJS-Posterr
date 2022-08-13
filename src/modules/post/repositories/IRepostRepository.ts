
import ICreateRepostDTO from "../dtos/ICreateRepostDTO";
import Repost from "./typeorm/entities/Repost";

interface IRepostRepository {
  create(data: ICreateRepostDTO): Repost;
  save(repost: Repost): Promise<Repost>;
}

export default IRepostRepository;